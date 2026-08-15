export const explorationAreas = [
  {
    id: "decision",
    title: "Decision Intelligence",
    description:
      "Systems that help people understand complex situations and make informed decisions with confidence.",
  },
  {
    id: "knowledge",
    title: "Knowledge Intelligence",
    description:
      "Systems that connect information, context, relationships, and organizational memory.",
  },
  {
    id: "developer",
    title: "Developer Intelligence",
    description:
      "Systems that understand software as a living system — its history, health, and trajectory.",
  },
  {
    id: "failure",
    title: "Failure Intelligence",
    description:
      "Systems that learn from previous failures and turn organizational memory into actionable evidence.",
  },
  {
    id: "spatial",
    title: "Spatial Intelligence",
    description:
      "Systems that understand space, geometry, environments, and how humans move through them.",
  },
  {
    id: "creation",
    title: "Creation Intelligence",
    description:
      "Exploring how humans may eventually shape digital environments through natural interaction.",
  },
] as const;

export type ExplorationArea = (typeof explorationAreas)[number];
