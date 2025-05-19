// index.js
const express = require("express");
const app = express();
const port = 8000;
const path = require("path");
const OpenAI = require("openai");
require("dotenv").config(); // Загрузите переменные окружения
const cors = require("cors"); // Импортируйте cors

const showdown  = require('showdown');
const converter = new showdown.Converter({
  simplifiedAutoLink: true,
  excludeTrailingPunctuationFromURLs: true,
  literalMidWordUnderscores: true,
  strikethrough: true,
  tables: true,
});

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json()); // Для разбора тела запросов в формате JSON
app.use(cors()); // Добавьте cors middleware

const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
  defaultHeaders: {
    "HTTP-Referer": "catshredia-app.com",
    "X-Title": "mathai"
  }
});

async function getResponseFromAI(userMessage) {
  console.log("User Creating Request to AI from server");

  try {
    const response = await openai.chat.completions.create({
      model: process.env.OPENROUTER_MODEL_NAME,
      messages: [
        { role: "system", content: "You are an AI assistant." },
        { role: "user", content: userMessage }
      ],
      temperature: 0.7,
      max_tokens: 1500
    });

    console.log("AI response:", response.choices[0].message.content);
    const html = converter.makeHtml(response.choices[0].message.content);

    return html;
  } catch (error) {
    console.error("\tError:", error.message);
    throw error; // Перебрасываем ошибку для обработки в вызывающем коде
  }
}

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.post("/ask", async (req, res) => {
  const userMessage = req.body.message;

  try {
    const aiResponse = await getResponseFromAI(userMessage);
    res.json({ response: aiResponse });
  } catch (error) {
    console.error("Error processing request:", error);
    res.status(500).json({ error: "Failed to get response from AI" });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
