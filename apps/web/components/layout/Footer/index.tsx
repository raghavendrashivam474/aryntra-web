import { Container } from "@/components/ui/Container";
import { positioning } from "@/content/company/positioning";
import { contactEmail, socialLinks } from "@/content/company/presence";
import Image from "next/image";
import Link from "next/link";

function InstagramIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function LinkedInIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function MailIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer role="contentinfo" className="border-t border-border mt-32">
      <Container as="div">
        <div className="flex flex-col gap-10 py-16 md:flex-row md:items-start md:justify-between">
          {/* Brand Identity */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <Image
                src="/brand/aryntra-symbol.png"
                alt=""
                width={32}
                height={32}
                className="h-6 w-6 sm:h-7 sm:w-7 shrink-0 object-contain opacity-95"
              />
              <span className="text-base font-semibold tracking-[0.2em] text-foreground uppercase">
                {positioning.name}
              </span>
            </div>
            <span className="text-xs text-muted max-w-xs leading-relaxed">
              {positioning.tagline}
            </span>
          </div>

          {/* Navigation & Presence with Icons */}
          <div className="flex flex-col sm:flex-row gap-8 sm:gap-12 text-sm text-muted">
            {/* Direct Email Contact */}
            <div className="flex flex-col gap-2.5">
              <span className="text-xs font-mono text-subtle tracking-wider uppercase">
                Contact
              </span>
              <a
                href={contactEmail.href}
                aria-label={`Email Aryntra at ${contactEmail.address}`}
                className="inline-flex items-center gap-2 text-muted hover:text-foreground transition-colors duration-200 focus-visible:outline focus-visible:outline-1 focus-visible:outline-foreground"
              >
                <MailIcon className="w-4 h-4 shrink-0 text-subtle hover:text-foreground" />
                <span>{contactEmail.address}</span>
              </a>
            </div>

            {/* Social Presence Icons */}
            <div className="flex flex-col gap-2.5">
              <span className="text-xs font-mono text-subtle tracking-wider uppercase">
                Presence
              </span>
              <ul className="flex items-center gap-3" aria-label="Social links">
                {socialLinks.map((link) => (
                  <li key={link.id}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={link.label}
                      title={link.label}
                      className="inline-flex items-center justify-center h-8 w-8 rounded-md border border-border bg-surface text-muted transition-colors duration-200 hover:border-border-light hover:bg-surface-2 hover:text-foreground focus-visible:outline focus-visible:outline-1 focus-visible:outline-foreground"
                    >
                      {link.id === "instagram" && <InstagramIcon className="w-4 h-4" />}
                      {link.id === "linkedin" && <LinkedInIcon className="w-4 h-4" />}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Section Index */}
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

        {/* Copyright */}
        <div className="border-t border-border-light py-6">
          <p className="text-xs text-subtle">
            &copy; {year} {positioning.name}. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}