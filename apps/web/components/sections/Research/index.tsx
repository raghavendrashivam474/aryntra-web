import { Container } from "@/components/ui/Container";
import { researchProjects, researchMeta } from "@/content/company/research";

export function Research() {
  return (
    <section
      id="research"
      aria-labelledby="research-heading"
      className="py-32 md:py-40 border-t border-border"
    >
      <Container>
        {/* Section Header */}
        <div className="mb-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col gap-4">
            <p className="text-xs font-medium tracking-[0.3em] text-muted uppercase">
              {researchMeta.label}
            </p>
            <h2
              id="research-heading"
              className="max-w-xl text-3xl font-semibold leading-tight tracking-tight text-foreground md:text-4xl"
            >
              {researchMeta.title}
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-muted">
            {researchMeta.description}
          </p>
        </div>

        {/* Project Grid */}
        <ul
          aria-label="Aryntra active research projects"
          className="grid grid-cols-1 gap-px border border-border bg-border lg:grid-cols-3"
        >
          {researchProjects.map((project, index) => (
            <li
              key={project.id}
              className="flex flex-col justify-between bg-surface p-8 transition-colors duration-200 hover:bg-surface-2"
            >
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <span aria-hidden="true" className="text-xs font-mono text-subtle">
                    0{index + 1}
                  </span>
                  <span className="text-[11px] font-mono tracking-wider uppercase text-muted">
                    {project.category}
                  </span>
                </div>

                <h3 className="text-lg font-semibold tracking-tight text-foreground">
                  {project.name}
                </h3>

                <p className="text-sm leading-relaxed text-muted">
                  {project.description}
                </p>
              </div>

              {/* Status and Action boundary */}
              <div className="mt-8 flex items-center justify-between border-t border-border/60 pt-4 text-xs font-mono">
                <span className="inline-flex items-center gap-1.5 text-muted">
                  <span
                    className="h-1.5 w-1.5 rounded-full bg-emerald-500/80"
                    aria-hidden="true"
                  />
                  {project.status}
                </span>

                {project.href ? (
                  <a
                    href={project.href}
                    className="text-foreground underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-1 focus-visible:outline-foreground"
                  >
                    {project.hrefLabel ?? "Explore"} →
                  </a>
                ) : (
                  <span className="text-subtle">
                    Internal Research
                  </span>
                )}
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
