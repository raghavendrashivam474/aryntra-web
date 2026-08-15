import { Container } from "@/components/ui/Container";
import { explorationAreas } from "@/content/company/exploration";

export function Exploration() {
  return (
    <section
      id="exploration"
      aria-labelledby="exploration-heading"
      className="py-32 md:py-40 border-t border-border"
    >
      <Container as="section">
        <div className="mb-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col gap-4">
            <p className="text-xs font-medium tracking-[0.3em] text-muted uppercase">
              Areas of Exploration
            </p>
            <h2
              id="exploration-heading"
              className="max-w-xl text-3xl font-semibold leading-tight tracking-tight text-foreground md:text-4xl"
            >
              What Aryntra is exploring.
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-muted">
            These are not products. They are directions — areas where intelligent
            systems can change how people and organizations operate.
          </p>
        </div>

        <ul
          aria-label="Aryntra exploration areas"
          className="grid grid-cols-1 gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3"
        >
          {explorationAreas.map((area, index) => (
            <li
              key={area.id}
              className="flex flex-col gap-4 bg-surface p-8 transition-colors duration-200 hover:bg-surface-2"
            >
              <span aria-hidden="true" className="text-xs font-mono text-subtle">
                0{index + 1}
              </span>
              <h3 className="text-base font-semibold tracking-tight text-foreground">
                {area.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted">
                {area.description}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
