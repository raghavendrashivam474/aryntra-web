/**
 * Decision Intelligence Prototype — JSON Runner
 * M1.7 — Aryntra R&D
 *
 * Reads a DecisionScenario from a JSON file and executes the engine.
 * This proves the engine works with external input, not just TS imports.
 *
 * Run with:
 *   pnpm exec tsx research/decision-intelligence/prototype/run-json.ts <path-to-json>
 *
 * Example:
 *   pnpm exec tsx research/decision-intelligence/prototype/run-json.ts research/decision-intelligence/prototype/scenarios/architecture-choice.json
 *   pnpm exec tsx research/decision-intelligence/prototype/run-json.ts research/decision-intelligence/prototype/scenarios/hiring-decision.json
 */

import { readFileSync } from "fs";
import { resolve } from "path";
import { evaluate } from "./engine";
import type { DecisionScenario, OptionScore, Recommendation } from "./engine";

// ─── Input Validation ─────────────────────────────────────────────────────────

function validateScenario(data: unknown): asserts data is DecisionScenario {
  if (!data || typeof data !== "object") {
    throw new Error("Input must be a JSON object.");
  }

  const s = data as Record<string, unknown>;

  if (typeof s.id !== "string" || s.id.length === 0) {
    throw new Error("Scenario must have a non-empty 'id' string.");
  }
  if (typeof s.description !== "string" || s.description.length === 0) {
    throw new Error("Scenario must have a non-empty 'description' string.");
  }
  if (!Array.isArray(s.constraints) || s.constraints.length === 0) {
    throw new Error("Scenario must have at least one constraint.");
  }
  if (!Array.isArray(s.options) || s.options.length === 0) {
    throw new Error("Scenario must have at least one option.");
  }

  for (const c of s.constraints as Record<string, unknown>[]) {
    if (typeof c.id !== "string") throw new Error(`Constraint missing 'id': ${JSON.stringify(c)}`);
    if (typeof c.label !== "string") throw new Error(`Constraint missing 'label': ${c.id}`);
    if (typeof c.weight !== "number" || c.weight < 1 || c.weight > 5) {
      throw new Error(`Constraint '${c.id}' weight must be 1-5, got: ${c.weight}`);
    }
  }

  for (const o of s.options as Record<string, unknown>[]) {
    if (typeof o.id !== "string") throw new Error(`Option missing 'id': ${JSON.stringify(o)}`);
    if (typeof o.label !== "string") throw new Error(`Option missing 'label': ${o.id}`);
    if (!Array.isArray(o.capabilities)) throw new Error(`Option '${o.id}' missing 'capabilities' array.`);
  }
}

// ─── Formatting Helpers (same as run.ts) ─────────────────────────────────────

function bar(percent: number, width = 30): string {
  const filled = Math.round((percent / 100) * width);
  return "█".repeat(filled) + "░".repeat(width - filled);
}

function satisfactionIcon(s: string): string {
  switch (s) {
    case "PASS":    return "✓";
    case "PARTIAL": return "~";
    case "FAIL":    return "✗";
    default:        return "?";
  }
}

function wrapText(text: string, width = 66): string[] {
  // Word-boundary-aware wrapping (fixes M1.4 text-wrap bug)
  const words = text.split(" ");
  const lines: string[] = [];
  let current = "";

  for (const word of words) {
    if (current.length + word.length + 1 > width && current.length > 0) {
      lines.push(current);
      current = word;
    } else {
      current = current.length > 0 ? current + " " + word : word;
    }
  }
  if (current.length > 0) lines.push(current);
  return lines;
}

function printOptionScore(score: OptionScore, rank: number): void {
  console.log(`\n  ${rank}. ${score.optionLabel}`);
  console.log(
    `     Score: ${score.percentSatisfied}%  ` +
    `${bar(score.percentSatisfied)}  ` +
    `(${score.totalWeightedScore.toFixed(1)} / ${score.maxPossibleScore})`
  );
  console.log("     Constraints:");
  for (const r of score.constraintResults) {
    const icon = satisfactionIcon(r.satisfaction);
    const weight = `[w:${r.weight}]`;
    console.log(
      `       ${icon} ${weight.padEnd(6)} ${r.constraintLabel}`
    );
    if (r.satisfaction !== "PASS") {
      const noteLines = wrapText(r.note, 70);
      for (const line of noteLines) {
        console.log(`              ${line}`);
      }
    }
  }
}

function printReport(result: Recommendation): void {
  const divider = "─".repeat(72);

  console.log("\n" + divider);
  console.log("  ARYNTRA DECISION INTELLIGENCE — PROTOTYPE OUTPUT");
  console.log("  [JSON Input Mode — M1.7]");
  console.log(divider);

  console.log(`\n  Scenario: ${result.scenarioDescription}`);
  console.log(`  ID:       ${result.scenarioId}`);

  console.log("\n" + divider);
  console.log("  ALL OPTIONS — RANKED");
  console.log(divider);

  result.allScores.forEach((score, i) => printOptionScore(score, i + 1));

  console.log("\n" + divider);
  console.log("  RECOMMENDATION");
  console.log(divider);

  console.log(`\n  → ${result.recommended.optionLabel}`);
  console.log(`    Confidence: ${result.confidence}`);

  if (result.tradeOff) {
    console.log("\n  Trade-off:");
    const tradeLines = wrapText(result.tradeOff.description);
    for (const line of tradeLines) {
      console.log(`    ${line}`);
    }
  }

  if (result.uncertainConstraints.length > 0) {
    console.log("\n  Uncertain constraints (PARTIAL satisfaction):");
    for (const uc of result.uncertainConstraints) {
      const lines = wrapText(uc);
      for (const line of lines) {
        console.log(`    ~ ${line}`);
      }
    }
  }

  console.log("\n  Reasoning:");
  const reasoningLines = wrapText(result.reasoning);
  for (const line of reasoningLines) {
    console.log(`    ${line}`);
  }

  console.log("\n" + divider);
  console.log("  This output is produced by a deterministic reasoning engine.");
  console.log("  No AI model was invoked. No external API was called.");
  console.log("  Input loaded from external JSON file.");
  console.log(divider + "\n");
}

// ─── Main ─────────────────────────────────────────────────────────────────────

const filePath = process.argv[2];

if (!filePath) {
  console.error("Usage: pnpm exec tsx run-json.ts <path-to-scenario.json>");
  process.exit(1);
}

const absolutePath = resolve(filePath);
let raw: string;

try {
  raw = readFileSync(absolutePath, "utf-8");
} catch (err) {
  console.error(`Error reading file: ${absolutePath}`);
  console.error((err as Error).message);
  process.exit(1);
}

let parsed: unknown;
try {
  parsed = JSON.parse(raw);
} catch (err) {
  console.error(`Error parsing JSON: ${(err as Error).message}`);
  process.exit(1);
}

try {
  validateScenario(parsed);
} catch (err) {
  console.error(`Invalid scenario: ${(err as Error).message}`);
  process.exit(1);
}

const result = evaluate(parsed);
printReport(result);
