// Minecraft/AntiAFK.js
export default function startAntiAFK(client) {
  console.log("🛡️ AntiAFK activado: el bot se mueve y salta automáticamente.");

  let direction = 1; // 1 = adelante, -1 = atrás

  setInterval(() => {
    if (!client || !client.spawned) return;

    // Mover hacia adelante o atrás
    client.queue('move', { forward: direction });

    // Después de 2 segundos, detenerse
    setTimeout(() => client.queue('move', { forward: 0 }), 2000);

    // Cambiar de dirección aleatoriamente
    if (Math.random() < 0.3) direction *= -1;

    // Saltar cada vez que se mueve
    client.queue('jump', {});

  }, 5000); // cada 5 segundos
}