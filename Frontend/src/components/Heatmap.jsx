import React from "react";
import { motion } from "framer-motion";

const GET_COLOR_CLASS = (day) => {
  if (!day?.log) return "bg-[rgb(var(--card-depth-1))] opacity-10";

  const mins = day.log.exerciseTime;
  if (mins === 0) return "bg-sky-400/40";
  if (mins <= 30) return "bg-emerald-500/40";
  if (mins <= 60) return "bg-emerald-500/70";
  return "bg-emerald-600 shadow-[0_0_10px_rgba(16,185,129,0.3)]";
};

export default function LeetCodeHeatmap({ days = [] }) {
  const TOTAL_ROWS = 7;
  const TOTAL_COLS = 20; // increase/decrease for density

  const TOTAL_CELLS = TOTAL_ROWS * TOTAL_COLS;

  // Fill full grid (no gaps)
  const heatmapDays = Array.from({ length: TOTAL_CELLS }, (_, i) => {
    return days[i] || { date: null, log: null };
  });

  const activeDays = days.filter(
    (d) => d.log && d.log.exerciseTime > 0
  ).length;

  return (
    <div className="w-full rounded-3xl border border-[rgb(var(--card-depth-1))] bg-[rgb(var(--card-depth-0))] p-6 shadow-sm">
      <div className="flex flex-col gap-2">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-[rgb(var(--text-muted))]">
            {activeDays} active days in last months
          </span>

          <div className="flex items-center gap-1.5">
            <span className="text-[10px] text-[rgb(var(--text-dim))]">Less</span>
            {[0, 1, 2, 3, 4].map((v) => (
              <div
                key={v}
                className={`h-3 w-3 rounded-sm ${getLegendColor(v)}`}
              />
            ))}
            <span className="text-[10px] text-[rgb(var(--text-dim))]">More</span>
          </div>
        </div>

        <div className="flex gap-3">
          {/* Y Axis */}
          <div className="flex flex-col justify-between py-5 text-[10px] font-medium text-[rgb(var(--text-dim))]">
            <span>Mon</span>
            <span>Wed</span>
            <span>Fri</span>
          </div>

          <div className="flex-1 overflow-hidden">
            {/* Month Labels */}
            <div className="flex justify-between mb-2 px-1 text-[10px] font-medium text-[rgb(var(--text-dim))]">
              <span>Jan</span>
              <span>Feb</span>
              <span>Mar</span>
            </div>

            {/* GRID */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid gap-1 sm:gap-1"
              style={{
                gridTemplateColumns: `repeat(${TOTAL_COLS}, minmax(0, 1fr))`,
                gridTemplateRows: `repeat(${TOTAL_ROWS}, auto)`
              }}
            >
              {heatmapDays.map((day, i) => (
                <motion.div
                  key={day.date || i}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: i * 0.002 }}
                  whileHover={{
                    scale: 1.3,
                    zIndex: 20,
                    boxShadow: "0 0 15px rgba(0,0,0,0.1)"
                  }}
                  className={`group relative h-3 w-3 sm:h-5 sm:w-5 rounded-[2px] sm:rounded-md transition-all cursor-pointer ${GET_COLOR_CLASS(day)}`}
                >
                  {/* Tooltip */}
                  <div className="pointer-events-none absolute bottom-full left-1/2 z-50 mb-2 w-max -translate-x-1/2 scale-0 rounded-lg bg-slate-900 px-3 py-1.5 text-[10px] text-white transition-all group-hover:scale-100 shadow-xl border border-white/10">
                    <p className="font-bold">
                      {day.date || "No Date"}
                    </p>
                    <p className="opacity-80">
                      {day.log
                        ? `${day.log.exerciseTime} mins workout`
                        : "No activity logged"}
                    </p>
                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900" />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

function getLegendColor(level) {
  const colors = [
    "bg-[rgb(var(--card-depth-1))] opacity-20",
    "bg-sky-400/40",
    "bg-emerald-500/40",
    "bg-emerald-500/70",
    "bg-emerald-600"
  ];
  return colors[level];
}