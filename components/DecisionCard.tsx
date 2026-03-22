import type { KeyDecision } from "@/data/case-studies";

export function DecisionCard({ decision }: { decision: KeyDecision }) {
  return (
    <div className="decision-card border border-ink/10 rounded p-6 bg-canvas">
      {/* Header: what was weighed */}
      <p className="font-sans text-base font-medium text-ink mb-4">{decision.what}</p>

      {/* Row: Killed — muted, struck-through */}
      <div className="chapter-line flex gap-3 mb-3">
        <span className="font-sans text-sm text-ink/30 shrink-0">✗</span>
        <span className="font-sans text-sm text-ink/40 line-through">{decision.killed}</span>
      </div>

      {/* Row: Constraint — medium muted */}
      <div className="chapter-line flex gap-3 mb-3">
        <span className="font-sans text-sm text-ink/50 shrink-0">⚠</span>
        <span className="font-sans text-sm text-ink/60">{decision.constraint}</span>
      </div>

      {/* Row: Chosen — terracotta accent, visually dominant */}
      <div className="chapter-line flex gap-3">
        <span className="font-sans text-sm text-accent font-semibold shrink-0">✓</span>
        <span className="font-sans text-sm text-ink font-medium">{decision.chosen}</span>
      </div>
    </div>
  );
}
