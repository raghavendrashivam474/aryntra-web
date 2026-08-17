import { Container } from "@/components/ui/Container";
import { philosophy } from "@/content/company/philosophy";

export function Introduction() {
  return (
    <section
      id="introduction"
      aria-labelledby="introduction-heading"
      className="py-32 md:py-40"
    >
      <Container>
        <div className="grid grid-cols-1 gap-16 md:grid-cols-2 md:gap-24">
          <div className="flex flex-col gap-6">
            <h2
              id="introduction-heading"
              className="text-3xl font-semibold leading-tight tracking-tight text-foreground md:text-4xl"
            >
              {philosophy.headline}
              <br />
              <span className="text-muted">{philosophy.subheadline}</span>
            </h2>
            <div className="h-px w-12 bg-accent" />
          </div>

          <div className="flex flex-col gap-5">
            {philosophy.body.map((paragraph, i) => (
              <p key={i} className="text-base leading-relaxed text-muted md:text-lg">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
