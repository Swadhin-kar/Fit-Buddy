export const formatDateKey = (date = new Date()) => {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const hasExerciseInput = (exercise = {}) => {
  const values = [exercise?.name, exercise?.sets, exercise?.reps, exercise?.weight];

  return values.some((value) => value !== "" && value !== null && value !== undefined);
};

export const sanitizeExercises = (inputExercises = []) => {
  if (!Array.isArray(inputExercises)) {
    throw new Error("Exercises must be sent as an array.");
  }

  return inputExercises.reduce((sanitizedExercises, exercise) => {
    if (!hasExerciseInput(exercise)) {
      return sanitizedExercises;
    }

    const name = typeof exercise?.name === "string" ? exercise.name.trim() : "";
    const sets = Number(exercise?.sets);
    const reps = Number(exercise?.reps);
    const weight = Number(exercise?.weight);

    if (
      !name ||
      !Number.isInteger(sets) ||
      sets <= 0 ||
      !Number.isInteger(reps) ||
      reps <= 0 ||
      !Number.isFinite(weight) ||
      weight < 0
    ) {
      throw new Error(
        "Each exercise must include a name, whole-number sets and reps, and a non-negative weight.",
      );
    }

    sanitizedExercises.push({ name, sets, reps, weight });
    return sanitizedExercises;
  }, []);
};
