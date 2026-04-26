import type { CaseStudyDoc } from "./types";

export const studyNovaBridge: CaseStudyDoc = {
  id: "nova-bridge",
  num: "1",
  industryLine: "B2B SaaS  ·  12-Person Sales Team",
  servicesLine: "AI Outreach  ·  Pipeline Generation  ·  Calendar Intelligence",
  title: "From Feast-or-Famine Pipeline to a Predictable Revenue Engine",
  subtitle:
    "How NovaBridge Solutions used Schedley to build a consistent B2B pipeline, eliminate spam bookings, and book 3× more qualified meetings per week",
  cardPreview:
    "A 12-person GTM team replaced ad-hoc outbound and Calendly spam with Schedley’s connected stack. Within 90 days they stabilized weekly qualified meetings, cut junk bookings by over 90%, and added seven figures of new pipeline from AI-driven outreach.",
  glanceRows: [
    ["Company", "NovaBridge Solutions (composite case study)"],
    ["Industry", "B2B SaaS — Project Management & Workflow Automation"],
    ["Team Size", "42 employees, 12-person sales & SDR team"],
    ["Revenue Stage", "Series A, $4.2M ARR growing toward $8M target"],
    ["Location", "Austin, TX (remote-first)"],
    ["Schedley Services", "AI Outreach, Pipeline Generation, Calendar Intelligence"],
  ],
  blocks: [
    { type: "h2", text: "The Situation Before Schedley" },
    {
      type: "p",
      text: "NovaBridge Solutions had product-market fit. Their workflow automation platform had a loyal customer base, strong NPS scores, and a clear ICP: operations directors and RevOps leads at mid-market companies between 100 and 500 employees. What they didn't have was a reliable way to find and engage those buyers consistently.",
    },
    {
      type: "p",
      text: "Their outbound motion was ad hoc. When the two SDRs on the team had bandwidth, they would manually research prospects, write individual emails, and send them from their personal inboxes. In busy months — when closing activity was high — outbound would stop entirely for weeks at a time. The pipeline reflected this perfectly: strong months followed by empty months, with no structural way to predict which would come next.",
    },
    {
      type: "p",
      text: "Their booking page had a second problem the team had partly normalized: spam. The company's Calendly link was embedded on their website, in every SDR's email signature, and on the pricing page. Of the roughly 40 bookings per month coming through that link, the sales ops manager estimated that 10-15 were from invalid email addresses, bots, or obvious junk — requiring manual triage before every week's meeting prep.",
    },
    {
      type: "quote",
      quote:
        "We were spending the first 20 minutes of every Monday morning just going through the calendar and figuring out which bookings were real. That's 80 minutes a month before we'd done anything else.",
      attribution: "Marcus D., Sales Operations Manager, NovaBridge Solutions",
    },
    { type: "h3", text: "The Core Problems" },
    {
      type: "ul",
      items: [
        "Inconsistent outbound: pipeline generation stopped whenever closing activity picked up, creating a feast-or-famine revenue cycle.",
        "No personalization at scale: SDRs wrote individual emails manually, limiting volume to 15-20 new contacts per day per rep.",
        "Spam-polluted calendar: ~25-35% of booking page submissions came from invalid or junk email addresses.",
        "Disconnected tools: outreach ran through personal email, booking through Calendly, and pipeline tracking through HubSpot — three systems with no shared data.",
        "Time-to-pipeline too slow: from ICP identification to a booked meeting averaged 18 days due to manual research and non-systematic follow-up.",
      ],
    },
    { type: "h2", text: "Why They Chose Schedley" },
    {
      type: "p",
      text: "NovaBridge evaluated three alternatives before choosing Schedley: Apollo.io for prospecting and sequences, Instantly for cold email infrastructure, and Calendly with a HubSpot integration for booking management. Each solved part of the problem. None solved all of it in a unified system.",
    },
    {
      type: "p",
      text: "The deciding factor was Schedley's Calendar Intelligence layer — specifically the real-time email validation and public domain filtering. The sales ops manager had spent months looking for a way to validate booking emails at submission rather than after the fact, and none of the competing tools offered it natively. Combined with the AI Outreach and Pipeline Generation services that could feed qualified prospects directly into that validated booking layer, Schedley offered an integrated system rather than another point solution to manage.",
    },
    { type: "h2", text: "Implementation: What They Set Up" },
    { type: "h3", text: "Week 1 — Calendar Intelligence Configuration" },
    {
      type: "p",
      text: "The team migrated from Calendly to Schedley's booking infrastructure. They connected all 12 sales team members' Google Workspace calendars via two-way sync, configured real-time email validation on all booking pages, and enabled public domain filtering — restricting bookings to corporate email domains only. Buffer times of 15 minutes were set between meetings, and a 24-hour minimum lead time was enforced to reduce last-minute no-shows.",
    },
    {
      type: "p",
      text: "Confirmation emails were customized to match NovaBridge's brand and include a one-page product overview. Reminder sequences were configured at 24 hours and 2 hours before each meeting.",
    },
    { type: "h3", text: "Weeks 2-3 — AI Outreach Sequence Build" },
    {
      type: "p",
      text: "Schedley's AI Outreach team worked with NovaBridge to build three ICP-specific email sequences targeting their primary buyer personas: VP of Operations at mid-market SaaS companies, RevOps Directors at professional services firms, and Heads of Project Management at technology companies with 100-500 employees. Each sequence ran 5 touches over 14 days, with AI-generated personalization drawing on company growth signals, recent hiring activity in operations roles, and technology stack signals indicating manual workflow pain.",
    },
    {
      type: "p",
      text: "The sequences were built for deliverability from day one: domain warm-up protocols, sending rotation across dedicated outreach domains, and reputation monitoring to ensure inbox placement across Gmail, Outlook, and corporate mail servers.",
    },
    { type: "h3", text: "Week 4 — Pipeline Generation Activation" },
    {
      type: "p",
      text: "The Pipeline Generation service was configured to run continuously against a refreshed prospect list of 2,400 contacts matching the three buyer personas, enriched weekly with new ICP-matched accounts. The system would identify, enrich, and enroll 80-120 new contacts per week automatically, sustaining outreach volume even during heavy closing periods when the SDR team's manual bandwidth was fully consumed by active deals.",
    },
    { type: "h2", text: "Results: 90 Days After Activation" },
    {
      type: "metrics",
      tone: "navy",
      items: [
        { val: "3.2×", label: "Qualified meetings per week" },
        { val: "91%", label: "Reduction in spam bookings" },
        { val: "18→6d", label: "Days to first meeting (avg)" },
        { val: "$1.1M", label: "New pipeline added (Q1)" },
      ],
    },
    { type: "h3", text: "Pipeline Consistency" },
    {
      type: "p",
      text: "The feast-or-famine cycle that had characterized NovaBridge's pipeline for 18 months was structurally broken within 60 days. Weekly qualified meeting volume stabilized at 22-26 meetings across the team, up from an average of 7-8 during outbound-active weeks and near zero during closing-heavy weeks. For the first time, the head of sales could project forward with confidence.",
    },
    { type: "h3", text: "Calendar Quality" },
    {
      type: "p",
      text: "Spam booking rate dropped from an estimated 28% to under 2% within the first week of Calendar Intelligence activation. The Monday morning triage ritual was eliminated. The sales ops manager reported recovering approximately 90 minutes per week previously spent on manual booking cleanup — time reallocated to sequence performance analysis.",
    },
    { type: "h3", text: "Meeting Quality and Conversion" },
    {
      type: "p",
      text: "With qualified prospects arriving through AI Outreach sequences that had already provided relevant context, first meetings became more productive. The team reported that prospects who booked through Schedley outreach sequences arrived better informed and more engaged than cold inbound bookings. Meeting-to-opportunity conversion improved from 31% to 47% over the 90-day period.",
    },
    { type: "h3", text: "SDR Productivity" },
    {
      type: "p",
      text: "The two SDRs shifted from spending 60-70% of their day on manual research and email writing to spending that time on follow-up conversations, call preparation, and CRM hygiene. AI Outreach handled first-touch and early follow-up; SDRs owned conversations from the point of engagement forward.",
    },
    {
      type: "quote",
      quote:
        "The pipeline used to feel like we were trying to fill a bucket with a hole in it — we'd work hard for a month, then have nothing coming in while we were closing. Schedley changed the architecture. Now it runs whether we're focused on closing or not.",
      attribution: "CEO, NovaBridge Solutions",
    },
    { type: "h2", text: "Key Lessons from NovaBridge's Implementation" },
    {
      type: "ul",
      items: [
        "Integration matters more than features: the primary value was not any single Schedley feature but the fact that AI Outreach, Pipeline Generation, and Calendar Intelligence shared the same data layer. Prospects from outreach flows landed on validated booking pages without any manual handoff.",
        "Spam elimination is a fast win: Calendar Intelligence delivered visible, immediate ROI before the AI Outreach sequences had reached maturity. Teams looking for a quick proof of value should activate Calendar Intelligence first.",
        "Pipeline consistency compounds: a consistent 22-26 meetings per week for 90 days created 270+ meetings with validated contacts — a data set that revealed ICP patterns the team had never had visibility into before.",
      ],
    },
    { type: "cta", text: "Build a pipeline like NovaBridge's. Start at schedley.com" },
  ],
};
