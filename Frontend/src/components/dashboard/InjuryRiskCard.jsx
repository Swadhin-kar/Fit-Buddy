import { AlertTriangle, ShieldCheck, Siren } from "lucide-react";

const LEVEL_STYLES = {
  Low: {
    scoreClassName: "text-emerald-500",
    badgeClassName: "border-emerald-500/20 bg-emerald-500/10 text-emerald-500",
    progressClassName: "bg-emerald-500",
    Icon: ShieldCheck,
  },
  Medium: {
    scoreClassName: "text-yellow-500",
    badgeClassName: "border-yellow-500/20 bg-yellow-500/10 text-yellow-600 dark:text-yellow-400",
    progressClassName: "bg-yellow-500",
    Icon: AlertTriangle,
  },
  High: {
    scoreClassName: "text-orange-500",
    badgeClassName: "border-orange-500/20 bg-orange-500/10 text-orange-500",
    progressClassName: "bg-orange-500",
    Icon: AlertTriangle,
  },
  Critical: {
    scoreClassName: "text-red-500",
    badgeClassName: "border-red-500/20 bg-red-500/10 text-red-500",
    progressClassName: "bg-red-500",
    Icon: Siren,
  },
};

export default function InjuryRiskCard({ risk }) {
  const levelStyle = LEVEL_STYLES[risk?.level] ?? LEVEL_STYLES.Low;
  const Icon = levelStyle.Icon;
  const riskScore = Number(risk?.riskScore) || 0;
  const reasons = Array.isArray(risk?.reasons) ? risk.reasons : [];

  return (
    <div className="rounded-[2rem] border border-[rgb(var(--card-depth-1))] bg-[rgb(var(--card-depth-0))] p-6 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[rgb(var(--accent))]">
            Injury Risk
          </p>
          <h3 className="mt-2 text-xl font-bold">Recovery pressure snapshot</h3>
          <p className="mt-2 text-sm text-[rgb(var(--text-muted))]">
            Score based on logged lifting volume, streaks, and muscle overuse patterns.
          </p>
        </div>

        <div
          className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold ${levelStyle.badgeClassName}`}
        >
          <Icon size={14} />
          {risk?.level ?? "Low"}
        </div>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-[auto_minmax(0,1fr)] md:items-center">
        <div className="flex items-end gap-3">
          <span className={`text-5xl font-black tracking-tight ${levelStyle.scoreClassName}`}>
            {riskScore}
          </span>
          <span className="pb-2 text-sm font-semibold text-[rgb(var(--text-muted))]">/ 100</span>
        </div>

        <div>
          <div className="h-3 rounded-full bg-[rgb(var(--card-depth-1))]">
            <div
              className={`h-full rounded-full transition-[width] duration-500 ${levelStyle.progressClassName}`}
              style={{ width: `${Math.min(riskScore, 100)}%` }}
            />
          </div>
          <p className="mt-3 text-sm text-[rgb(var(--text-muted))]">
            Low: 0-30, Medium: 31-60, High: 61-80, Critical: 81-100.
          </p>
        </div>
      </div>

      <div className="mt-6">
        <h4 className="text-sm font-semibold text-[rgb(var(--text-primary))]">Why this score</h4>
        <ul className="mt-3 space-y-2">
          {reasons.map((reason) => (
            <li
              key={reason}
              className="rounded-2xl border border-[rgb(var(--card-depth-1))] bg-[rgb(var(--card-depth-1))/0.3] px-4 py-3 text-sm text-[rgb(var(--text-primary))]"
            >
              {reason}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
