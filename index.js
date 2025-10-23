const express = require('express');
const app = express();

let seconds = 0;

app.get("/", (req, res) => {
  seconds++;
  res.send(`<h1>Servidor activo ${seconds} segundos</h1>`);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
