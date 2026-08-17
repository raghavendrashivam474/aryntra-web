export const philosophy = {
  headline: "Software can calculate.",
  subheadline: "We want it to understand.",
  body: [
    "The world contains increasing amounts of information, but information alone does not create understanding.",
    "The gap between data and decision is where most complexity lives. Aryntra works in that gap — building systems that can reason about context, surface what matters, and help people act with confidence.",
  ],
  pipeline: [
    { step: "Observe",    description: "Gather signals from the environment" },
    { step: "Understand", description: "Build meaning from raw information" },
    { step: "Reason",     description: "Identify relationships and implications" },
    { step: "Decide",     description: "Surface the right action at the right moment" },
    { step: "Create",     description: "Generate new artifacts and environments" },
    { step: "Act",        description: "Execute with precision and confidence" },
  ],
} as const;
