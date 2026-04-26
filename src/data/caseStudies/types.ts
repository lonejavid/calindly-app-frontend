export type CaseStudyBlock =
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "quote"; quote: string; attribution: string }
  | { type: "metrics"; items: { val: string; label: string }[]; tone: "navy" | "teal" | "purple" }
  | { type: "table"; headers: string[]; rows: string[][] }
  | { type: "callout"; text: string }
  | { type: "cta"; text: string };

export type CaseStudyDoc = {
  id: string;
  num: string;
  industryLine: string;
  servicesLine: string;
  title: string;
  subtitle: string;
  /** Short preview shown on the case studies index card (not the full story). */
  cardPreview: string;
  glanceRows: [string, string][];
  blocks: CaseStudyBlock[];
};

export type CaseStudiesCover = {
  brand: string;
  title: string;
  subtitle: string;
  teasers: { num: string; name: string; meta: string; challenge: string }[];
};

export type CaseStudiesClosing = {
  title: string;
  subtitle: string;
  blocks: CaseStudyBlock[];
};
