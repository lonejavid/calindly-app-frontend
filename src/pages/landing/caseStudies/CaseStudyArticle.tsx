import { ArrowRight } from "lucide-react";
import type { CaseStudyBlock, CaseStudyDoc } from "@/data/caseStudies";
import { SITE_ORIGIN } from "@/lib/site";

export function GlanceTable({ rows }: { rows: [string, string][] }) {
  const data = rows.filter(([a, b]) => a.trim() || b.trim());
  if (data.length === 0) return null;
  return (
    <div className="mt-6 overflow-x-auto rounded-[var(--r-l)] border border-[var(--line)] bg-[var(--surface)]">
      <table className="w-full min-w-[280px] text-left text-sm">
        <tbody>
          {data.map(([k, v]) => (
            <tr key={k + v} className="border-b border-[var(--line)] last:border-0">
              <th
                scope="row"
                className="w-[min(40%,12rem)] whitespace-normal px-4 py-3 font-semibold text-[var(--ink)] align-top"
              >
                {k}
              </th>
              <td className="px-4 py-3 text-[var(--ink-muted)] leading-relaxed">{v}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function BlockRenderer({ block }: { block: CaseStudyBlock }) {
  switch (block.type) {
    case "h2":
      return (
        <h2 className="mt-12 mb-4 text-xl font-bold tracking-tight text-[var(--ink)] first:mt-0 sm:text-2xl">
          {block.text}
        </h2>
      );
    case "h3":
      return (
        <h3 className="mt-8 mb-3 text-lg font-semibold text-[var(--ink)] sm:text-xl">{block.text}</h3>
      );
    case "p":
      return <p className="mb-4 text-[15px] leading-relaxed text-[var(--ink-muted)] sm:text-base">{block.text}</p>;
    case "ul":
      return (
        <ul className="mb-6 list-disc space-y-2 pl-5 text-[15px] leading-relaxed text-[var(--ink-muted)] sm:text-base">
          {block.items.map((item) => (
            <li key={item.slice(0, 80)}>{item}</li>
          ))}
        </ul>
      );
    case "quote":
      return (
        <figure className="my-8 border-l-4 border-[var(--blue)] bg-[var(--blue-ghost)]/40 py-5 pl-6 pr-4 rounded-r-[var(--r-m)]">
          <blockquote className="text-[15px] font-medium leading-relaxed text-[var(--ink)] sm:text-base">
            “{block.quote}”
          </blockquote>
          <figcaption className="mt-3 text-sm text-[var(--ink-muted)]">— {block.attribution}</figcaption>
        </figure>
      );
    case "metrics": {
      const tone =
        block.tone === "teal"
          ? "from-teal-600 to-emerald-700"
          : block.tone === "purple"
            ? "from-violet-600 to-purple-800"
            : "from-slate-800 to-slate-950";
      return (
        <div
          className={`my-8 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4 rounded-[var(--r-l)] bg-gradient-to-br ${tone} p-4 sm:p-6 text-white shadow-[var(--sh-md)]`}
        >
          {block.items.map((m) => (
            <div key={m.label} className="text-center sm:text-left">
              <div className="text-2xl font-bold tracking-tight sm:text-3xl">{m.val}</div>
              <div className="mt-1 text-xs font-medium uppercase tracking-wide text-white/85 sm:text-[13px]">
                {m.label}
              </div>
            </div>
          ))}
        </div>
      );
    }
    case "table":
      return (
        <div className="my-8 overflow-x-auto rounded-[var(--r-l)] border border-[var(--line)] shadow-sm">
          <table className="w-full min-w-[520px] text-left text-sm">
            <thead>
              <tr className="border-b border-[var(--line)] bg-[var(--surface)]">
                {block.headers.map((h) => (
                  <th
                    key={h}
                    scope="col"
                    className="px-4 py-3 font-semibold text-[var(--ink)] whitespace-nowrap sm:whitespace-normal"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row) => (
                <tr key={row.join()} className="border-b border-[var(--line)] last:border-0">
                  {row.map((cell, i) => (
                    <td
                      key={i}
                      className={`px-4 py-3 text-[var(--ink-muted)] leading-relaxed ${i === 0 ? "font-medium text-[var(--ink)]" : ""}`}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "callout":
      return (
        <div className="my-10 rounded-[var(--r-l)] border border-[var(--blue)]/25 bg-[var(--blue-ghost)]/50 px-6 py-6 sm:px-8 sm:py-8">
          <p className="text-base font-medium leading-relaxed text-[var(--ink)] sm:text-lg">{block.text}</p>
        </div>
      );
    case "cta":
      return (
        <p className="mt-8 text-base font-semibold text-[var(--blue)]">
          <a
            href={`${SITE_ORIGIN}/`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 underline-offset-2 hover:underline"
          >
            {block.text}
            <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
          </a>
        </p>
      );
    default:
      return null;
  }
}

type StudySectionProps = {
  study: CaseStudyDoc;
  /** When true, article is the only body on the page (no top divider). */
  standalone?: boolean;
};

export function StudySection({ study, standalone }: StudySectionProps) {
  return (
    <article
      id={study.id}
      className={`scroll-mt-28 w-full min-w-0 ${
        standalone ? "pt-0" : "border-t border-[var(--line)] pt-14 sm:pt-16 first:border-t-0 first:pt-0 first:mt-0"
      }`}
    >
      <p className="text-xs font-semibold uppercase tracking-wider text-[var(--blue)]">
        Case study {study.num}
      </p>
      <p className="mt-2 text-sm text-[var(--ink-muted)]">
        {study.industryLine}
        <span className="mx-2 text-[var(--line-strong)]" aria-hidden>
          ·
        </span>
        {study.servicesLine}
      </p>
      <h1 className="mt-4 b2b-display text-2xl font-bold tracking-tight text-[var(--ink)] sm:text-3xl lg:text-[2.25rem]">
        {study.title}
      </h1>
      <p className="mt-4 text-base leading-relaxed text-[var(--ink-muted)] sm:text-lg">{study.subtitle}</p>
      <div className="mt-8">
        <h2 className="text-xl font-bold tracking-tight text-[var(--ink)] sm:text-2xl">
          {study.id === "priya-mehta" ? "Professional Profile" : "Company at a Glance"}
        </h2>
        <GlanceTable rows={study.glanceRows} />
      </div>
      <div className="mt-10">
        {study.blocks.map((b, i) => (
          <BlockRenderer key={i} block={b} />
        ))}
      </div>
    </article>
  );
}
