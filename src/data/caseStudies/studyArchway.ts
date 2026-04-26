import type { CaseStudyDoc } from "./types";

export const studyArchway: CaseStudyDoc = {
  id: "archway-talent",
  num: "3",
  industryLine: "Boutique Recruiting Firm  ·  8-Person Team",
  servicesLine: "Hiring Infrastructure  ·  AI Outreach  ·  Calendar Intelligence",
  title: "Cutting Time-to-Fill from 47 Days to 19 Days Across the Board",
  subtitle:
    "How Archway Talent Group used Schedley's Hiring Infrastructure and Calendar Intelligence to transform their candidate pipeline, streamline interview scheduling, and build a client acquisition engine",
  cardPreview:
    "Eight recruiters competing on quality but losing searches on speed. They deployed AI sourcing, personalized candidate outreach, self-serve interview booking, and outbound to funded startups—shrinking time-to-fill and winning back client confidence.",
  glanceRows: [
    ["", ""],
    ["Company", "Archway Talent Group (composite case study)"],
    ["Industry", "Boutique Executive Recruiting — Technology & SaaS roles"],
    ["Team Size", "8 recruiters, 2 operations staff"],
    ["Placement Focus", "VP and Director-level roles, $150K–$280K compensation range"],
    ["Average Time-to-Fill (pre-Schedley)", "47 days"],
    ["Client Retention Challenge", "Clients leaving for larger agencies citing speed of delivery"],
    ["Schedley Services", "Hiring Infrastructure, AI Outreach, Calendar Intelligence"],
  ],
  blocks: [
    { type: "h2", text: "The Business Context" },
    {
      type: "p",
      text: "Archway Talent Group had spent four years building a strong reputation in the San Francisco Bay Area technology recruiting market. Their client roster included seven Series B and Series C companies that returned to them for multiple hires per year, and their placement quality — measured by 12-month retention rates — was genuinely differentiated at 89% compared to the industry average of around 71%.",
    },
    {
      type: "p",
      text: "But Archway was losing business it should have won. Three clients in eighteen months had left mid-search for larger agencies, and the exit interview feedback was consistent: speed. The clients weren't dissatisfied with Archway's quality. They were dissatisfied with how long it took to see candidates, schedule interviews, and move through the hiring process.",
    },
    {
      type: "p",
      text: "The root cause was operational, not relational. Archway's sourcing was predominantly manual — recruiters spent 3-4 hours per search building candidate lists on LinkedIn Recruiter, writing individual outreach messages, and tracking responses in spreadsheets. Interview scheduling involved an average of 5-7 emails per interview to coordinate availability between candidate, hiring manager, and sometimes a second interviewer. At 8 open searches running simultaneously, the coordination overhead was consuming a disproportionate share of each recruiter's week.",
    },
    {
      type: "quote",
      quote:
        "We were losing clients over something that had nothing to do with our ability to find great candidates. It was purely operational. We needed to move faster, and we knew it. We just didn't have the infrastructure to do it.",
      attribution: "Sarah K., Managing Partner, Archway Talent Group",
    },
    { type: "h3", text: "The Four Operational Bottlenecks" },
    {
      type: "ul",
      items: [
        "Slow candidate sourcing: manual LinkedIn research averaged 3.5 hours per search to build an initial 20-25 candidate list — before any outreach had been sent.",
        "Generic candidate outreach: with manual sourcing at volume, outreach messages were mostly templated and lacked the personalization that passive senior candidates expect before engaging with a recruiter they don't know.",
        "Interview scheduling friction: average 5-7 email exchanges per interview to find a mutually available time. With 3-4 interviews per candidate per search, this created weeks of coordination overhead.",
        "Client booking chaos: business development calls with new clients were booked through a shared Calendly link that received spam bookings, showed stale availability when recruiters had internal conflicts, and had no validation layer.",
        "No systematic new client outreach: new business came from referrals and the occasional LinkedIn post. There was no proactive outreach system targeting companies with active hiring needs.",
      ],
    },
    { type: "h2", text: "How Archway Configured Schedley" },
    { type: "h3", text: "Hiring Infrastructure — Candidate Pipeline Transformation" },
    {
      type: "p",
      text: "Schedley's Hiring Infrastructure was configured to run candidate sourcing against Archway's active search criteria. For each open role, the recruiters defined the target profile: function, seniority level, industry background, company-size experience, and any specific technical or domain requirements. The AI sourcing layer identified candidates matching these profiles from professional network data, enriched with current role, tenure, and career trajectory signals.",
    },
    {
      type: "p",
      text: "The candidate outreach sequences were built with the same AI personalization infrastructure that powers Schedley's B2B sales outreach — drawing on each candidate's career history, recent role changes, company signals, and LinkedIn activity to craft messages that demonstrated genuine awareness of their professional situation rather than generic recruiter pitches. For senior candidates who receive dozens of recruiter approaches per week, this personalization difference was significant in response rate terms.",
    },
    { type: "h3", text: "Calendar Intelligence — Interview Scheduling Overhaul" },
    {
      type: "p",
      text: "Every recruiter on the Archway team received a dedicated Schedley booking link with their Google Calendar connected via two-way real-time sync. Candidate interview scheduling was moved entirely to Schedley: instead of email chains to find availability, recruiters sent candidates a single link to book their initial screen directly onto the recruiter's calendar.",
    },
    {
      type: "p",
      text: "For client-side interview coordination, Schedley's team availability feature was configured to present composite availability across the hiring manager's calendar — synced in real time — so candidates could self-schedule client interviews without recruiter involvement. Confirmation emails included all video conferencing details, the job description, and a brief preparation note tailored to each interview stage.",
    },
    {
      type: "p",
      text: "Real-time email validation was activated on all candidate-facing booking links, and reminder sequences were set at 24 hours and 4 hours before each interview — a deliberate choice based on Archway's data showing that candidate no-shows were most common in the 4-hour window before the interview.",
    },
    { type: "h3", text: "AI Outreach — New Client Acquisition" },
    {
      type: "p",
      text: "Alongside the core hiring work, Archway used Schedley's AI Outreach service to build a systematic new business development motion for the first time. Target accounts were companies in the technology sector that had raised Series A or Series B funding in the past 12 months — a reliable indicator of imminent hiring at the VP and Director level. Sequences targeted heads of People, CHROs, and founders at these companies, with personalization drawing on their funding announcement, headcount growth trajectory, and any open senior roles visible on their website.",
    },
    { type: "h2", text: "Results: 6 Months After Full Activation" },
    {
      type: "metrics",
      tone: "purple",
      items: [
        { val: "47→19d", label: "Average time-to-fill" },
        { val: "3.1×", label: "Candidate response rate" },
        { val: "0", label: "Client losses post-activation" },
        { val: "4", label: "New clients from AI Outreach" },
      ],
    },
    { type: "h3", text: "Time-to-Fill Transformation" },
    {
      type: "p",
      text: "Average time-to-fill dropped from 47 days to 19 days across all active searches in the six months following Schedley activation. The gains came from three compounding improvements: faster candidate identification (from 3.5 hours to 40 minutes to build an initial pipeline per search), higher candidate response rates leading to more choices earlier in the process, and dramatically faster interview scheduling.",
    },
    {
      type: "p",
      text: "Interview scheduling time — measured from 'interview agreed upon' to 'interview confirmed on both calendars' — dropped from an average of 3.2 days (via email coordination) to 4.3 hours (via Schedley booking links). For a process that typically involves 3-4 interviews per candidate, this alone eliminated over a week from the average search timeline.",
    },
    { type: "h3", text: "Candidate Response Rates" },
    {
      type: "p",
      text: "AI-personalized outreach sequences outperformed the team's previous template-based approach substantially. Recruiter-written template messages to passive candidates had averaged a 14% initial response rate. Schedley AI sequences averaged 44% — a 3.1× improvement that the team attributed to the specificity of the personalization and the relevance of the signals used to trigger outreach.",
    },
    {
      type: "p",
      text: "Higher response rates at the top of the funnel meant more candidate choice earlier in each search — reducing the time spent in the 'insufficient candidate pool' phase that had been responsible for much of Archway's previous timeline overruns.",
    },
    { type: "h3", text: "Client Retention" },
    {
      type: "p",
      text: "In the six months following Schedley activation, Archway retained all existing clients through their active searches. The client who had most recently flagged speed as a concern explicitly noted in a mid-search check-in that the pace of candidate presentation had improved materially. No clients left for speed-related reasons. Two clients that had previously gone to a larger agency for a search specifically returned to Archway, citing confidence in Archway's new delivery pace.",
    },
    { type: "h3", text: "New Business Pipeline" },
    {
      type: "p",
      text: "The AI Outreach sequences targeting recently-funded companies generated 4 new client engagements in the first six months — the first time in Archway's history that meaningful new business had come from proactive outbound rather than referrals. These 4 clients represented $280,000 in placement fees, more than covering Archway's full-year Schedley investment with the first engagement alone.",
    },
    {
      type: "table",
      headers: ["Metric", "Before Schedley  →  After Schedley  →  Change"],
      rows: [
        ["Average time-to-fill", "47 days  →  19 days  →  −60%"],
        ["Candidate sourcing time per search", "3.5 hrs  →  40 min  →  −81%"],
        ["Passive candidate response rate", "14%  →  44%  →  +214%"],
        ["Interview scheduling (agreed → confirmed)", "3.2 days  →  4.3 hours  →  −94%"],
        ["Interview no-show rate", "23%  →  8%  →  −65%"],
        ["New clients from proactive outreach", "0/yr  →  4 in 6 months  →  New capability"],
        ["Client losses (speed-related)", "3 in 18 months  →  0 in 6 months  →  Eliminated"],
      ],
    },
    { type: "h3", text: "The Compound Effect of Integrated Services" },
    {
      type: "p",
      text: "Archway's case demonstrates something that runs through all three case studies in this document: Schedley's services compound. The value of Hiring Infrastructure alone would have been significant — faster sourcing, better candidate response rates, cleaner pipelines. The value of Calendar Intelligence alone would have been meaningful — faster interview scheduling, lower no-show rates, accurate availability. The value of AI Outreach alone would have been notable — a new business development capability that hadn't previously existed.",
    },
    {
      type: "p",
      text: "Together, these three services addressed every operational bottleneck that was costing Archway clients, revenue, and growth potential. The sum was not 3× the value of any single service — it was substantially more, because each service amplified the impact of the others.",
    },
    {
      type: "quote",
      quote:
        "Within four months, we went from losing clients over speed to being told we were the fastest boutique firm our clients had worked with. That's a complete reversal, and it came entirely from changing our infrastructure, not our team.",
      attribution: "Managing Partner, Archway Talent Group",
    },
    { type: "h2", text: "Implementation Lessons for Recruiting Firms" },
    {
      type: "ul",
      items: [
        "Interview scheduling is the highest-leverage quick win: the shift from email coordination to Schedley booking links can eliminate days from every candidate interaction cycle immediately, with zero change to the underlying recruiting process.",
        "Passive candidate personalization is not optional at senior levels: VP and Director-level candidates receive generic recruiter outreach constantly. AI-personalized sequences that demonstrate genuine awareness of their career stage and current employer context achieve fundamentally different response rates.",
        "Business development outreach and candidate outreach use the same muscle: the AI sequences that identified passive candidates for open searches were built on the same platform as the sequences that found new clients. Teams that recognize this symmetry can build both capabilities simultaneously rather than sequentially.",
        "Reminder timing matters: Archway's interview no-show rate dropped most significantly after they moved to a 4-hour pre-interview reminder. For high-stakes meetings where candidates may be nervous or uncertain, a well-timed reminder both reassures the candidate and surfaces last-minute conflicts early enough to reschedule.",
      ],
    },
    { type: "cta", text: "Transform your hiring pipeline. See how Schedley's Hiring Infrastructure works at schedley.com" },
  ],
};
