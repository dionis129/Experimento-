
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

const DATA_FILE = path.join(__dirname, 'seconds.json');

// Leer los segundos guardados o iniciar en 0
let seconds = 0;
if (fs.existsSync(DATA_FILE)) {
  try {
    const data = fs.readFileSync(DATA_FILE, 'utf8');
    seconds = JSON.parse(data).seconds || 0;
  } catch (err) {
    console.error('Error leyendo seconds.json', err);
  }
}

// Incrementar cada segundo y guardar en archivo
setInterval(() => {
  seconds++;
  fs.writeFile(DATA_FILE, JSON.stringify({ seconds }), (err) => {
    if (err) console.error('Error guardando segundos', err);
  });
}, 1000);

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Ruta para mostrar los segundos
app.get('/contador', (req, res) => {
  res.send(`<h1>Servidor activo ${seconds} segundos</h1>`);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});