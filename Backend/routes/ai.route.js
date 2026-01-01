import express from "express";
import axios from "axios";

const router = express.Router();

export const fitnessAI = async (req, res) => {
  const { prompt } = req.body;

  try {
    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "deepseek/deepseek-r1-0528:free",
        messages: [
          {
            role: "system",
            content:
              "You are a fitness assistant. Give safe, beginner-friendly advice. No medical claims."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.6
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const message = response.data.choices[0].message.content;
    res.json({ success: true, message });
  } catch (err) {
    console.error("AI API Error:", err.response?.data || err.message);
    
    if (err.response?.status === 429) {
      return res.status(429).json({ error: "Free AI limit reached. Try again later." });
    }
    
    res.status(500).json({ error: "Failed to get AI response" });
  }
};

router.post("/chat", fitnessAI);

export default router;
