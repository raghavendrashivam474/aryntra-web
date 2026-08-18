/**
 * Decision Intelligence Prototype — Core Engine
 * M1.4 — Aryntra R&D
 *
 * This is a research prototype. It does not run in production.
 * It exists to test the hypothesis defined in:
 *   docs/architecture/M1.4-decision-intelligence-architecture.md
 */

// ─── Types ────────────────────────────────────────────────────────────────────

export type SatisfactionLevel = "PASS" | "PARTIAL" | "FAIL";

export interface Constraint {
  id: string;
  label: string;
  weight: number; // 1–5, how critical this constraint is
  description: string;
}

export interface OptionCapability {
  constraintId: string;
  satisfaction: SatisfactionLevel;
  note: string; // why this satisfaction level was assigned
}

export interface Option {
  id: string;
  label: string;
  capabilities: OptionCapability[];
}

export interface DecisionScenario {
  id: string;
  description: string;
  context: Record<string, string | number>;
  constraints: Constraint[];
  options: Option[];
}

export interface ConstraintResult {
  constraintId: string;
  constraintLabel: string;
  weight: number;
  satisfaction: SatisfactionLevel;
  satisfactionScore: number; // 1.0 | 0.5 | 0.0
  weightedScore: number;
  note: string;
}

export interface OptionScore {
  optionId: string;
  optionLabel: string;
  totalWeightedScore: number;
  maxPossibleScore: number;
  percentSatisfied: number;
  constraintResults: ConstraintResult[];
}

export interface TradeOff {
  description: string;
  recommendedWins: string[]; // constraints where recommended option wins
  alternativeWins: string[]; // constraints where second option wins
}

export type ConfidenceLevel = "HIGH" | "MEDIUM" | "LOW";

export interface Recommendation {
  scenarioId: string;
  scenarioDescription: string;
  recommended: OptionScore;
  alternative: OptionScore | null;
  allScores: OptionScore[];
  tradeOff: TradeOff | null;
  confidence: ConfidenceLevel;
  uncertainConstraints: string[];
  reasoning: string;
}

// ─── Satisfaction Scoring ─────────────────────────────────────────────────────

function satisfactionScore(level: SatisfactionLevel): number {
  switch (level) {
    case "PASS":    return 1.0;
    case "PARTIAL": return 0.5;
    case "FAIL":    return 0.0;
  }
}

// ─── Constraint Evaluator ─────────────────────────────────────────────────────

function evaluateOption(
  option: Option,
  constraints: Constraint[]
): OptionScore {
  const constraintResults: ConstraintResult[] = [];
  let totalWeightedScore = 0;
  let maxPossibleScore = 0;

  for (const constraint of constraints) {
    const capability = option.capabilities.find(
      (c) => c.constraintId === constraint.id
    );

    const satisfaction: SatisfactionLevel = capability?.satisfaction ?? "FAIL";
    const note = capability?.note ?? "No capability data provided for this constraint.";
    const score = satisfactionScore(satisfaction);
    const weighted = score * constraint.weight;

    totalWeightedScore += weighted;
    maxPossibleScore += constraint.weight;

    constraintResults.push({
      constraintId: constraint.id,
      constraintLabel: constraint.label,
      weight: constraint.weight,
      satisfaction,
      satisfactionScore: score,
      weightedScore: weighted,
      note,
    });
  }

  const percentSatisfied =
    maxPossibleScore > 0
      ? Math.round((totalWeightedScore / maxPossibleScore) * 100)
      : 0;

  return {
    optionId: option.id,
    optionLabel: option.label,
    totalWeightedScore,
    maxPossibleScore,
    percentSatisfied,
    constraintResults,
  };
}

// ─── Trade-off Analyser ───────────────────────────────────────────────────────

