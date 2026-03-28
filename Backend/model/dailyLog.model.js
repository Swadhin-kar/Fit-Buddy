import mongoose from "mongoose";

const exerciseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    sets: {
      type: Number,
      required: true,
      min: 1,
    },
    reps: {
      type: Number,
      required: true,
      min: 1,
    },
    weight: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { _id: false },
);

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
  exercises: {
    type: [exerciseSchema],
    default: [],
  },
}, { timestamps: true });

dailyLogSchema.index({ userId: 1, date: 1 }, { unique: true });

export default mongoose.model("dailyLog", dailyLogSchema);
