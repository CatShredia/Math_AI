// public/deepseek.js
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".form");
  const requestText = document.getElementById("requestText");
  const textElement = document.querySelector(".text");

  // Загрузка сохраненных данных при загрузке страницы
  const savedData = localStorage.getItem("deepseekChatHistory");
  if (savedData) {
    textElement.innerHTML = savedData; // Отображаем сохраненную историю
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const message = requestText.value;

    try {
      const response = await fetch("http://localhost:8000/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ message: message })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      const html = data.response;

      // Добавляем новый запрос и ответ к существующей истории
      const newEntry = `<div class="request"><strong>You:</strong> ${message}</div><div class="response">${html}</div>`;
      textElement.innerHTML += newEntry; // Добавляем к существующему содержимому

      // Сохраняем обновленную историю в localStorage
      localStorage.setItem("deepseekChatHistory", textElement.innerHTML);

    } catch (error) {
      console.error("Error fetching response:", error);
      textElement.textContent = "Error getting response from the server.";
    }
  });
});