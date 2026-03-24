import { useContext, useEffect, useState } from "react";
import {
  Activity,
  Calculator,
  CheckCircle,
  Dumbbell,
  Flame,
  Mail,
  Moon,
  PlusCircle,
  TrendingUp,
  Trophy,
  User,
  Weight,
} from "lucide-react";
import toast from "react-hot-toast";
import { AuthContext } from "../components/AuthContext";
import Heatmap from "../components/Heatmap";
import LogForm from "../components/LogForm";
import StreakCard from "../components/StreakCard";
import { getLogHistory, getTodayLog, updateTodayLog } from "../api/logApi";

const createEmptyLogForm = () => ({
  caloriesConsumed: "",
  exerciseTime: "",
  weight: "",
});

const mapLogToForm = (log) => ({
  caloriesConsumed: log?.caloriesConsumed?.toString() ?? "",
  exerciseTime: log?.exerciseTime?.toString() ?? "",
  weight: log?.weight === null || log?.weight === undefined ? "" : log.weight.toString(),
});

const normalizePayload = (formData) => ({
  caloriesConsumed: formData.caloriesConsumed === "" ? 0 : Number(formData.caloriesConsumed),
  exerciseTime: formData.exerciseTime === "" ? 0 : Number(formData.exerciseTime),
  weight: formData.weight === "" ? "" : Number(formData.weight),
});

