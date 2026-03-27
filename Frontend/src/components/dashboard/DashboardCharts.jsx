import DashboardCard from "./DashboardCard";

const getPolylinePoints = (data, width, height, padding) => {
  const maxValue = Math.max(...data.map((item) => item.value), 1);
  const innerWidth = width - padding * 2;
  const innerHeight = height - padding * 2;

  return data
    .map((item, index) => {
      const x = padding + (index * innerWidth) / Math.max(data.length - 1, 1);
      const y = padding + innerHeight - (item.value / maxValue) * innerHeight;
      return `${x},${y}`;
    })
    .join(" ");
};

export default function DashboardCharts({ workoutSeries, calorieSeries }) {
  const workoutAverage = Math.round(
    workoutSeries.reduce((total, item) => total + item.value, 0) / workoutSeries.length,
  );
  const caloriesAverage = Math.round(
    calorieSeries.reduce((total, item) => total + item.value, 0) / calorieSeries.length,
  );

  return (
    <DashboardCard className="p-6 md:p-7">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[rgb(var(--primary))]">
            Progress Overview
          </p>
          <h3 className="mt-2 text-2xl font-semibold">Your clearest view of this week</h3>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-[rgb(var(--text-muted))]">
            The main dashboard focus stays on your workout minutes and calorie trend so the next
            action is always obvious.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:w-auto">
          <ChartSummary label="Workout avg" value={`${workoutAverage} min`} />
          <ChartSummary label="Calorie avg" value={`${caloriesAverage} kcal`} />
        </div>
      </div>

      <div className="mt-6 grid gap-4 xl:grid-cols-2">
        <BarChartPanel data={workoutSeries} />
        <LineChartPanel data={calorieSeries} />
      </div>
    </DashboardCard>
  );
}

function ChartSummary({ label, value }) {
  return (
    <div className="rounded-2xl border border-[rgb(var(--card-depth-1))] bg-[rgb(var(--card-depth-1))/0.35] px-4 py-3">
      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[rgb(var(--text-muted))]">
        {label}
      </p>
      <p className="mt-2 text-base font-semibold">{value}</p>
    </div>
  );
}

function BarChartPanel({ data }) {
  const maxValue = Math.max(...data.map((item) => item.value), 1);

  return (
    <div className="rounded-3xl border border-[rgb(var(--card-depth-1))] bg-[rgb(var(--card-depth-1))/0.35] p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[rgb(var(--secondary))]">
            Workout Minutes
          </p>
          <h4 className="mt-2 text-lg font-semibold">Daily workout volume</h4>
        </div>
        <p className="text-xs text-[rgb(var(--text-muted))]">7-day view</p>
      </div>

      <div className="mt-6 grid h-56 grid-cols-7 items-end gap-3">
        {data.map((item) => (
          <div key={item.label} className="flex h-full flex-col items-center justify-end gap-3">
            <span className="text-[11px] font-semibold text-[rgb(var(--text-muted))]">
              {item.value}
            </span>
            <div className="flex h-full w-full max-w-10 items-end rounded-full bg-[rgb(var(--card-depth-0))] p-1">
              <div
                className="w-full rounded-full bg-[rgb(var(--secondary))]"
                style={{ height: `${Math.max(10, Math.round((item.value / maxValue) * 100))}%` }}
              />
            </div>
            <span className="text-[11px] font-semibold text-[rgb(var(--text-muted))]">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function LineChartPanel({ data }) {
  const width = 360;
  const height = 220;
  const padding = 20;
  const maxValue = Math.max(...data.map((item) => item.value), 1);
  const points = getPolylinePoints(data, width, height, padding);
  const pointPositions = data.map((item, index) => {
    const innerWidth = width - padding * 2;
    const innerHeight = height - padding * 2;
    const x = padding + (index * innerWidth) / Math.max(data.length - 1, 1);
    const y = padding + innerHeight - (item.value / maxValue) * innerHeight;
    return { ...item, x, y };
  });

  return (
    <div className="rounded-3xl border border-[rgb(var(--card-depth-1))] bg-[rgb(var(--card-depth-1))/0.35] p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[rgb(var(--primary))]">
            Calorie Trend
          </p>
          <h4 className="mt-2 text-lg font-semibold">Daily intake trend</h4>
        </div>
        <p className="text-xs text-[rgb(var(--text-muted))]">7-day view</p>
      </div>

      <div className="mt-6 rounded-2xl bg-[rgb(var(--card-depth-0))] p-3">
        <svg viewBox={`0 0 ${width} ${height}`} className="h-56 w-full" role="img" aria-label="Calorie trend line chart">
          {[0.25, 0.5, 0.75].map((ratio) => (
            <line
              key={ratio}
              x1={padding}
              x2={width - padding}
              y1={padding + (height - padding * 2) * ratio}
              y2={padding + (height - padding * 2) * ratio}
              style={{ stroke: "rgb(var(--card-depth-1))", strokeWidth: 1 }}
            />
          ))}

          <polyline
            points={points}
            fill="none"
            style={{ stroke: "rgb(var(--primary))", strokeWidth: 3, strokeLinecap: "round", strokeLinejoin: "round" }}
          />

          {pointPositions.map((point) => (
            <g key={point.label}>
              <circle
                cx={point.x}
                cy={point.y}
                r="5"
                style={{ fill: "rgb(var(--card-depth-0))", stroke: "rgb(var(--primary))", strokeWidth: 3 }}
              />
            </g>
          ))}
        </svg>

        <div className="mt-2 grid grid-cols-7 gap-2">
          {data.map((item) => (
            <div key={item.label} className="text-center">
              <p className="text-[11px] font-semibold text-[rgb(var(--text-muted))]">{item.label}</p>
              <p className="mt-1 text-[11px] text-[rgb(var(--text-muted))]">{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
