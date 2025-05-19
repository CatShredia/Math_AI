require("dotenv").config();
const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
  defaultHeaders: {
    "HTTP-Referer": "catshredia-app.com",
    "X-Title": "mathai"
  }
});

async function getResponseFromAI(userMessage) {
  console.log("User Creating Request to AI");

  try {
    const response = await openai.chat.completions.create({
      model: process.env.OPENROUTER_MODEL_NAME,
      messages: [
        { role: "system", content: "You are an AI assistant." },
        { role: "user", content: userMessage }
      ],
      temperature: 0.7,
      max_tokens: 150
    });

    console.log(response.choices[0].message.content);
    return response.choices[0].message.content;
  } catch (error) {
    console.error("\tError:", error.message);
    throw error; // Перебрасываем ошибку для обработки в вызывающем коде
  }
}

async function main() {
  const res = await getResponseFromAI("Привет, реши пример: 2+2*10239");
  console.log(res);
}

main();

module.exports = { getResponseFromAI };
