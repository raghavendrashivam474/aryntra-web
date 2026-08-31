export type ResearchStatus =
  | "Research"
  | "Experimental Research"
  | "Research / Implementation";

export interface ResearchProject {
  id: string;
  name: string;
  category: string;
  status: ResearchStatus;
  description: string;
  href: string | null;
  hrefLabel: string | null;
}

export const researchProjects: readonly ResearchProject[] = [
  {
    id: "synapse",
    name: "Aryntra Synapse",
    category: "Intelligence Architecture",
    status: "Research",
    description:
      "Investigating how structured reasoning pathways can be composed, evaluated, and routed across heterogeneous intelligence surfaces.",
    href: null,
    hrefLabel: null,
  },
  {
    id: "continuumx",
    name: "ContinuumX",
    category: "System Continuity",
    status: "Experimental Research",
    description:
      "Experimental research into temporal reliability problems: system state drift, evaluation drift, knowledge expiration, context contribution, decision archaeology, and research environment fingerprinting.",
    href: null,
    hrefLabel: null,
  },
  {
    id: "refracto",
    name: "Aryntra Refracto",
    category: "Session Continuity",
    status: "Research / Implementation",
    description:
      "Minimum sufficient, verified project context for continuity across human and AI-agent sessions.",
    href: null,
    hrefLabel: null,
  },
  {
    id: "madhav",
    name: "Madhav",
    category: "Evidence Architecture",
    status: "Research / Implementation",
    description:
      "Research into evidence-oriented systems: investigating how resolution, provenance, retrieval, and measurable quality can form the foundation of reliable intelligence.",
    href: null,
    hrefLabel: null,
  },
] as const;

export const researchMeta = {
  label: "Active Research",
  title: "What Aryntra is researching.",
  description:
    "Beyond conceptual exploration, Aryntra conducts targeted research experiments into reasoning, continuity, and reliable system state.",
} as const;

export const researchHorizon = {
  id: "madhav-horizon",
  name: "Madhav",
  subtitle: "A Research Direction",
  shortDescription:
    "A longer-term exploration into evidence, knowledge, retrieval, resolution, and reasoning systems.",
  expandedDescription:
    "Some of our current research points toward larger systems. Madhav represents an emerging direction: investigating how evidence-oriented foundations—resolution, provenance, retrieval, and measurable quality—might support more reliable intelligence systems. This remains early research; current validation focuses on core mechanisms rather than full system integration.",
  exploreLabel: "Explore the direction",
} as const;
