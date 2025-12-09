import { Component, Github, Layout } from "lucide-react";

export const layoutConfig = {
  myBrand: { name: "MC BRANDD", slogan: "Branding Website", logoLight: "/logo-light-removebg.svg", logoDark: "/logo-dark-removebg.svg" },
  faviconImage: "/favicon-dark.ico",

  theme: "light",

  NAVBAR_LINKS: [
    // { label: "Home", href: "/" , icon: Component },
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Components", href: "/components" },
    { label: "Services", href: "/services" },
    { label: "Contact", href: "/contact" },
  ],

  FOOTER_LINKS: {
    // { label: "Privacy Policy", href: "/privacy-policy" },
    // { label: "Terms of Service", href: "/terms-of-service" },
    // { label: "Contact Us", href: "/contact" },

    quickLinks: [
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms of Service", href: "/terms-of-service" },
      { label: "Contact Us", href: "/contact" },
    ],

    socials: [
      {
        href: "https://github.com/mchai2632",
        icon: <Github />,
      },
    ],
  },
};
