import type { CaseStudiesClosing } from "./types";

export const caseStudiesClosing: CaseStudiesClosing = {
  title: "What These Three Stories Have in Common",
  subtitle: "Three different companies, three different problems, one consistent pattern.",
  blocks: [
    {
      type: "p",
      text: "NovaBridge needed a predictable pipeline. Priya needed qualified meetings and reclaimed time. Archway needed to move faster without adding headcount. Their industries, team sizes, and specific challenges were all different.",
    },
    {
      type: "p",
      text: "But each of them experienced the same underlying problem: the tools they were using were designed for individual tasks, not for an integrated system. Outreach in one tool. Booking in another. Pipeline in a third. Hiring in a fourth. Each transition between systems was a friction point, a data handoff, a potential failure.",
    },
    {
      type: "p",
      text: "Schedley resolved this not by being a slightly better version of any individual tool, but by being the first platform to treat AI Outreach, Pipeline Generation, Hiring Infrastructure, and Calendar Intelligence as parts of one system — where each service feeds the next, and the data that makes each one smarter is shared across all of them.",
    },
    {
      type: "callout",
      text: "The teams and professionals in these case studies didn't change their strategy. They changed their infrastructure. And infrastructure, when it's right, changes everything.",
    },
    { type: "h2", text: "Common Outcomes Across All Three Cases" },
    {
      type: "table",
      headers: ["Outcome", "NovaBridge  ·  Priya Mehta  ·  Archway"],
      rows: [
        ["Spam/junk bookings eliminated", "91% drop  ·  94% drop  ·  Validated candidate links"],
        ["Time recovered per week", "90 min (sales ops)  ·  9.4 hrs (full)  ·  Days per search"],
        ["Qualified meetings / responses", "3.2× more  ·  2.4× more  ·  3.1× candidate response"],
        ["New pipeline from AI Outreach", "$1.1M (90 days)  ·  2 new retainers  ·  4 new clients"],
        ["Tool consolidation", "3 tools → 1  ·  3 tools → 1  ·  4 tools → 1"],
      ],
    },
    { type: "cta", text: "Ready to build your version of this story? Start at schedley.com" },
  ],
};
