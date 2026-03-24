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
import LogForm from "../components/LogForm";
import { getTodayLog, updateTodayLog } from "../utils/logApi";

const createEmptyLogForm = () => ({
  caloriesConsumed: "",
  exerciseTime: "",
  didExercise: false,
  weight: "",
});

const mapLogToForm = (log) => ({
  caloriesConsumed: log?.caloriesConsumed?.toString() ?? "",
  exerciseTime: log?.exerciseTime?.toString() ?? "",
  didExercise: Boolean(log?.didExercise),
  weight: log?.weight === null || log?.weight === undefined ? "" : log.weight.toString(),
});

const normalizePayload = (formData) => ({
  caloriesConsumed: formData.caloriesConsumed === "" ? 0 : Number(formData.caloriesConsumed),
  exerciseTime: formData.exerciseTime === "" ? 0 : Number(formData.exerciseTime),
  didExercise: Boolean(formData.didExercise),
  weight: formData.weight === "" ? "" : Number(formData.weight),
});

const generateHeatmap = (weeks = 20) => {
  const days = weeks * 7;
  return Array.from({ length: days }, () => Math.floor(Math.random() * 5));
};

const getHeatmapColor = (level) => {
  const levels = [
    "bg-[rgb(var(--card-depth-2))]",
    "bg-[rgb(var(--secondary))]/30",
    "bg-[rgb(var(--secondary))]/50",
    "bg-[rgb(var(--secondary))]/80",
    "bg-[rgb(var(--secondary))]",
  ];
  return levels[level];
};

export default function PersonalDashboard() {
  const { user } = useContext(AuthContext);
  const [heatmap] = useState(generateHeatmap());
  const [isLogModalOpen, setIsLogModalOpen] = useState(false);
  const [isFetchingLog, setIsFetchingLog] = useState(false);
  const [isSubmittingLog, setIsSubmittingLog] = useState(false);
  const [logError, setLogError] = useState("");
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

  return (
    <>
      <div className="min-h-screen bg-[rgb(var(--body-color))] px-4 pb-12 pt-24 text-[rgb(var(--text-primary))] transition-colors duration-300 md:px-10">
        <header className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Fitness Command Center</h1>
            <p className="mt-2 text-sm text-[rgb(var(--text-muted))]">
              Stay on top of today&apos;s nutrition, workout time, and recovery.
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

        <section className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <StatCard
            title="Calories Consumed"
            value={hasLog ? todayLog.caloriesConsumed : "--"}
            unit="kcal"
            trend={hasLog ? "Updated today" : "No log yet"}
            color="var(--primary)"
          />
          <StatCard
            title="Exercise Time"
            value={hasLog ? todayLog.exerciseTime : "--"}
            unit="min"
            trend={hasLog ? "Today" : "No log yet"}
            color="var(--secondary)"
          />
          <StatCard
            title="Workout Status"
            value={hasLog ? (todayLog.didExercise ? "Yes" : "No") : "--"}
            unit=""
            trend={hasLog ? "Completion" : "No log yet"}
            color="var(--accent)"
          />
          <StatCard
            title="Current Weight"
            value={hasLog && todayLog.weight !== null && todayLog.weight !== undefined ? todayLog.weight : "--"}
            unit={hasLog && todayLog.weight !== null && todayLog.weight !== undefined ? "kg" : ""}
            trend={hasLog ? "Latest entry" : "No log yet"}
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
                      {hasLog ? (todayLog.didExercise ? "Completed" : "Pending") : "Not logged"}
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

            <div className="grid grid-cols-2 gap-3">
              <ActionButton icon={<Calculator />} label="BMI Calc" sub="Check index" />
              <ActionButton icon={<Flame />} label="Nutrition" sub="Track meals" />
              <ActionButton icon={<Dumbbell />} label="Plan" sub="Edit routine" />
              <ActionButton icon={<Trophy />} label="Badges" sub="View all" />
            </div>
          </div>

          <div className="space-y-8 lg:col-span-8">
            <Card>
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold">Activity Consistency</h3>
                  <p className="text-xs opacity-50">
                    Visualizing your dedication over the last 20 weeks
                  </p>
                </div>
                <div className="flex items-center gap-2 text-[10px] opacity-60">
                  <span>Less</span>
                  <div className="flex gap-1">
                    {[0, 1, 2, 3, 4].map((level) => (
                      <div key={level} className={`h-2 w-2 rounded-sm ${getHeatmapColor(level)}`} />
                    ))}
                  </div>
                  <span>More</span>
                </div>
              </div>
              <div className="custom-scrollbar overflow-x-auto pb-2">
                <div className="grid min-w-max grid-flow-col grid-rows-7 gap-1.5">
                  {heatmap.map((level, index) => (
                    <div
                      key={index}
                      className={`h-[14px] w-[14px] cursor-pointer rounded-[3px] shadow-sm transition-all duration-300 hover:scale-125 hover:ring-2 hover:ring-[rgb(var(--primary))] ${getHeatmapColor(level)}`}
                    />
                  ))}
                </div>
              </div>
            </Card>

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
                        ? todayLog.didExercise
                          ? "Great work. Recover well tonight."
                          : "Recovery day or workout pending."
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
