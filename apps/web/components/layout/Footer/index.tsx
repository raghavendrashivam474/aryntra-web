import { Container } from "@/components/ui/Container";
import { positioning } from "@/content/company/positioning";
import Link from "next/link";

export function Footer() {
  return (
    <footer role="contentinfo" className="border-t border-border mt-32">
      <Container as="div">
        <div className="flex flex-col gap-8 py-16 md:flex-row md:items-start md:justify-between">
          <div className="flex flex-col gap-2">
            <span className="text-sm font-semibold tracking-[0.2em] text-foreground uppercase">
              {positioning.name}
            </span>
            <span className="text-xs text-muted max-w-xs leading-relaxed">
              {positioning.tagline}
            </span>
          </div>

          <nav aria-label="Footer navigation">
            <ul className="flex flex-col gap-3 text-sm text-muted sm:flex-row sm:gap-8">
              <li>
                <Link
                  href="/"
                  className="hover:text-foreground transition-colors duration-200"
                >
                  Home
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="border-t border-border-light py-6">
          <p className="text-xs text-subtle">
            &copy; {positioning.year} {positioning.name}. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
