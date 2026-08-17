import { Container } from "@/components/ui/Container";
import { positioning } from "@/content/company/positioning";

export function Future() {
  return (
    <section
      id="future"
      aria-labelledby="future-heading"
      className="py-32 md:py-40 border-t border-border"
    >
      <Container>
        <div className="flex flex-col items-center gap-8 text-center">
          <p className="text-xs font-medium tracking-[0.3em] text-muted uppercase">
            What comes next
          </p>

          <h2
            id="future-heading"
            className="max-w-2xl text-3xl font-semibold leading-tight tracking-tight text-foreground md:text-5xl"
          >
            The systems will change.
            <br />
            <span className="text-muted">The direction will remain.</span>
          </h2>

          <p className="max-w-lg text-base leading-relaxed text-muted">
            {positioning.name} will evolve through focused systems, research,
            experiments, and products. Each branch grows from a single trunk — a
            commitment to intelligence that is precise, purposeful, and deeply
            useful.
          </p>

          <div
            aria-hidden="true"
            className="mt-8 flex flex-col items-center gap-1 font-mono text-xs select-none"
          >
            <div className="flex gap-8 text-subtle">
              <span>Systems</span>
              <span>Research</span>
              <span>Labs</span>
            </div>
            <div className="flex gap-1 text-border">
              <span>\</span>
              <span>|</span>
              <span>/</span>
            </div>
            <div className="flex flex-col items-center gap-0.5">
              <div className="w-px h-6 bg-border" />
              <span className="text-muted font-semibold tracking-widest uppercase text-xs">
                Aryntra
              </span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
