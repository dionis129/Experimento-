import express from "express";
import fs from "fs";
import path from "path";
import startBot from "./Minecraft/Bot.js";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const DATA_FILE = path.join(__dirname, "seconds.json");

// ✅ Leer segundos guardados o iniciar en 0
let seconds = 0;
if (fs.existsSync(DATA_FILE)) {
  try {
    const data = fs.readFileSync(DATA_FILE, "utf8");
    seconds = JSON.parse(data).seconds || 0;
  } catch (err) {
    console.error("Error leyendo seconds.json", err);
  }
}

// ✅ Incrementar contador y guardar cada segundo
setInterval(() => {
  seconds++;
  fs.writeFile(DATA_FILE, JSON.stringify({ seconds }), (err) => {
    if (err) console.error("Error guardando segundos", err);
  });
}, 1000);

// ✅ Servir archivos estáticos desde "public"
app.use(express.static(path.join(__dirname, "public")));

// ✅ Ruta para enviar el contador actual
app.get("/contador", (req, res) => {
  res.json({ seconds });
});

// ✅ Iniciar el servidor Express
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🌐 Servidor corriendo en puerto ${PORT}`);
});

// ✅ Ejecutar el bot
startBot();