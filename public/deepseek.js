// public/deepseek.js
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".form");
  const requestText = document.getElementById("requestText");
  const textElement = document.querySelector(".text");

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
      const html = data.response; // Ответ уже в формате HTML

      // Отображаем HTML в элементе
      textElement.innerHTML = html;  // Использовать innerHTML вместо textContent
    } catch (error) {
      console.error("Error fetching response:", error);
      textElement.textContent = "Error getting response from the server.";
    }
  });
});