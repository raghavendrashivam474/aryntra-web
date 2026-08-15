export const philosophy = {
  headline: "Software can calculate.",
  subheadline: "We want it to understand.",
  body: [
    "The world contains increasing amounts of information, but information alone does not create understanding.",
    "Aryntra explores the layer between information and action — systems capable of understanding context, reasoning across relationships, and helping humans navigate complex decisions.",
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
