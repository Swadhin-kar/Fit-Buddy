import mongoose from "mongoose";

const servingSchema = new mongoose.Schema({
  size: String,
  quantity: Number,
  unit: String
}, { _id: false });

const foodSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },

  name: {
    type: String,
    required: true
  },

  category: {
    type: String
  },

  unit: {
    type: String,
    default: "g"
  },

  baseQuantity: {
    type: Number,
    required: true
  },

  macros: {
    calories: Number,
    protein: Number,
    carbs: Number,
    fats: Number
  },

  servings: [servingSchema],

  tags: [String]

}, { timestamps: true });

foodSchema.index({ name: "text", tags: "text" });

foodSchema.index({ id: 1 });

const Food = mongoose.model("Food", foodSchema);

export default Food;