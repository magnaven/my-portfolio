import type { CaseStudy } from "@/data/case-studies";

export function CaseStudyHero({ study }: { study: CaseStudy }) {
  return (
    <section className="min-h-[60vh] flex items-end pb-24 px-8">
      {/* category */}
      <div className="w-full">
        <p className="font-sans text-sm uppercase tracking-widest text-ink/40 mb-4">
          {study.category}
        </p>

        {/* title — dominant headline */}
        <h1 className="font-display text-7xl text-ink leading-tight mb-8">{study.title}</h1>

        {/* outcomes[0].result — results-first framing */}
        <p className="font-display text-3xl text-accent mb-2">{study.outcomes[0].result}</p>

        {/* outcomes[0].metric — small label under the result */}
        <p className="font-sans text-sm text-ink/50">{study.outcomes[0].metric}</p>
      </div>
    </section>
  );
}
