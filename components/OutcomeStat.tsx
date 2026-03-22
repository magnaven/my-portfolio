import type { Outcome } from "@/data/case-studies";

export function OutcomeStat({ outcome }: { outcome: Outcome }) {
  return (
    <div className="outcome-stat">
      <p className="chapter-line font-sans text-xs uppercase tracking-widest text-ink/40 mb-1">
        {outcome.metric}
      </p>
      <p className="chapter-line font-display text-4xl text-ink">{outcome.result}</p>
    </div>
  );
}
