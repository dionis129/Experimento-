// Minecraft/Bot.js
import { createClient } from "bedrock-protocol";
import startAntiAFK from "./AntiAFK.js";

export default function startBot() {
  function connectBot() {
    console.log("⏳ Intentando conectar el bot...");

    const client = createClient({
      host: "dionis169-zC8z.aternos.me",
      port: 48842,
      username: "MiBotBedrock",
      offline: true
    });

    let lastPacketTime = Date.now(); // Tiempo del último paquete recibido

    // ✅ Cuando el bot aparece en el mundo
    client.on("join", () => {
      console.log("🤖 Bot conectado correctamente!");
      startAntiAFK(client); // Activamos AntiAFK
    });

    // Chat del servidor → actualiza el último paquete recibido
    client.on("text", (packet) => {
      console.log("💬 Chat:", packet.message);
      lastPacketTime = Date.now();
    });

    // Movimiento → actualiza el último paquete recibido
    client.on("move", () => {
      lastPacketTime = Date.now();
    });

    // Verificación periódica de actividad real en el servidor
    setInterval(() => {
      if (Date.now() - lastPacketTime > 20000) { // si no recibe paquetes en 20s
        console.log("❌ Parece que el bot no está recibiendo datos del servidor!");
      } else {
        console.log("🟢 Bot sigue activo en el servidor.");
      }
    }, 10000); // cada 10 segundos

    // Desconexión
    client.on("disconnect", () => {
      console.log("❌ Bot desconectado del servidor.");
      setTimeout(connectBot, 10000); // reintento automático
    });

    // Manejo de errores
    client.on("error", (err) => {
      if (err.message.includes("Ping timed out")) {
        console.log("🔁 Servidor no responde, reintentando en 15 segundos...");
        setTimeout(connectBot, 15000); // reintento automático
      } else {
        console.log("⚠️ Otro tipo de error:", err.message);
      }
    });

    return client;
  }

  connectBot();
}