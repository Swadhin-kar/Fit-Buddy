import { CheckCircle2 } from "lucide-react";
import DashboardCard from "./DashboardCard";

export default function DashboardMilestones({ items }) {
  return (
    <DashboardCard className="p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[rgb(var(--text-muted))]">
            Milestones
          </p>
          <h3 className="mt-2 text-xl font-semibold">Keep today moving forward</h3>
        </div>
        <CheckCircle2 size={20} className="text-[rgb(var(--primary))]" />
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-3 xl:grid-cols-1">
        {items.map((item) => (
          <div
            key={item.title}
            className="rounded-2xl border border-[rgb(var(--card-depth-1))] bg-[rgb(var(--card-depth-1))/0.35] p-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[rgb(var(--card-depth-0))]"
                style={{ color: `rgb(${item.color})` }}
              >
                {item.icon}
              </div>
              <span className="rounded-full bg-[rgb(var(--card-depth-0))] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[rgb(var(--text-muted))]">
                {item.status}
              </span>
            </div>

            <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-[rgb(var(--text-muted))]">
              {item.title}
            </p>
            <p className="mt-2 text-lg font-semibold">{item.value}</p>
            <p className="mt-1 text-xs leading-5 text-[rgb(var(--text-muted))]">
              {item.description}
            </p>

            <div className="mt-4 h-2 rounded-full bg-[rgb(var(--card-depth-0))]">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${item.progress}%`,
                  backgroundColor: `rgb(${item.color})`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </DashboardCard>
  );
}