const formatDate = (date) => {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const buildHeatmapDays = (logs, totalDays = 90) => {
  const logMap = new Map(logs.map((log) => [log.date, log]));
  const today = new Date();

  return Array.from({ length: totalDays }, (_, index) => {
    const date = new Date(today);
    date.setHours(0, 0, 0, 0);
    date.setDate(today.getDate() - (totalDays - 1 - index));

    const formattedDate = formatDate(date);

    return {
      date: formattedDate,
      log: logMap.get(formattedDate) ?? null,
    };
  });
};

const calculateWorkoutStreak = (logs) => {
  const logMap = new Map(logs.map((log) => [log.date, log]));
  const today = new Date();
  let streak = 0;

  for (let offset = 0; offset < logs.length + 1; offset += 1) {
    const currentDate = new Date(today);
    currentDate.setHours(0, 0, 0, 0);
    currentDate.setDate(today.getDate() - offset);

    const formattedDate = formatDate(currentDate);
    const log = logMap.get(formattedDate);

    if (!log || Number(log.exerciseTime) <= 0) {
      break;
    }

    streak += 1;
  }

  return streak;
};

export default function PersonalDashboard() {
  const { user } = useContext(AuthContext);
  const [isLogModalOpen, setIsLogModalOpen] = useState(false);
  const [isDashboardLoading, setIsDashboardLoading] = useState(true);
  const [isFetchingLog, setIsFetchingLog] = useState(false);
  const [isHistoryLoading, setIsHistoryLoading] = useState(true);
  const [isSubmittingLog, setIsSubmittingLog] = useState(false);
  const [dashboardError, setDashboardError] = useState("");
  const [logError, setLogError] = useState("");
  const [historyError, setHistoryError] = useState("");
  const [logHistory, setLogHistory] = useState([]);
  const [streakCount, setStreakCount] = useState(0);
  const [todayLog, setTodayLog] = useState(null);
  const [formData, setFormData] = useState(createEmptyLogForm());

  const routine = [
    { name: "Push-ups", sets: "3 x 15", icon: <Activity size={14} /> },
    { name: "Squats", sets: "3 x 20", icon: <Activity size={14} /> },
    { name: "Plank", sets: "60 sec", icon: <Activity size={14} /> },
    { name: "Running", sets: "20 min", icon: <Activity size={14} /> },
  ];

  useEffect(() => {
    if (todayLog) {
      setFormData(mapLogToForm(todayLog));
    }
  }, [todayLog]);

  useEffect(() => {
    const loadDashboard = async () => {
      setIsDashboardLoading(true);
      setIsHistoryLoading(true);
      setDashboardError("");
      setHistoryError("");

      try {
        const [todayResult, historyResult] = await Promise.allSettled([getTodayLog(), getLogHistory(90)]);

        if (todayResult.status === "fulfilled") {
          setTodayLog(todayResult.value);
        } else {
          const message =
            todayResult.reason?.response?.data?.error ||
            "Failed to load today's log. You can still review your recent history.";
          setDashboardError(message);
        }

        if (historyResult.status === "fulfilled") {
          setLogHistory(Array.isArray(historyResult.value) ? historyResult.value : []);
        } else {
          const message =
            historyResult.reason?.response?.data?.error ||
            "Failed to load workout history. Your streak and heatmap may be unavailable.";
          setHistoryError(message);
        }
      } finally {
        setIsDashboardLoading(false);
        setIsHistoryLoading(false);
      }
    };

    loadDashboard();
  }, []);

  useEffect(() => {
    setStreakCount(calculateWorkoutStreak(logHistory));
  }, [logHistory]);

  useEffect(() => {
    if (!isLogModalOpen) {
      return undefined;
    }

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isLogModalOpen]);

  const openLogModal = async () => {
    setIsLogModalOpen(true);
    setIsFetchingLog(true);
    setLogError("");

    try {
      const log = await getTodayLog();
      setTodayLog(log);
      setFormData(log ? mapLogToForm(log) : createEmptyLogForm());
    } catch (error) {
      const message =
        error?.response?.data?.error || "Failed to load today's log. Please try again.";
      setLogError(message);
      setFormData(todayLog ? mapLogToForm(todayLog) : createEmptyLogForm());
    } finally {
      setIsFetchingLog(false);
    }
  };

  const closeLogModal = () => {
    if (isSubmittingLog) {
      return;
    }

    setIsLogModalOpen(false);
    setLogError("");
  };

  const handleInputChange = (event) => {
    const { name, type, checked, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const payload = normalizePayload(formData);
    const previousLog = todayLog;
    const optimisticLog = {
      ...todayLog,
      ...payload,
      date: todayLog?.date || new Date().toISOString().split("T")[0],
    };

    setIsSubmittingLog(true);
    setLogError("");
    setTodayLog(optimisticLog);

    try {
      const updatedLog = await updateTodayLog(payload);
      setLogHistory((current) => {
        const next = current.filter((log) => log.date !== updatedLog.date);
        const merged = [...next, updatedLog].sort((left, right) => left.date.localeCompare(right.date));
        return merged;
      });
      setTodayLog(updatedLog);
      setIsLogModalOpen(false);
      toast.success("Today's log updated");
    } catch (error) {
      setTodayLog(previousLog);
      setLogError(error?.response?.data?.error || "Failed to save today's log. Please try again.");
      toast.error("Unable to update today's log");
    } finally {
      setIsSubmittingLog(false);
    }
  };

  const hasLog = Boolean(todayLog);
  const workedOutToday = hasLog ? Number(todayLog.exerciseTime) > 0 : false;
  const heatmapDays = buildHeatmapDays(logHistory, 90);

  return (
    <>
      <div className="min-h-screen bg-[rgb(var(--body-color))] px-4 pb-12 pt-24 text-[rgb(var(--text-primary))] transition-colors duration-300 md:px-10">
        <header className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Fitness Command Center</h1>
            <p className="mt-2 text-sm text-[rgb(var(--text-muted))]">
              Stay on top of today&apos;s nutrition, workout time, and 90-day consistency.
            </p>
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={openLogModal}
              disabled={isFetchingLog}
              className="flex items-center gap-2 rounded-xl bg-[rgb(var(--primary))] px-4 py-2 text-sm font-medium text-white shadow-lg shadow-[rgb(var(--primary))]/20 transition-all hover:bg-[rgb(var(--primary-hover))] disabled:cursor-not-allowed disabled:opacity-70"
            >
              <PlusCircle size={18} />
              {isFetchingLog ? "Loading..." : "Log Today"}
            </button>
          </div>
        </header>

        {dashboardError ? (
          <div className="mb-6 rounded-3xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
            {dashboardError}
          </div>
        ) : null}

        <section className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <StatCard
            title="Calories Consumed"
            value={hasLog ? todayLog.caloriesConsumed : isDashboardLoading ? "..." : "--"}
            unit="kcal"
            trend={hasLog ? "Updated today" : isDashboardLoading ? "Loading" : "No log yet"}
            color="var(--primary)"
          />
          <StatCard
            title="Exercise Time"
            value={hasLog ? todayLog.exerciseTime : isDashboardLoading ? "..." : "--"}
            unit="min"
            trend={hasLog ? "Today" : isDashboardLoading ? "Loading" : "No log yet"}
            color="var(--secondary)"
          />
          <StatCard
            title="Workout Status"
            value={hasLog ? (workedOutToday ? "Yes" : "Rest") : isDashboardLoading ? "..." : "--"}
            unit=""
            trend={hasLog ? "Based on exercise time" : isDashboardLoading ? "Loading" : "No log yet"}
            color="var(--accent)"
          />
          <StatCard
            title="Current Weight"
            value={
              hasLog && todayLog.weight !== null && todayLog.weight !== undefined
                ? todayLog.weight
                : isDashboardLoading
                  ? "..."
                  : "--"
            }
            unit={hasLog && todayLog.weight !== null && todayLog.weight !== undefined ? "kg" : ""}
            trend={hasLog ? "Latest entry" : isDashboardLoading ? "Loading" : "No log yet"}
            color="var(--primary)"
          />
        </section>

        <div className="mt-8 grid gap-8 lg:grid-cols-12">
          <div className="space-y-6 lg:col-span-4">
            <div className="group relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[rgb(var(--primary))] via-[rgb(var(--primary-hover))] to-[rgb(var(--secondary-hover))] p-8 text-white shadow-2xl transition-transform hover:scale-[1.01]">
              <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-3xl transition-all group-hover:bg-white/20" />

              <div className="relative flex flex-col items-center text-center">
                <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-3xl bg-white/20 shadow-inner ring-2 ring-white/30 backdrop-blur-md">
                  <User size={48} strokeWidth={1.5} />
                </div>
                <h2 className="text-xl font-bold tracking-wide">{user?.name || "FitBuddy User"}</h2>
                <p className="mt-1 flex items-center gap-2 text-sm opacity-80">
                  <Mail size={14} /> {user?.email || "No email available"}
                </p>

                <div className="mt-6 grid w-full gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-black/10 p-3 backdrop-blur-sm">
                    <p className="text-[10px] uppercase tracking-widest opacity-70">Log Date</p>
                    <p className="font-bold">{todayLog?.date || "Open today's log"}</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-black/10 p-3 backdrop-blur-sm">
                    <p className="text-[10px] uppercase tracking-widest opacity-70">Workout</p>
                    <p className="font-bold">
                      {hasLog ? (workedOutToday ? "Completed" : "Rest day") : "Not logged"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <Card>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[rgb(var(--secondary))]">
                    Today&apos;s Snapshot
                  </p>
                  <h3 className="mt-2 text-lg font-bold">Your latest numbers</h3>
                </div>
                <CheckCircle className="text-[rgb(var(--secondary))]" size={20} />
              </div>

              <div className="mt-5 space-y-3">
                <FocusItem
                  label="Calories"
                  value={hasLog ? `${todayLog.caloriesConsumed} kcal` : "Open the log form"}
                  icon={<Flame size={16} />}
                  color="var(--primary)"
                />
                <FocusItem
                  label="Exercise"
                  value={hasLog ? `${todayLog.exerciseTime} minutes` : "No workout logged"}
                  icon={<Dumbbell size={16} />}
                />
                <FocusItem
                  label="Weight"
                  value={
                    hasLog && todayLog.weight !== null && todayLog.weight !== undefined
                      ? `${todayLog.weight} kg`
                      : "Weight not added"
                  }
                  icon={<Weight size={16} />}
                  color="var(--accent)"
                />
              </div>
            </Card>

            <StreakCard streakCount={streakCount} isLoading={isHistoryLoading} />

            <div className="grid grid-cols-2 gap-3">
              <ActionButton icon={<Calculator />} label="BMI Calc" sub="Check index" />
              <ActionButton icon={<Flame />} label="Nutrition" sub="Track meals" />
              <ActionButton icon={<Dumbbell />} label="Plan" sub="Edit routine" />
              <ActionButton icon={<Trophy />} label="Badges" sub="View all" />
            </div>
          </div>

          <div className="space-y-8 lg:col-span-8">
            <Heatmap days={heatmapDays} isLoading={isHistoryLoading} error={historyError} />

            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <h3 className="mb-4 flex items-center gap-2 text-lg font-bold">
                  <TrendingUp size={20} className="text-[rgb(var(--primary))]" /> Today&apos;s Focus
                </h3>
                <div className="space-y-3">
                  <FocusItem
                    label="Workout"
                    value={hasLog ? `${todayLog.exerciseTime} minutes planned/logged` : "Log your session"}
                    icon={<Dumbbell size={16} />}
                  />
                  <FocusItem
                    label="Nutrition"
                    value={hasLog ? `${todayLog.caloriesConsumed} kcal tracked` : "Add calorie intake"}
                    icon={<Flame size={16} />}
                    color="var(--primary)"
                  />
                  <FocusItem
                    label="Recovery"
                    value={
                      hasLog
                        ? workedOutToday
                          ? "Great work. Recover well tonight."
                          : "Recovery day logged."
                        : "Update your daily log to see insights."
                    }
                    icon={<Moon size={16} />}
                    color="var(--accent)"
                  />
                </div>
              </Card>

              <Card>
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-lg font-bold">Current Routine</h3>
                  <button className="text-xs font-bold text-[rgb(var(--primary))] hover:underline">
                    Manage
                  </button>
                </div>
                <div className="space-y-2">
                  {routine.map((item) => (
                    <div
                      key={item.name}
                      className="group flex items-center justify-between rounded-2xl border border-[rgb(var(--card-depth-2))]/30 bg-[rgb(var(--card-depth-1))] p-3 transition-colors hover:border-[rgb(var(--primary))]/50"
                    >
                      <div className="flex items-center gap-3">
                        <div className="rounded-lg bg-[rgb(var(--card-depth-0))] p-2 text-[rgb(var(--primary))]">
                          {item.icon}
                        </div>
                        <span className="text-sm font-medium">{item.name}</span>
                      </div>
                      <span className="text-xs font-bold opacity-60 transition-opacity group-hover:text-[rgb(var(--secondary))] group-hover:opacity-100">
                        {item.sets}
                      </span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <LogForm
        isOpen={isLogModalOpen}
        formData={formData}
        error={logError}
        isFetching={isFetchingLog}
        isSubmitting={isSubmittingLog}
        onChange={handleInputChange}
        onClose={closeLogModal}
        onSubmit={handleSubmit}
      />
    </>
  );
}

const Card = ({ children, className = "" }) => (
  <div
    className={`rounded-[2rem] border border-[rgb(var(--card-depth-1))] bg-[rgb(var(--card-depth-0))] p-6 shadow-xl shadow-black/[0.02] transition-all dark:shadow-none ${className}`}
  >
    {children}
  </div>
);

const StatCard = ({ title, value, unit, trend, color }) => (
  <div className="group relative overflow-hidden rounded-3xl border border-[rgb(var(--card-depth-1))] bg-[rgb(var(--card-depth-0))] p-6 shadow-sm transition-all duration-500 hover:shadow-lg">
    <div
      className="absolute left-0 top-0 h-1 w-full opacity-40 transition-opacity group-hover:opacity-100"
      style={{ backgroundColor: `rgb(${color})` }}
    />
    <p className="mb-2 text-[10px] font-bold uppercase tracking-widest opacity-50">{title}</p>
    <div className="flex items-baseline gap-1">
      <span className="text-3xl font-black tracking-tight" style={{ color: `rgb(${color})` }}>
        {value}
      </span>
      {unit ? <span className="text-xs font-bold opacity-40">{unit}</span> : null}
    </div>
    <div className="mt-4 flex items-center justify-between">
      <span
        className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
          trend === "No log yet"
            ? "bg-[rgb(var(--card-depth-2))] opacity-60"
            : "bg-[rgb(var(--secondary))]/10 text-[rgb(var(--secondary))]"
        }`}
      >
        {trend}
      </span>
      <Activity size={16} className="opacity-10" />
    </div>
  </div>
);

const ActionButton = ({ icon, label, sub }) => (
  <button className="flex w-full flex-col items-start rounded-2xl border border-[rgb(var(--card-depth-1))] bg-[rgb(var(--card-depth-0))] p-4 transition-all hover:-translate-y-1 hover:border-[rgb(var(--secondary))] group">
    <div className="mb-3 rounded-xl bg-[rgb(var(--card-depth-1))] p-2 text-[rgb(var(--primary))] transition-colors group-hover:bg-[rgb(var(--secondary))] group-hover:text-white">
      {icon}
    </div>
    <span className="text-sm font-bold">{label}</span>
    <span className="text-[10px] font-medium opacity-50">{sub}</span>
  </button>
);

const FocusItem = ({ label, value, icon, color = "var(--secondary)" }) => (
  <div className="flex items-center gap-4 rounded-2xl border border-transparent bg-[rgb(var(--card-depth-1))] p-3 transition-all hover:border-[rgb(var(--card-depth-2))]">
    <div
      className="rounded-xl bg-[rgb(var(--card-depth-0))] p-2.5 shadow-sm"
      style={{ color: `rgb(${color})` }}
    >
      {icon}
    </div>
    <div>
      <p className="mb-1 text-[10px] font-bold uppercase leading-none opacity-40">{label}</p>
      <p className="text-sm font-bold tracking-tight">{value}</p>
    </div>
  </div>
);
