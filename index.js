// index.js

const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

// ✅ 1. Archivo donde se guardan los segundos
const DATA_FILE = path.join(__dirname, 'seconds.json');

// ✅ 2. Leer segundos guardados o iniciar en 0
let seconds = 0;
if (fs.existsSync(DATA_FILE)) {
  try {
    const data = fs.readFileSync(DATA_FILE, 'utf8');
    seconds = JSON.parse(data).seconds || 0;
  } catch (err) {
    console.error('Error leyendo seconds.json', err);
  }
}

// ✅ 3. Incrementar contador y guardar cada segundo
setInterval(() => {
  seconds++;
  fs.writeFile(DATA_FILE, JSON.stringify({ seconds }), (err) => {
    if (err) console.error('Error guardando segundos', err);
  });
}, 1000);

// ✅ 4. Servir archivos estáticos desde "public"
app.use(express.static(path.join(__dirname, 'public')));

// ✅ 5. Ruta para enviar el contador actual
app.get('/contador', (req, res) => {
  res.json({ seconds });
});

// ✅ 6. Iniciar el servidor Express
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});

// ✅ 7. Cargar y ejecutar el bot de Minecraft
const startBot = require('./Minecraft/Bot');
startBot();