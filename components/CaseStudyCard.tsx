import Link from "next/link";
import type { CaseStudy } from "@/data/case-studies";

export function CaseStudyCard({ study }: { study: CaseStudy }) {
  return (
    <Link
      href={`/work/${study.id}`}
      className="case-study-card group block w-full py-8 border-b border-ink/10 hover:bg-accent/8 transition-colors duration-200"
    >
      <div className="flex items-start justify-between gap-8">
        {/* Left: title */}
        <h3 className="font-display text-5xl text-ink group-hover:text-accent transition-colors duration-200 flex-1 leading-tight">
          {study.title}
        </h3>

        {/* Right: meta + CTA */}
        <div className="flex flex-col items-end gap-3 shrink-0 pt-2">
          <span className="font-sans text-xs uppercase tracking-widest text-ink/50">
            {study.category}
          </span>
          <span className="font-sans text-sm text-ink/70">
            {study.outcomes[0].result}
          </span>
          <span className="font-sans text-sm text-accent opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            Read case study &rarr;
          </span>
        </div>
      </div>
    </Link>
  );
}
