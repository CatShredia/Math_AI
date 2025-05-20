import { createWorker } from "tesseract.js";

const worker = await createWorker("ru");

(async () => {
  const {
    data: { text }
  } = await worker.recognize(
    "https://tesseract.projectnaptha.com/img/eng_bw.png"
  );
  console.log(text);
  await worker.terminate();
})();
