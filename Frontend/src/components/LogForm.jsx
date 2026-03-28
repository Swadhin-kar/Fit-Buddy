import { LoaderCircle, PlusCircle, Trash2, X } from "lucide-react";

const inputClassName =
  "w-full rounded-2xl border border-[rgb(var(--card-depth-2))] bg-[rgb(var(--card-depth-1))] px-4 py-3 text-sm text-[rgb(var(--text-primary))] outline-none transition focus:border-[rgb(var(--primary))] focus:ring-2 focus:ring-[rgb(var(--primary))]/10";

export default function LogForm({
  isOpen,
  formData,
  error,
  isFetching,
  isSubmitting,
  onAddExercise,
  onChange,
  onClose,
  onExerciseChange,
  onRemoveExercise,
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
              Track calories, workout time, body weight, and lifting details for today.
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

            <div className="rounded-3xl border border-[rgb(var(--card-depth-2))] bg-[rgb(var(--card-depth-1))/0.35] p-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-[rgb(var(--text-primary))]">
                    Exercises
                  </p>
                  <p className="mt-1 text-sm text-[rgb(var(--text-muted))]">
                    Add real set, rep, and weight entries to power workload and injury analytics.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={onAddExercise}
                  className="inline-flex items-center gap-2 rounded-2xl border border-[rgb(var(--card-depth-2))] px-3 py-2 text-sm font-semibold text-[rgb(var(--text-primary))] transition hover:border-[rgb(var(--primary))] hover:text-[rgb(var(--primary))]"
                >
                  <PlusCircle size={16} />
                  Add exercise
                </button>
              </div>

              {formData.exercises.length ? (
                <div className="mt-4 space-y-3">
                  {formData.exercises.map((exercise, index) => (
                    <div
                      key={`exercise-row-${index}`}
                      className="rounded-3xl border border-[rgb(var(--card-depth-2))] bg-[rgb(var(--card-depth-0))] p-4"
                    >
                      <div className="grid gap-3 md:grid-cols-[minmax(0,1.4fr)_repeat(3,minmax(0,0.6fr))_auto]">
                        <div>
                          <label
                            htmlFor={`exercise-name-${index}`}
                            className="mb-2 block text-sm font-medium text-[rgb(var(--text-primary))]"
                          >
                            Exercise
                          </label>
                          <input
                            id={`exercise-name-${index}`}
                            type="text"
                            value={exercise.name}
                            onChange={(event) => onExerciseChange(index, "name", event.target.value)}
                            className={inputClassName}
                            placeholder="e.g. Barbell squat"
                          />
                        </div>

                        <div>
                          <label
                            htmlFor={`exercise-sets-${index}`}
                            className="mb-2 block text-sm font-medium text-[rgb(var(--text-primary))]"
                          >
                            Sets
                          </label>
                          <input
                            id={`exercise-sets-${index}`}
                            type="number"
                            min="1"
                            step="1"
                            value={exercise.sets}
                            onChange={(event) => onExerciseChange(index, "sets", event.target.value)}
                            className={inputClassName}
                            placeholder="3"
                          />
                        </div>

                        <div>
                          <label
                            htmlFor={`exercise-reps-${index}`}
                            className="mb-2 block text-sm font-medium text-[rgb(var(--text-primary))]"
                          >
                            Reps
                          </label>
                          <input
                            id={`exercise-reps-${index}`}
                            type="number"
                            min="1"
                            step="1"
                            value={exercise.reps}
                            onChange={(event) => onExerciseChange(index, "reps", event.target.value)}
                            className={inputClassName}
                            placeholder="10"
                          />
                        </div>

                        <div>
                          <label
                            htmlFor={`exercise-weight-${index}`}
                            className="mb-2 block text-sm font-medium text-[rgb(var(--text-primary))]"
                          >
                            Weight (kg)
                          </label>
                          <input
                            id={`exercise-weight-${index}`}
                            type="number"
                            min="0"
                            step="0.5"
                            value={exercise.weight}
                            onChange={(event) => onExerciseChange(index, "weight", event.target.value)}
                            className={inputClassName}
                            placeholder="60"
                          />
                        </div>

                        <div className="flex items-end">
                          <button
                            type="button"
                            onClick={() => onRemoveExercise(index)}
                            className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-red-500/20 px-3 py-3 text-sm font-semibold text-red-500 transition hover:bg-red-500/10"
                          >
                            <Trash2 size={16} />
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="mt-4 rounded-3xl border border-dashed border-[rgb(var(--card-depth-2))] px-4 py-6 text-center text-sm text-[rgb(var(--text-muted))]">
                  No exercise entries added yet.
                </div>
              )}
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
