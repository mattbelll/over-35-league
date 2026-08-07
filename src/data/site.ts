/**
 * Global site configuration. Edit these values to rebrand the site — the name,
 * tagline, contact details and navigation are consumed across every page.
 */
export const site = {
  name: "Over 35 League",
  shortName: "Over 35 League",
  tagline: "Recreational hockey for players 35 and up.",
  description:
    "The Over 35 League is an adult recreational hockey league at Carolina Ice Palace. Eight teams, a full season of games, playoffs — competitive, friendly hockey for players 35 and over.",
  url: "https://over35league.netlify.app",
  ogImage: "/og-default.svg",
  location: "Carolina Ice Palace · North Charleston, SC",
  email: "info@over35league.example",
  phone: "(555) 013-7425",
  seasonLabel: "Summer 2026 Season",
  registrationUrl: "/registration",
  // Drop your Tally or Google Forms embed URL here to activate the live form.
  registrationEmbedUrl:
    "https://docs.google.com/forms/d/e/1FAIpQLSeJb3Z3kVAJ_BHzV-81Az62iUDj0Av5Rz6qP980zbKegzbW7A/viewform?embedded=true" as string,
  social: {
    facebook: "https://facebook.com/",
    instagram: "https://instagram.com/",
    x: "https://x.com/",
  },
} as const;

export const nav = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Teams", href: "/teams" },
  { label: "Schedule", href: "/schedule" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
] as const;
