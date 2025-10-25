import { createBot } from "mineflayer-bedrock";
import startAntiAFK from "./AntiAFK.js";

export default function startBot() {
  console.log("⏳ Intentando conectar bot Bedrock...");

  const bot = createBot({
    host: "dionis169.aternos.me",
    port: 30590,
    username: "MiBotBedrock",
    version: "1.21.111",
  });

  bot.once("spawn", () => {
    console.log("✅ Bot Bedrock conectado y dentro del mundo!");
    startAntiAFK(bot);
  });

  bot.on("error", (err) => console.log("⚠️ Error:", err.message));

  bot.on("end", () => {
    console.log("❌ Bot desconectado, reintentando...");
    setTimeout(startBot, 10000);
  });
}