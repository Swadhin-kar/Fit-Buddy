import express from 'express'
import Food from '../model/food.model.js'

export const SearchByQuery = async (req, res) => {
  try {
    const query = req.query.q;

    if (!query) {
      return res.status(400).json({ message: "Query required" });
    }

    const foods = await Food.find({
      $text: { $search: query },
    }).limit(10);

    res.json(foods);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export const SearchById = async (req, res) => {
  try {
    const food = await Food.findOne({ id: req.params.id });

    if (!food) {
      return res.status(404).json({ message: "Food not found" });
    }

    res.json(food);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}