function analyseTradeOff(
  recommended: OptionScore,
  alternative: OptionScore
): TradeOff {
  const recommendedWins: string[] = [];
  const alternativeWins: string[] = [];

  for (const recResult of recommended.constraintResults) {
    const altResult = alternative.constraintResults.find(
      (r) => r.constraintId === recResult.constraintId
    );
    if (!altResult) continue;

    if (recResult.satisfactionScore > altResult.satisfactionScore) {
      recommendedWins.push(
        `${recResult.constraintLabel} (${recResult.satisfaction} vs ${altResult.satisfaction})`
      );
    } else if (altResult.satisfactionScore > recResult.satisfactionScore) {
      alternativeWins.push(
        `${recResult.constraintLabel} (${altResult.satisfaction} vs ${recResult.satisfaction})`
      );
    }
  }

  const description =
    alternativeWins.length === 0
      ? `${recommended.optionLabel} dominates on all evaluated constraints.`
      : `Choosing ${recommended.optionLabel} over ${alternative.optionLabel} means ` +
        `accepting weaker performance on: ${alternativeWins.join("; ")}. ` +
        `In return, it performs better on: ${recommendedWins.join("; ")}.`;

  return { description, recommendedWins, alternativeWins };
}

// ─── Confidence Calculator ────────────────────────────────────────────────────

function calculateConfidence(
  recommended: OptionScore,
  alternative: OptionScore | null
): ConfidenceLevel {
  if (!alternative) return "HIGH";

  const margin = recommended.percentSatisfied - alternative.percentSatisfied;

  if (margin >= 20) return "HIGH";
  if (margin >= 8)  return "MEDIUM";
  return "LOW";
}

// ─── Uncertain Constraints ────────────────────────────────────────────────────

function findUncertainConstraints(recommended: OptionScore): string[] {
  return recommended.constraintResults
    .filter((r) => r.satisfaction === "PARTIAL")
    .map((r) => `${r.constraintLabel}: ${r.note}`);
}

// ─── Reasoning Builder ────────────────────────────────────────────────────────

function buildReasoning(
  recommended: OptionScore,
  alternative: OptionScore | null,
  confidence: ConfidenceLevel,
  tradeOff: TradeOff | null
): string {
  const lines: string[] = [];

  lines.push(
    `${recommended.optionLabel} scores ${recommended.percentSatisfied}% ` +
    `of the maximum possible weighted score across all constraints.`
  );

  if (alternative) {
    lines.push(
      `The next best option, ${alternative.optionLabel}, scores ${alternative.percentSatisfied}%.`
    );
  }

  if (tradeOff && tradeOff.alternativeWins.length > 0) {
    lines.push(
      `Accepting this recommendation means accepting weaker constraint ` +
      `satisfaction on: ${tradeOff.alternativeWins.join(", ")}.`
    );
  }

  if (confidence === "LOW") {
    lines.push(
      `Confidence is LOW. The score difference between options is small. ` +
      `Review constraints and weights before committing.`
    );
  } else if (confidence === "MEDIUM") {
    lines.push(
      `Confidence is MEDIUM. The recommendation is credible but not dominant. ` +
      `Consider whether constraint weights reflect actual priorities.`
    );
  } else {
    lines.push(
      `Confidence is HIGH. The recommended option clearly satisfies more ` +
      `of the weighted constraints than any alternative.`
    );
  }

  return lines.join(" ");
}

// ─── Main Engine ──────────────────────────────────────────────────────────────

export function evaluate(scenario: DecisionScenario): Recommendation {
  if (scenario.options.length === 0) {
    throw new Error("A decision scenario must have at least one option.");
  }
  if (scenario.constraints.length === 0) {
    throw new Error("A decision scenario must have at least one constraint.");
  }

  // Score every option
  const allScores: OptionScore[] = scenario.options.map((option) =>
    evaluateOption(option, scenario.constraints)
  );

  // Rank by weighted score
  allScores.sort((a, b) => b.totalWeightedScore - a.totalWeightedScore);

  const recommended = allScores[0];
  const alternative = allScores[1] ?? null;

  const tradeOff =
    alternative ? analyseTradeOff(recommended, alternative) : null;

  const confidence = calculateConfidence(recommended, alternative);
  const uncertainConstraints = findUncertainConstraints(recommended);

  const reasoning = buildReasoning(
    recommended,
    alternative,
    confidence,
    tradeOff
  );

  return {
    scenarioId: scenario.id,
    scenarioDescription: scenario.description,
    recommended,
    alternative,
    allScores,
    tradeOff,
    confidence,
    uncertainConstraints,
    reasoning,
  };
}
