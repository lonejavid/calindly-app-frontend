import { SITE_ORIGIN } from "@/lib/site";

const LOGO_PATH = "/schedley-logo.png";

export const homepageJsonLdScripts: { id: string; data: Record<string, unknown> }[] = [
  {
    id: "jsonld-schedley-organization",
    data: {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Schedley",
      url: SITE_ORIGIN,
      logo: `${SITE_ORIGIN}${LOGO_PATH}`,
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
      url: SITE_ORIGIN,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web, iOS, Android",
      offers: {
        "@type": "Offer",
        priceCurrency: "USD",
        availability: "https://schema.org/OnlineOnly",
        url: `${SITE_ORIGIN}/contact`,
        description: "7-day free trial with 100% money-back guarantee",
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        ratingCount: "50",
        bestRating: "5",
        worstRating: "1",
      },
      creator: {
        "@type": "Organization",
        name: "Schedley Inc.",
      },
    },
  },
];
