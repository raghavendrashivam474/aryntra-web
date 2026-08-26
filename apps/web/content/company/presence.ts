// apps/web/content/company/presence.ts
// S1.10 — Contact & Public Presence
// Source of truth for Aryntra's verified contact and public channels.

export interface PresenceChannel {
  id: string;
  label: string;
  href: string;
  isExternal?: boolean;
}

export const contactEmail = {
  address: "aryntra3@gmail.com",
  href: "mailto:aryntra3@gmail.com",
} as const;

export const socialLinks: readonly PresenceChannel[] = [
  {
    id: "instagram",
    label: "Instagram",
    href: "https://www.instagram.com/aryntra/",
    isExternal: true,
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/aryantraa/",
    isExternal: true,
  },
] as const;
