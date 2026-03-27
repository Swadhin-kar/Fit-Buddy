import { Activity } from "lucide-react";
import DashboardCard from "./DashboardCard";

export default function DashboardStatCard({ title, value, unit, trend, color }) {
  const isEmpty = trend === "No log yet" || trend === "Not added" || trend === "Workout pending";

  return (
    <DashboardCard className="p-5">
      <div
        className="h-1 rounded-full"
        style={{ backgroundColor: `rgb(${color})`, opacity: 0.7 }}
      />

      <div className="mt-4 flex items-start justify-between gap-3">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[rgb(var(--text-muted))]">
            {title}
          </p>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-semibold tracking-tight" style={{ color: `rgb(${color})` }}>
              {value}
            </span>
            {unit ? (
              <span className="text-xs font-semibold text-[rgb(var(--text-muted))]">{unit}</span>
            ) : null}
          </div>
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[rgb(var(--card-depth-1))] text-[rgb(var(--text-muted))]">
          <Activity size={16} />
        </div>
      </div>

      <div className="mt-5 inline-flex rounded-full px-3 py-1 text-[11px] font-semibold">
        <span
          className={`rounded-full px-3 py-1 ${
            isEmpty
              ? "bg-[rgb(var(--card-depth-1))] text-[rgb(var(--text-muted))]"
              : "bg-[rgb(var(--secondary))/0.14] text-[rgb(var(--secondary))]"
          }`}
        >
          {trend}
        </span>
      </div>
    </DashboardCard>
  );
}
