/**
 * Decision Intelligence Prototype — Scenario: Architecture Choice
 * M1.4 — Aryntra R&D
 *
 * Scenario:
 *   A 4-person engineering team must choose a backend architecture
 *   for a new internal analytics service.
 *
 *   Options:
 *     A — Monolith (Next.js API routes, single deployment)
 *     B — Separate Node.js service (dedicated Express/Fastify API)
 *     C — Serverless functions (Vercel/AWS Lambda)
 *
 *   Constraints active for this team:
 *     - Budget: under $200/month infra cost
 *     - Team capability: team knows Next.js well, Node moderately,
 *       serverless minimally
 *     - Delivery deadline: 3 weeks
 *     - Performance: <200ms p95 response time for dashboard queries
 *     - Operational complexity: team has no dedicated DevOps
 *     - Reversibility: decision should not create hard lock-in
 */

import type { DecisionScenario } from "../engine";

export const architectureChoiceScenario: DecisionScenario = {
  id: "arch-001",
  description:
    "Choose backend architecture for internal analytics service. " +
    "Team of 4. No dedicated DevOps. 3-week deadline. $200/month budget cap.",

  context: {
    teamSize: 4,
    budgetMonthlyUSD: 200,
    deadlineWeeks: 3,
    p95TargetMs: 200,
    devOpsCapacity: "none",
  },

  constraints: [
    {
      id: "budget",
      label: "Infrastructure Budget ≤ $200/month",
      weight: 4,
      description: "Monthly infrastructure cost must remain under $200 USD.",
    },
    {
      id: "team-capability",
      label: "Team Can Deliver Without New Learning Curve",
      weight: 5,
      description:
        "The team must be able to build and maintain this without significant ramp-up time.",
    },
    {
      id: "delivery-speed",
      label: "Deliverable Within 3 Weeks",
      weight: 5,
      description:
        "First working version must be deployed within 3 weeks.",
    },
    {
      id: "performance",
      label: "p95 Response Time < 200ms",
      weight: 3,
      description:
        "Dashboard queries must return in under 200ms at p95 under moderate load.",
    },
    {
      id: "operational-complexity",
      label: "Operable Without Dedicated DevOps",
      weight: 4,
      description:
        "The team has no dedicated DevOps. Infrastructure must be manageable by engineers.",
    },
    {
      id: "reversibility",
      label: "No Hard Vendor Lock-in",
      weight: 2,
      description:
        "Architecture should not create dependencies that are costly to undo within 12 months.",
    },
  ],

  options: [
    {
      id: "monolith",
      label: "Option A — Monolith (Next.js API Routes)",
      capabilities: [
        {
          constraintId: "budget",
          satisfaction: "PASS",
          note:
            "Runs on existing Vercel deployment. No additional infrastructure cost at current scale.",
        },
        {
          constraintId: "team-capability",
          satisfaction: "PASS",
          note:
            "Team already builds in Next.js daily. Zero ramp-up required.",
        },
        {
          constraintId: "delivery-speed",
          satisfaction: "PASS",
          note:
            "API routes can be added to existing codebase immediately. No new service setup.",
        },
        {
          constraintId: "performance",
          satisfaction: "PARTIAL",
          note:
            "Adequate at current scale. Cold starts on Vercel Functions may cause p95 spikes " +
            "under initial load. Acceptable for internal tooling at this team size.",
        },
        {
          constraintId: "operational-complexity",
          satisfaction: "PASS",
          note:
            "Managed deployment via Vercel. No server management required.",
        },
        {
          constraintId: "reversibility",
          satisfaction: "PARTIAL",
          note:
            "Vercel has some lock-in characteristics, but API routes are standard — " +
            "migration to separate service is feasible if needed.",
        },
      ],
    },

    {
      id: "node-service",
      label: "Option B — Separate Node.js Service (Fastify)",
      capabilities: [
        {
          constraintId: "budget",
          satisfaction: "PARTIAL",
          note:
            "Requires a persistent server (Railway, Render, or small EC2). " +
            "Estimated $20–40/month. Within budget but adds a new cost line.",
        },
        {
          constraintId: "team-capability",
          satisfaction: "PARTIAL",
          note:
            "Team knows Node.js but has not run a separate service before. " +
            "Setup and deployment pipeline will add 3–5 days of learning.",
        },
        {
          constraintId: "delivery-speed",
          satisfaction: "PARTIAL",
          note:
            "New service, new deployment, new CI configuration. " +
            "Feasible in 3 weeks but leaves little margin.",
        },
        {
          constraintId: "performance",
          satisfaction: "PASS",
          note:
            "Persistent Node.js process eliminates cold starts. " +
            "Fastify is well-suited to high-throughput query APIs.",
        },
        {
          constraintId: "operational-complexity",
          satisfaction: "PARTIAL",
          note:
            "Manageable on Railway or Render, but adds a second deployment " +
            "target to monitor, update, and maintain.",
        },
        {
          constraintId: "reversibility",
          satisfaction: "PASS",
          note:
            "Standard Node.js with no proprietary APIs. Fully portable.",
        },
      ],
    },

    {
      id: "serverless",
      label: "Option C — Serverless Functions (AWS Lambda)",
      capabilities: [
        {
          constraintId: "budget",
          satisfaction: "PASS",
          note:
            "Serverless pricing at this scale is effectively free. " +
            "Well within $200/month at internal usage levels.",
        },
        {
          constraintId: "team-capability",
          satisfaction: "FAIL",
          note:
            "Team has minimal serverless experience. AWS configuration, IAM, " +
            "API Gateway setup, and cold start tuning all require significant learning.",
        },
        {
          constraintId: "delivery-speed",
          satisfaction: "FAIL",
          note:
            "Setting up a production-ready Lambda environment from scratch " +
            "with this team's current familiarity would likely exceed 3 weeks.",
        },
        {
          constraintId: "performance",
          satisfaction: "PARTIAL",
          note:
            "Cold starts are a real risk for dashboard latency. " +
            "Provisioned concurrency mitigates this but adds cost and complexity.",
        },
        {
          constraintId: "operational-complexity",
          satisfaction: "FAIL",
          note:
            "AWS configuration surface area is large. " +
            "Without DevOps, this creates ongoing maintenance burden.",
        },
        {
          constraintId: "reversibility",
          satisfaction: "FAIL",
          note:
            "AWS Lambda creates meaningful vendor dependency. " +
            "Migration away is feasible but non-trivial.",
        },
      ],
    },
  ],
};
