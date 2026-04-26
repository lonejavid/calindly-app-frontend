/**
 * Converts textutil-exported .txt from Word into markdown with ## headings and GFM tables.
 * Run: node scripts/txt-to-resource-md.mjs <slug>
 * slug: calendly | acuity | market
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const rawDir = path.join(root, "src/data/resourceGuides/raw");
const outDir = path.join(root, "src/data/resourceGuides/markdown");

const configs = {
  calendly: {
    file: "schedley-vs-calendly.txt",
    stripFirst: /^COMPARISON REPORT\n/,
    h2: [
      "Executive Summary",
      "Company Overview",
      "The Spam Booking Problem: Where Calendly Comes Up Short",
      "Feature-by-Feature Deep Dive",
      "Pricing Comparison",
      "Who Should Use Schedley vs. Calendly?",
      "The Core Difference: Reactive vs. Proactive Calendar Protection",
      "Verdict",
    ],
    h3: ["What Calendly Offers for Spam Protection", "What Schedley Offers"],
  },
  acuity: {
    file: "schedley-vs-acuity.txt",
    stripFirst: /^COMPARISON REPORT\n/,
    h2: [
      "Executive Summary",
      "Product Overview",
      "What Acuity Does Well",
      "The Missing Layer: Booking Quality Control",
      "Side-by-Side Feature Comparison",
      "Pricing: The Real Cost of Acuity",
      "User Experience & Setup",
      "Who Should Use Schedley vs. Acuity?",
      "Verdict",
    ],
    h3: [
      "Acuity Has No Spam or Fraud Protection",
      "Schedley Solves This at the Source",
      "Acuity: Power at the Cost of Complexity",
      "Schedley: Protection in Minutes",
    ],
  },
  market: {
    file: "schedley-vs-the-market.txt",
    stripFirst: /^MARKET COMPARISON REPORT\n/,
    h2: [
      "Executive Summary",
      "The Scheduling Tool Gap No One Is Filling",
      "Schedley vs. HubSpot Meetings",
      "Schedley vs. Google Calendar Booking",
      "Schedley vs. Doodle",
      "Schedley vs. Cal.com",
      "Master Comparison: Spam & Email Validation Across All Tools",
      "Why Schedley Wins on the Dimension That Matters Most",
      "Conclusion: Choosing the Right Tool for Your Calendar",
    ],
    h3: [
      "What HubSpot Meetings Is",
      "HubSpot Meetings: Key Strengths",
      "HubSpot Meetings: Key Weaknesses",
      "What Google Calendar Booking Features Offer",
      "Google Calendar Booking: Strengths",
      "Google Calendar Booking: Weaknesses",
      "What Doodle Is",
      "Doodle: Strengths",
      "Doodle: Weaknesses",
      "What Cal.com Is",
      "Cal.com: Strengths",
      "Cal.com: Weaknesses",
    ],
  },
};

function escapeRegExp(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function bulletsToMd(text) {
  return text.replace(/^\t•\t?/gm, "- ");
}

function injectHeadings(text, h2, h3) {
  let out = text;
  for (const h of h2) {
    out = out.replace(new RegExp(`^${escapeRegExp(h)}$`, "m"), `## ${h}`);
  }
  for (const h of h3) {
    out = out.replace(new RegExp(`^${escapeRegExp(h)}$`, "m"), `### ${h}`);
  }
  return out;
}

/** Convert 3-line row blocks (label, col1, col2) into GFM table after header row of 3 cells. */
function convertThreeColTables(md) {
  const lines = md.split("\n");
  const out = [];
  let i = 0;
  while (i < lines.length) {
    const a = lines[i];
    const b = lines[i + 1];
    const c = lines[i + 2];
    const d = lines[i + 3];
    const isHeaderTriple =
      a &&
      b &&
      c &&
      (a === "Feature" || a === "Plan Tier" || a === "Plan" || a === "Tool") &&
      b === "Schedley" &&
      (c === "Calendly" || c === "Acuity Scheduling" || c === "HubSpot Meetings" || c === "Google Calendar Booking" || c === "Doodle" || c === "Cal.com");
    const isHubMini =
      a === "Schedley" &&
      b === "HubSpot Meetings" &&
      c === "Spam/bot blocking" &&
      d === "Yes — core feature";
    const isGoogleMini = a === "Schedley" && b === "Google Calendar Booking" && c === "Spam/bot blocking";
    const isDoodleMini = a === "Schedley" && b === "Doodle" && c === "Spam/bot blocking";
    const isCalComMini = a === "Schedley" && b === "Cal.com" && c === "Spam/bot blocking";

    if (isHeaderTriple) {
      out.push(`| ${a} | ${b} | ${c} |`);
      out.push("| --- | --- | --- |");
      i += 3;
      while (i < lines.length) {
        if (!lines[i].trim()) break;
        if (lines[i].startsWith("##") || lines[i].startsWith("###")) break;
        const r1 = lines[i++];
        if (i >= lines.length) break;
        const r2 = lines[i++];
        if (i >= lines.length) break;
        const r3 = lines[i++];
        out.push(`| ${r1} | ${r2} | ${r3} |`);
      }
      continue;
    }

    if (isHubMini || isGoogleMini || isDoodleMini || isCalComMini) {
      out.push(`|  | ${lines[i]} | ${lines[i + 1]} |`);
      out.push("| --- | --- | --- |");
      i += 2;
      while (i < lines.length) {
        if (!lines[i].trim()) break;
        if (lines[i].startsWith("##") || lines[i].startsWith("###")) break;
        const r1 = lines[i++];
        if (i >= lines.length) break;
        const r2 = lines[i++];
        if (i >= lines.length) break;
        const r3 = lines[i++];
        out.push(`| ${r1} | ${r2} | ${r3} |`);
      }
      continue;
    }

    // Company / Product overview: Schedley + competitor, then label triplets
    if (
      a === "Schedley" &&
      b &&
      c &&
      b !== "Spam/bot blocking" &&
      (b === "Calendly" || b === "Acuity Scheduling") &&
      lines[i + 3]?.trim() &&
      !lines[i + 3].startsWith("##")
    ) {
      out.push(`|  | ${a} | ${b} |`);
      out.push("| --- | --- | --- |");
      i += 2;
      while (i < lines.length) {
        if (!lines[i].trim()) break;
        if (lines[i].startsWith("##") || lines[i].startsWith("###")) break;
        const r1 = lines[i++];
        if (i >= lines.length) break;
        const r2 = lines[i++];
        if (i >= lines.length) break;
        const r3 = lines[i++];
        out.push(`| ${r1} | ${r2} | ${r3} |`);
      }
      continue;
    }

    out.push(lines[i]);
    i++;
  }
  return out.join("\n");
}

const slug = process.argv[2] || "calendly";
const cfg = configs[slug];
if (!cfg) {
  console.error("slug must be calendly | acuity | market");
  process.exit(1);
}

let text = fs.readFileSync(path.join(rawDir, cfg.file), "utf8");
text = text.replace(cfg.stripFirst, "");
text = bulletsToMd(text);
text = injectHeadings(text, cfg.h2, cfg.h3);
text = convertThreeColTables(text);

fs.mkdirSync(outDir, { recursive: true });
const outName = slug === "market" ? "schedley-vs-scheduling-landscape.md" : `schedley-vs-${slug}.md`;
fs.writeFileSync(path.join(outDir, outName), text, "utf8");
console.log("Wrote", path.join(outDir, outName));
