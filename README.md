\# Aryntra Web



The official web platform for \*\*Aryntra — India's Intelligent Decision Layer\*\*.



Aryntra Web is designed as the digital foundation for Aryntra's evolving company identity, systems, research, and future ecosystem.



\## Vision



Aryntra explores intelligent systems that help people:



\*\*Understand → Reason → Decide → Build → Create\*\*



The website follows a long-term \*\*banyan-tree growth model\*\*:



> Build a strong trunk first. Let future branches emerge when they earn their place.



The initial implementation is intentionally small. Future capabilities such as systems, research, labs, and interactive experiences will be introduced incrementally rather than being built prematurely.



\## Current Phase



\### M0.2 — Architecture Foundation \& Phase 0 Landing Experience



\*\*Status: Complete\*\*



The current website establishes:



\- Aryntra's identity

\- India's Intelligent Decision Layer positioning

\- Company philosophy

\- Conceptual decision pipeline

\- Areas of exploration

\- Future direction



The current phase intentionally does \*\*not\*\* include:



\- Authentication

\- Database

\- CMS

\- Backend API

\- Product management

\- Ecosystem infrastructure

\- AI chatbot

\- Individual product portals



See \[`docs/decisions/M0.2-completion.md`](docs/decisions/M0.2-completion.md) for the complete completion report.



\## Architecture



The repository is structured to support gradual evolution.



```text

aryntra-web/

├── apps/

│   └── web/              # Main Next.js application

│

├── packages/

│   ├── ui/               # Future shared UI primitives

│   ├── types/            # Future shared types

│   ├── config/           # Future shared configuration

│   └── utils/            # Future shared utilities

│

├── docs/

│   ├── architecture/

│   ├── ux/

│   └── decisions/

│

└── .github/

&#x20;   └── workflows/

```



The packages/\* directories are intentionally kept lightweight. A package should only be introduced when genuine cross-application reuse exists.



Technology

Next.js

React

TypeScript

Tailwind CSS

pnpm

ESLint



Development



Install dependencies:

```Powershell

pnpm install

```

Run the development server:

```Powershell

pnpm dev

```

Build for production:

```Powershell

pnpm build

```

Run lint:

```Powershell

pnpm lint
```
```text 
Architecture Principles

Stable contracts, replaceable implementations



The website should be able to evolve without tightly coupling presentation to future infrastructure.



For example, content may initially live in source-controlled TypeScript or MDX and later move to a CMS or API without requiring a complete UI rewrite.



Build only what has earned its place



Future branches should be introduced when they represent real Aryntra capabilities.



Avoid speculative infrastructure.



The website evolves with Aryntra



Aryntra Web is not intended to be a static company brochure.



It will gradually evolve alongside the company and its systems.

```
```text

Repository Status



Current phase:



M0.2 — Complete


```
Next milestones will be defined based on the actual evolution of Aryntra rather than a fixed long-term feature list.



Aryntra



India's Intelligent Decision Layer

