import { Container } from "@/components/ui/Container";
import { positioning } from "@/content/company/positioning";
import { contactEmail, socialLinks } from "@/content/company/presence";
import Link from "next/link";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer role="contentinfo" className="border-t border-border mt-32">
      <Container as="div">
        <div className="flex flex-col gap-10 py-16 md:flex-row md:items-start md:justify-between">
          {/* Brand Identity */}
          <div className="flex flex-col gap-2">
            <span className="text-sm font-semibold tracking-[0.2em] text-foreground uppercase">
              {positioning.name}
            </span>
            <span className="text-xs text-muted max-w-xs leading-relaxed">
              {positioning.tagline}
            </span>
          </div>

          {/* Navigation & Presence */}
          <div className="flex flex-col sm:flex-row gap-8 sm:gap-14 text-sm text-muted">
            {/* Direct Contact */}
            <div className="flex flex-col gap-2.5">
              <span className="text-xs font-mono text-subtle tracking-wider uppercase">
                Contact
              </span>
              <a
                href={contactEmail.href}
                className="text-muted hover:text-foreground transition-colors duration-200 focus-visible:outline focus-visible:outline-1 focus-visible:outline-foreground"
              >
                {contactEmail.address}
              </a>
            </div>

            {/* Public Presence */}
            <div className="flex flex-col gap-2.5">
              <span className="text-xs font-mono text-subtle tracking-wider uppercase">
                Presence
              </span>
              <ul className="flex items-center gap-4">
                {socialLinks.map((link) => (
                  <li key={link.id}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted hover:text-foreground transition-colors duration-200 focus-visible:outline focus-visible:outline-1 focus-visible:outline-foreground"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Navigation */}
            <div className="flex flex-col gap-2.5">
              <span className="text-xs font-mono text-subtle tracking-wider uppercase">
                Index
              </span>
              <ul className="flex items-center gap-4">
                <li>
                  <Link
                    href="#exploration"
                    className="hover:text-foreground transition-colors duration-200 focus-visible:outline focus-visible:outline-1 focus-visible:outline-foreground"
                  >
                    Exploration
                  </Link>
                </li>
                <li>
                  <Link
                    href="#research"
                    className="hover:text-foreground transition-colors duration-200 focus-visible:outline focus-visible:outline-1 focus-visible:outline-foreground"
                  >
                    Research
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Copyright boundary */}
        <div className="border-t border-border-light py-6">
          <p className="text-xs text-subtle">
            &copy; {year} {positioning.name}. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
