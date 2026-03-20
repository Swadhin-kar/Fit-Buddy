import express from "express";
import axios from "axios";

const router = express.Router();

export const fitnessAI = async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  const primaryModel = "nvidia/nemotron-3-super-120b-a12b:free";
  const fallbackModel = "meta-llama/llama-3-8b-instruct";

  const makeRequest = async (model) => {
    return await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model,
        messages: [
          {
            role: "system",
            content:
              "You are a fitness assistant. Answer in maximum 70 words. Be direct, practical, and beginner-friendly. No medical advice."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.5,
        max_tokens: 100
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "http://localhost:5173", // 🔥 use localhost for dev
          "X-Title": "FitBee AI"
        },
        timeout: 10000 // ⏱️ prevent hanging (10s)
      }
    );
  };

  try {
    let response;

    try {
      // 🔥 Try primary model
      response = await makeRequest(primaryModel);
    } catch (err) {
      console.log("Primary model failed:", err.response?.status);

      // 🔁 fallback only on real failure
      if (
        err.response?.status === 404 ||
        err.response?.status === 503 ||
        err.code === "ECONNABORTED"
      ) {
        console.log("Switching to fallback model...");
        response = await makeRequest(fallbackModel);
      } else {
        throw err;
      }
    }

    // 🧠 Robust response extraction
    let message = "No response";

    if (response?.data?.choices?.length > 0) {
      const choice = response.data.choices[0];

      message =
        choice?.message?.content?.trim() ||
        choice?.text?.trim() ||
        choice?.delta?.content?.trim() ||
        "No response";
    }

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

    if (err.code === "ECONNABORTED") {
      return res.status(500).json({
        error: "AI request timeout. Try again."
      });
    }

    res.status(500).json({
      error: "Failed to get AI response"
    });
  }
};

router.post("/chat", fitnessAI);

export default router;