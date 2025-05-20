import { createWorker } from "tesseract.js";
import fs from "fs";

const imagePath = "./public/rec/Алгебра подстановок/IMG20250512144434.jpg";

(async () => {
  let worker;
  try {
    worker = await createWorker("rus");

    if (!fs.existsSync(imagePath)) {
      console.error(`Файл не найден: ${imagePath}`);
      return;
    }

    const {
      data: { text }
    } = await worker.recognize(imagePath);
    console.log(text);
  } catch (error) {
    console.error("Ошибка OCR:", error);
  } finally {
    if (worker) {
      await worker.terminate();
    }
  }
})();
