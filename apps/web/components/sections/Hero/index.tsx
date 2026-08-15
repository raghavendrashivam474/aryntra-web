import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { positioning } from "@/content/company/positioning";

export function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden pt-16"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(var(--color-border-light) 1px, transparent 1px), linear-gradient(90deg, var(--color-border-light) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage:
            "radial-gradient(ellipse 80% 60% at 50% 50%, black 30%, transparent 100%)",
        }}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full"
        style={{
          background:
            "radial-gradient(ellipse at center, var(--color-accent-glow) 0%, transparent 70%)",
        }}
      />

      <Container as="section">
        <div className="relative flex flex-col items-center gap-8 text-center">
          <span className="text-xs font-medium tracking-[0.3em] text-muted uppercase">
            {positioning.name}
          </span>

          <h1
            id="hero-heading"
            className="max-w-4xl text-5xl font-semibold leading-[1.1] tracking-tight text-foreground sm:text-6xl md:text-7xl lg:text-8xl"
          >
            India&apos;s Intelligent{" "}
            <span className="text-muted">Decision Layer</span>
          </h1>

          <p className="max-w-xl text-base leading-relaxed text-muted md:text-lg">
            {positioning.shortDescription}
          </p>

          <div className="flex flex-col items-center gap-4 sm:flex-row">
            <Button as="a" href="#introduction" variant="primary" size="md">
              Explore Aryntra
            </Button>
            <Button as="a" href="#exploration" variant="ghost" size="md">
              What we are building
            </Button>
          </div>
        </div>
      </Container>

      <div
        aria-hidden="true"
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-subtle"
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <div className="h-6 w-px bg-border" />
      </div>
    </section>
  );
}
