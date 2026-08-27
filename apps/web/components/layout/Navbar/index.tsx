import { Container } from "@/components/ui/Container";
import { contactEmail } from "@/content/company/presence";
import Image from "next/image";
import Link from "next/link";

export function Navbar() {
  return (
    <header
      role="banner"
      className="fixed top-0 left-0 right-0 z-50 border-b border-border-light bg-background/80 backdrop-blur-sm"
    >
      <Container as="div">
        <nav
          role="navigation"
          aria-label="Main navigation"
          className="flex h-16 items-center justify-between"
        >
          <Link
            href="/"
            aria-label="Aryntra — return to homepage"
            className="flex items-center gap-2.5 text-sm font-semibold tracking-[0.2em] text-foreground uppercase hover:text-muted transition-colors duration-200"
          >
            <Image
              src="/brand/aryntra-symbol.png"
              alt=""
              width={24}
              height={24}
              className="h-6 w-6 shrink-0 object-contain"
              priority
            />
            <span>Aryntra</span>
          </Link>

          <div className="flex items-center gap-6">
            <a
              href={contactEmail.href}
              className="text-xs tracking-widest text-muted uppercase hover:text-foreground transition-colors duration-200"
            >
              Contact
            </a>
          </div>
        </nav>
      </Container>
    </header>
  );
}