/**
 * Decision Intelligence Prototype — Runner
 * M1.4 — Aryntra R&D
 *
 * Executes the decision engine against the architecture-choice scenario
 * and prints a human-readable report.
 *
 * Run with:
 *   npx tsx research/decision-intelligence/prototype/run.ts
 */

import { evaluate } from "./engine";
import { architectureChoiceScenario } from "./scenarios/architecture-choice";
import type { OptionScore, Recommendation } from "./engine";

// ─── Formatting Helpers ───────────────────────────────────────────────────────

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
      const noteLines = r.note.match(/.{1,70}/g) ?? [r.note];
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
    const tradeLines = result.tradeOff.description.match(/.{1,66}/g)
      ?? [result.tradeOff.description];
    for (const line of tradeLines) {
      console.log(`    ${line}`);
    }
  }

  if (result.uncertainConstraints.length > 0) {
    console.log("\n  Uncertain constraints (PARTIAL satisfaction):");
    for (const uc of result.uncertainConstraints) {
      const lines = uc.match(/.{1,66}/g) ?? [uc];
      for (const line of lines) {
        console.log(`    ~ ${line}`);
      }
    }
  }

  console.log("\n  Reasoning:");
  const reasoningLines = result.reasoning.match(/.{1,66}/g)
    ?? [result.reasoning];
  for (const line of reasoningLines) {
    console.log(`    ${line}`);
  }

  console.log("\n" + divider);
  console.log("  This output is produced by a deterministic reasoning engine.");
  console.log("  No AI model was invoked. No external API was called.");
  console.log("  The recommendation reflects constraint weights and");
  console.log("  option capability data defined in the scenario.");
  console.log(divider + "\n");
}

// ─── Execute ──────────────────────────────────────────────────────────────────

const result = evaluate(architectureChoiceScenario);
printReport(result);
