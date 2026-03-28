import dailyLog from "../model/dailyLog.model.js";
import { formatDateKey, sanitizeExercises } from "../utils/logHelpers.js";

const getTodayDate = () => formatDateKey(new Date());

export const getTodayLog = async (req, res) => {
  try {
    const userId = req.userId;
    const today = getTodayDate();

    let log = await dailyLog.findOne({ userId, date: today });

    if (!log) {
      const lastLog = await dailyLog.findOne({ userId }).sort({ date: -1 });

      log = await dailyLog.create({
        userId,
        date: today,
        caloriesConsumed: 0,
        exerciseTime: 0,
        didExercise: false,
        weight: lastLog?.weight ?? null,
        exercises: [],
      });
    }

    res.json(log);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateLog = async (req, res) => {
  try {
    const userId = req.userId;
    const today = getTodayDate();
    const { caloriesConsumed, exerciseTime, didExercise, weight, exercises } = req.body;
    const sanitizedExercises = sanitizeExercises(exercises ?? []);
    const normalizedExerciseTime = Number(exerciseTime) || 0;
    const resolvedDidExercise =
      normalizedExerciseTime > 0 || sanitizedExercises.length > 0 || Boolean(didExercise);

    const log = await dailyLog.findOneAndUpdate(
      { userId, date: today },
      {
        $set: {
          caloriesConsumed: Number(caloriesConsumed) || 0,
          exerciseTime: normalizedExerciseTime,
          didExercise: resolvedDidExercise,
          weight: weight === "" || weight === null || weight === undefined ? null : Number(weight),
          exercises: sanitizedExercises,
        },
      },
      {
        new: true,
        upsert: true,
        runValidators: true,
        setDefaultsOnInsert: true,
      }
    );

    res.json(log);
  } catch (err) {
    const statusCode = err.message?.toLowerCase().includes("exercise") ? 400 : 500;
    res.status(statusCode).json({ error: err.message });
  }
};

export const getLogs = async (req, res) => {
  try {
    const userId = req.userId;
    const days = Number.parseInt(req.query.days, 10) || 90;

    const fromDate = new Date();
    fromDate.setDate(fromDate.getDate() - days);

    const logs = await dailyLog
      .find({
        userId,
        date: { $gte: formatDateKey(fromDate) },
      })
      .sort({ date: 1 });

    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
