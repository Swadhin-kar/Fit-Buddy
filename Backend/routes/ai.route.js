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
        model: "openrouter/healer-alpha",
        messages: [
          {
            role: "system",
            content:
              "You are a fitness assistant. Answer the user's fitness question in 70 to 80 words only. Keep the response concise, practical, and beginner-friendly. No long explanations, no medical claims, and no unnecessary text."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.6,
        max_tokens: 120
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "https://fit-buddy.vercel.app",
          "X-Title": "FitBee AI"
        }
      }
    );

    const message = response.data?.choices?.[0]?.message?.content || "No response";

    res.json({
      success: true,
      message
    });

  } catch (err) {
    console.error("AI API Error:", err.response?.data || err.message);

    if (err.response?.status === 429) {
      return res.status(429).json({
        error: "Free AI limit reached. Try again later."
      });
    }

    res.status(500).json({
      error: "Failed to get AI response"
    });
  }
};

router.post("/chat", fitnessAI);

export default router;