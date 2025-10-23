const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

const DATA_FILE = path.join(__dirname, 'seconds.json');

let seconds = 0;

// Leer segundos guardados al iniciar el servidor
if (fs.existsSync(DATA_FILE)) {
  const data = fs.readFileSync(DATA_FILE, 'utf8');
  try {
    const parsed = JSON.parse(data);
    if (parsed.seconds !== undefined) {
      seconds = parsed.seconds;
    }
  } catch (err) {
    console.error('Error leyendo seconds.json:', err);
  }
}

// Contador de segundos que lleva activo el servidor
setInterval(() => {
  seconds++;
  // Guardar cada segundo en el archivo
  fs.writeFile(DATA_FILE, JSON.stringify({ seconds }), err => {
    if (err) console.error('Error guardando seconds.json:', err);
  });
}, 1000);

// Servir archivos dentro de "public"
app.use(express.static(path.join(__dirname, 'public')));

// Ruta para enviar los segundos en JSON
app.get("/seconds", (req, res) => {
  res.json({ seconds });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});