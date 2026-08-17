import { Container } from "@/components/ui/Container";
import { philosophy } from "@/content/company/philosophy";

export function DecisionLayer() {
  return (
    <section
      id="decision-layer"
      aria-labelledby="decision-layer-heading"
      className="py-32 md:py-40 border-t border-border"
    >
      <Container>
        <p className="mb-6 text-xs font-medium tracking-[0.3em] text-muted uppercase">
          The Intelligent Decision Layer
        </p>

        <h2
          id="decision-layer-heading"
          className="mb-16 max-w-2xl text-3xl font-semibold leading-tight tracking-tight text-foreground md:text-4xl"
        >
          From information to action.
        </h2>

        <ol aria-label="Intelligent decision pipeline" className="relative flex flex-col gap-0">
          <div
            aria-hidden="true"
            className="absolute left-[11px] top-3 bottom-3 w-px bg-border md:left-[15px]"
          />

          {philosophy.pipeline.map((item, index) => (
            <li key={item.step} className="relative flex items-start gap-6 py-6 md:gap-10">
              <div
                aria-hidden="true"
                className="relative z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-border bg-surface text-xs text-muted md:h-8 md:w-8"
              >
                {index + 1}
              </div>

              <div className="flex flex-col gap-1 pt-0.5">
                <span className="text-base font-semibold tracking-tight text-foreground md:text-lg">
                  {item.step}
                </span>
                <span className="text-sm leading-relaxed text-muted">
                  {item.description}
                </span>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
