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
] as const;

export const researchMeta = {
  label: "Active Research",
  title: "What Aryntra is researching.",
  description:
    "Beyond conceptual exploration, Aryntra conducts targeted research experiments into reasoning, continuity, and reliable system state.",
} as const;
