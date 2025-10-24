const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

const DATA_FILE = path.join(__dirname, 'seconds.json');

// Leer segundos guardados o iniciar en 0
let seconds = 0;
if (fs.existsSync(DATA_FILE)) {
  try {
    const data = fs.readFileSync(DATA_FILE, 'utf8');
    seconds = JSON.parse(data).seconds || 0;
  } catch (err) {
    console.error('Error leyendo seconds.json', err);
  }
}

// Incrementar cada segundo y guardar
setInterval(() => {
  seconds++;
  fs.writeFile(DATA_FILE, JSON.stringify({ seconds }), (err) => {
    if (err) console.error('Error guardando segundos', err);
  });
}, 1000);

// Servir archivos dentro de "public"
app.use(express.static(path.join(__dirname, 'public')));

// Ruta para enviar el contador en JSON
app.get('/contador', (req, res) => {
  res.json({ seconds });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});