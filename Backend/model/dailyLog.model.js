import mongoose from "mongoose";

const dailyLogSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  date: {
    type: String,
    required: true
  },
  caloriesConsumed: { type: Number, default: 0 },
  exerciseTime: { type: Number, default: 0 },
  didExercise: { type: Boolean, default: false },
  weight: Number,
}, { timestamps: true });

dailyLogSchema.index({ userId: 1, date: 1 }, { unique: true });

export default mongoose.model("dailyLog", dailyLogSchema);
