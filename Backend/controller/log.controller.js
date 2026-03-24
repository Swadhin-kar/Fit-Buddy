import dailyLog from "../model/dailyLog.model.js";

const getTodayDate = () => new Date().toISOString().split("T")[0];

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
    const { caloriesConsumed, exerciseTime, didExercise, weight } = req.body;

    const log = await dailyLog.findOneAndUpdate(
      { userId, date: today },
      {
        $set: {
          caloriesConsumed: Number(caloriesConsumed) || 0,
          exerciseTime: Number(exerciseTime) || 0,
          didExercise: Boolean(didExercise),
          weight: weight === "" || weight === null || weight === undefined ? null : Number(weight),
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
    res.status(500).json({ error: err.message });
  }
};

export const getLogs = async (req, res) => {
  try {
    const userId = req.userId;
    const days = Number.parseInt(req.query.days, 10) || 7;

    const fromDate = new Date();
    fromDate.setDate(fromDate.getDate() - days);

    const logs = await dailyLog
      .find({
        userId,
        date: { $gte: fromDate.toISOString().split("T")[0] },
      })
      .sort({ date: 1 });

    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
