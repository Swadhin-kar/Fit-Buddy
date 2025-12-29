import express from "express";
import OpenAI from "openai";
import dotenv from 'dotenv'

dotenv.config()

const aiRouter = express.Router();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

aiRouter.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a fitness assistant for Fit Buddy." },
        { role: "user", content: message },
      ],
    });

    res.json({
      reply: response.choices[0].message.content,
    });
  } catch (err) {
    res.status(500).json({ error: "AI failed" });
  }
});

export default aiRouter;
