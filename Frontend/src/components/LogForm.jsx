import { LoaderCircle, X } from "lucide-react";

const inputClassName =
  "w-full rounded-2xl border border-[rgb(var(--card-depth-2))] bg-[rgb(var(--card-depth-1))] px-4 py-3 text-sm text-[rgb(var(--text-primary))] outline-none transition focus:border-[rgb(var(--primary))] focus:ring-2 focus:ring-[rgb(var(--primary))]/10";

export default function LogForm({
  isOpen,
  formData,
  error,
  isFetching,
  isSubmitting,
  onChange,
  onClose,
  onSubmit,
}) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-6 backdrop-blur-sm">
      <div className="w-full max-w-xl rounded-[2rem] border border-[rgb(var(--card-depth-2))] bg-[rgb(var(--card-depth-0))] p-6 shadow-2xl">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[rgb(var(--secondary))]">
              Daily Log
            </p>
            <h2 className="mt-2 text-2xl font-bold text-[rgb(var(--text-primary))]">
              Log Today
            </h2>
            <p className="mt-1 text-sm text-[rgb(var(--text-muted))]">
              Track your calories, exercise time, and weight for today.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="rounded-full border border-[rgb(var(--card-depth-2))] p-2 text-[rgb(var(--text-muted))] transition hover:border-[rgb(var(--primary))] hover:text-[rgb(var(--text-primary))] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <X size={18} />
          </button>
        </div>

        {error ? (
          <div className="mb-4 rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
            {error}
          </div>
        ) : null}

        {isFetching ? (
          <div className="flex min-h-64 flex-col items-center justify-center gap-3 rounded-3xl border border-dashed border-[rgb(var(--card-depth-2))] bg-[rgb(var(--card-depth-1))] text-[rgb(var(--text-muted))]">
            <LoaderCircle size={24} className="animate-spin text-[rgb(var(--primary))]" />
            <p className="text-sm font-medium">Loading today's log...</p>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="space-y-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="caloriesConsumed"
                  className="mb-2 block text-sm font-medium text-[rgb(var(--text-primary))]"
                >
                  Calories consumed
                </label>
                <input
                  id="caloriesConsumed"
                  name="caloriesConsumed"
                  type="number"
                  min="0"
                  value={formData.caloriesConsumed}
                  onChange={onChange}
                  className={inputClassName}
                  placeholder="e.g. 2100"
                />
              </div>

              <div>
                <label
                  htmlFor="exerciseTime"
                  className="mb-2 block text-sm font-medium text-[rgb(var(--text-primary))]"
                >
                  Exercise time (minutes)
                </label>
                <input
                  id="exerciseTime"
                  name="exerciseTime"
                  type="number"
                  min="0"
                  value={formData.exerciseTime}
                  onChange={onChange}
                  className={inputClassName}
                  placeholder="e.g. 45"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="weight"
                className="mb-2 block text-sm font-medium text-[rgb(var(--text-primary))]"
              >
                Weight (kg)
              </label>
              <input
                id="weight"
                name="weight"
                type="number"
                min="0"
                step="0.1"
                value={formData.weight}
                onChange={onChange}
                className={inputClassName}
                placeholder="e.g. 72.5"
              />
            </div>

            <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={onClose}
                disabled={isSubmitting}
                className="rounded-2xl border border-[rgb(var(--card-depth-2))] px-5 py-3 text-sm font-semibold text-[rgb(var(--text-primary))] transition hover:border-[rgb(var(--primary))] disabled:cursor-not-allowed disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[rgb(var(--primary))] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[rgb(var(--primary-hover))] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? (
                  <>
                    <LoaderCircle size={16} className="animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save today's log"
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
