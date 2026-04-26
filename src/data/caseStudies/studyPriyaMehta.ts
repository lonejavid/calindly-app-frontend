import type { CaseStudyDoc } from "./types";

export const studyPriyaMehta: CaseStudyDoc = {
  id: "priya-mehta",
  num: "2",
  industryLine: "Solo Independent Consultant  ·  Strategy & Operations",
  servicesLine: "AI Outreach  ·  Calendar Intelligence",
  title: "Reclaiming 11 Hours a Week and Doubling Client Meeting Quality",
  subtitle:
    "How independent strategy consultant Priya Mehta used Schedley to eliminate fake bookings, automate her outreach, and build a full pipeline without a business development budget",
  cardPreview:
    "High-ticket solo practice: public booking links attracted bots and bad leads, while new work depended on manual outreach between retainers. Schedley added validation, smarter intake, and always-on AI sequences—without a dedicated BD hire.",
  glanceRows: [
    ["", ""],
    ["Name", "Priya Mehta (composite case study)"],
    ["Role", "Independent Strategy & Operations Consultant"],
    ["Specialization", "Operational scaling for Series A–C startups, 10-50 employees"],
    ["Client Engagement Type", "3-month retainers, $8,000–$15,000/month"],
    ["Booking Volume", "~35 inbound booking attempts per month pre-Schedley"],
    ["Schedley Services", "AI Outreach, Calendar Intelligence"],
  ],
  blocks: [
    { type: "h2", text: "The Situation Before Schedley" },
    {
      type: "p",
      text: "Priya had built a strong personal brand over six years as an independent consultant. Her website received steady organic traffic, her LinkedIn content generated consistent engagement, and her public booking link — embedded in her bio and email signature — produced a reliable stream of meeting requests. On the surface, her business development was working.",
    },
    {
      type: "p",
      text: "Below the surface, the picture was more complicated. Of the 35 or so booking requests she received each month, she estimated that 8-12 were unusable: fake email addresses entered by bots, competitors checking her availability, people who clearly hadn't read her website and wanted services she didn't offer, or vague outreach from contacts with no apparent relevance to her practice.",
    },
    {
      type: "p",
      text: "Each bad booking had a cost. Priya's hourly billing rate was $275. Every hour she spent preparing for a meeting that turned out to be junk, filtering her calendar, or sending follow-ups to email addresses that bounced was $275 in lost billable time. Over a month, the combined preparation-and-cleanup cost of bad bookings was running between $1,800 and $2,500.",
    },
    {
      type: "p",
      text: "Her outreach side had a different problem. Priya had no systematic way to find and approach potential clients. When a retainer ended, she would reach out to her network manually — a process that worked but was slow, unpredictable, and entirely dependent on her own time and initiative. Between active client work and manual outreach, there was never enough hours.",
    },
    {
      type: "quote",
      quote:
        "I was billing $275 an hour and spending that time writing emails to email addresses that didn't exist. I knew it was a problem. I just didn't know there was a tool built specifically to fix it.",
      attribution: "Priya Mehta, Independent Strategy Consultant",
    },
    { type: "h3", text: "Priya's Specific Pain Points" },
    {
      type: "ul",
      items: [
        "Calendar noise: ~30% of monthly booking requests came from fake, unqualified, or low-quality contacts.",
        "Preparation waste: she spent an average of 25 minutes preparing for each booking, meaning 10 bad bookings per month = 4+ hours of wasted preparation at full billing rate.",
        "Manual cleanup: post-booking email triage, no-show follow-ups, and calendar management consumed 2-3 hours per week.",
        "Reactive outreach: new client pipeline depended entirely on her taking initiative at the right moment, which rarely coincided with available time.",
        "Tool sprawl: she was using Calendly for booking, Gmail sequences for outreach, and a spreadsheet to track prospect follow-ups — three separate systems with no integration.",
      ],
    },
    { type: "h2", text: "What Priya Set Up with Schedley" },
    { type: "h3", text: "Calendar Intelligence — Immediate Deployment" },
    {
      type: "p",
      text: "Priya moved her booking link to Schedley within 48 hours of starting her account. The configuration was straightforward: she connected her Google Calendar, enabled real-time email validation, and activated public domain filtering to restrict bookings to professional or corporate email addresses — a natural fit for a consultant whose clients are exclusively companies, not individuals.",
    },
    {
      type: "p",
      text: "She configured her availability windows carefully: discovery calls available Tuesday through Thursday, 10am–4pm only. Existing client calls available Monday and Friday as well. A 20-minute buffer after every call. No same-day bookings. Confirmation emails were customized with her consulting framework overview and a pre-meeting questionnaire asking prospects to describe their current operational challenge in three sentences.",
    },
    {
      type: "p",
      text: "The pre-meeting questionnaire was a deliberate addition. By requiring prospects to articulate their challenge before the meeting, Priya created a second qualification layer: contacts who couldn't describe a specific operational problem weren't her clients, and the questionnaire surfaced this before either party invested 45 minutes in a discovery call.",
    },
    { type: "h3", text: "AI Outreach — Systematic New Client Development" },
    {
      type: "p",
      text: "Priya worked with Schedley to build two outreach sequences targeting her ICP: founders and COOs of Series A and Series B startups in SaaS, professional services, and technology verticals, specifically companies that had raised in the past 6-18 months and were in the scaling phase where operational infrastructure typically breaks.",
    },
    {
      type: "p",
      text: "The AI sequences drew on funding announcement signals, recent executive hiring activity, and company headcount growth rates to identify companies in the operational scaling inflection point that characterized her best historical clients. Outreach messages referenced specific signals from each target company — a recent funding round, a new hire in a senior operations role, headcount growth — rather than generic consulting pitches.",
    },
    {
      type: "p",
      text: "Sequences ran 5 touches over 16 days, ending with a direct invitation to book a 30-minute discovery call through her Schedley link. Booking requests from outreach sequence contacts were automatically tagged in her calendar with the prospect's company, funding stage, and the specific signal that triggered outreach — giving Priya full context before each call without any manual research.",
    },
    { type: "h2", text: "Results: 12 Weeks After Going Live" },
    {
      type: "metrics",
      tone: "teal",
      items: [
        { val: "94%", label: "Drop in spam bookings" },
        { val: "11hrs", label: "Per week reclaimed" },
        { val: "2.4×", label: "Qualified meetings per month" },
        { val: "$2,900", label: "Monthly cost savings (wasted prep)" },
      ],
    },
    { type: "h3", text: "Calendar Quality Transformation" },
    {
      type: "p",
      text: "Within the first month, spam booking rate dropped from an estimated 31% to under 2%. Of 34 booking requests in month one post-Schedley, 33 came from real, verified corporate email addresses. The one exception was a real person using a Gmail address who had contacted Priya directly and she had given her link to manually.",
    },
    {
      type: "p",
      text: "The pre-meeting questionnaire added a second layer of qualification that proved equally valuable. Of the 33 verified bookings, 8 did not complete the questionnaire — a signal Priya interpreted as low engagement and low urgency. She reached out to these contacts directly before the meeting rather than investing full preparation time. Five rescheduled. Three became confirmed clients after brief clarification exchanges.",
    },
    { type: "h3", text: "Time Recovery" },
    {
      type: "p",
      text: "Priya tracked her time use for 12 weeks before and after Schedley. The results were striking:",
    },
    {
      type: "table",
      headers: ["Activity", "Before Schedley  →  After Schedley"],
      rows: [
        ["Booking triage & cleanup", "3.2 hrs/week  →  0.1 hrs/week"],
        ["Pre-meeting research (real bookings)", "1.8 hrs/week  →  0.3 hrs/week (context pre-filled)"],
        ["Manual outreach writing", "4.1 hrs/week  →  0.5 hrs/week"],
        ["Follow-up emails (no-shows)", "1.4 hrs/week  →  0.2 hrs/week (automated)"],
        ["Total BD & admin overhead", "10.5 hrs/week  →  1.1 hrs/week"],
      ],
    },
    {
      type: "p",
      text: "The 9.4 hours per week recovered was reallocated to billable client work — representing an annualized revenue opportunity of approximately $134,000 at her billing rate.",
    },
    { type: "h3", text: "New Client Pipeline" },
    {
      type: "p",
      text: "The AI Outreach sequences generated 8-11 qualified discovery call requests per month from cold prospects — contacts Priya had never previously had a relationship with. Of these, she converted approximately 35% into paid engagements over the first three months. Two of the five new retainers signed in that period came directly from Schedley AI Outreach sequences.",
    },
    {
      type: "quote",
      quote:
        "The questionnaire idea came from Schedley's onboarding team and it's been one of the best things I've ever added to my intake process. I know more about a prospect before our first call than I used to know after two meetings.",
      attribution: "Priya Mehta",
    },
    { type: "h2", text: "What Made the Difference for a Solo Operator" },
    {
      type: "p",
      text: "Priya's case illustrates something important about Schedley's value for independent professionals: the leverage is proportionally higher than for teams, because every hour recovered goes directly to billable work. A 12-person sales team recovering 90 minutes per week gains 18 hours of team capacity. A solo consultant recovering 9 hours per week gains 9 hours of their most constrained resource — personal time.",
    },
    {
      type: "p",
      text: "For professionals billing by the hour, the ROI calculation is immediate and concrete: every hour of admin and triage that Schedley eliminates is an hour that can be billed. At Priya's rate, Schedley paid for itself within the first three days of the first month.",
    },
    {
      type: "ul",
      items: [
        "Pre-meeting qualification forms are multiplicative: combined with email validation, they create two qualification layers that surface low-quality bookings before any preparation time is invested.",
        "Context-tagged bookings change meeting quality: when every booking from an AI sequence arrives with the triggering signal pre-populated, preparation time drops dramatically and first-meeting depth increases.",
        "For solo operators, automation removes the 'feast-or-famine' trap: AI Outreach runs continuously regardless of how busy active engagements are, preventing the pipeline gap that typically follows a period of heavy delivery work.",
      ],
    },
    { type: "cta", text: "Reclaim your billable time. Start with Schedley at schedley.com" },
  ],
};
