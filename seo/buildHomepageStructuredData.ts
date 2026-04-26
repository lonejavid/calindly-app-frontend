/** Used by Vite `transformIndexHtml` to emit static JSON-LD in `dist/index.html` (no `@/` imports). */

const LOGO_PATH = "/mylogo2.png";

export function buildHomepageJsonLdBlocks(origin: string): { id: string; data: Record<string, unknown> }[] {
  const base = origin.replace(/\/$/, "");
  return [
    {
      id: "jsonld-schedley-organization",
      data: {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "Schedley",
        url: base,
        logo: `${base}${LOGO_PATH}`,
        description:
          "AI-powered B2B lead generation platform with intelligent scheduling and email validation",
        sameAs: ["https://www.linkedin.com/company/schedley-com"],
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "Customer Service",
          email: "notification@schedley.com",
          availableLanguage: "en",
        },
        address: {
          "@type": "PostalAddress",
          addressCountry: "US",
        },
      },
    },
    {
      id: "jsonld-schedley-softwareapplication",
      data: {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: "Schedley",
        description:
          "Enterprise B2B lead generation platform with AI email validation and calendar control",
        url: base,
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web, iOS, Android",
        offers: {
          "@type": "Offer",
          priceCurrency: "USD",
          availability: "https://schema.org/OnlineOnly",
          url: `${base}/contact`,
          description: "7-day free trial with 100% money-back guarantee",
        },
        creator: {
          "@type": "Organization",
          name: "Schedley Inc.",
        },
      },
    },
  ];
}

export function buildHomepageJsonLdScriptTags(origin: string): string {
  return buildHomepageJsonLdBlocks(origin)
    .map(
      ({ id, data }) =>
        `<script type="application/ld+json" id="${id}">${JSON.stringify(data)}</script>`,
    )
    .join("\n    ");
}
