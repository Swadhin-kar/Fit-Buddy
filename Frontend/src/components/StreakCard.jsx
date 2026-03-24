export default function StreakCard({ streakCount = 0, isLoading = false }) {
  return (
    <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-orange-500 via-amber-500 to-rose-500 p-6 text-white shadow-2xl shadow-orange-500/20">
      <div className="absolute -right-8 -top-10 h-32 w-32 rounded-full bg-white/15 blur-3xl" />

      <div className="relative">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/80">
          Current Streak
        </p>
        <div className="mt-4 flex items-end gap-3">
          <span className="text-5xl font-black tracking-tight">
            {isLoading ? "--" : streakCount}
          </span>
          <span className="pb-2 text-sm font-semibold text-white/80">
            {streakCount === 1 ? "day" : "days"}
          </span>
        </div>
        <p className="mt-3 text-lg font-semibold">
          {"\uD83D\uDD25"} {isLoading ? "Loading streak" : `${streakCount} Day Streak`}
        </p>
        <p className="mt-2 text-sm text-white/80">
          Consecutive logged days with exercise time greater than zero.
        </p>
      </div>
    </div>
  );
}
