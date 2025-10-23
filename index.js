const express = require('express');
const path = require('path');
const app = express();

let seconds = 0;

// Contador de segundos que lleva activo el servidor
setInterval(() => {
  seconds++;
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