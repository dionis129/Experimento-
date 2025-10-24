// Minecraft/AntiAFK.js
export default function startAntiAFK(client) {
  // Cada 5 segundos, hacer que el bot se mueva un poco
  setInterval(() => {
    if (!client || !client.spawned) return; // Evita errores si no está conectado

    // Avanza 1 tick
    client.queue('move', { forward: 1 });

    // Detiene el movimiento después de 1 segundo
    setTimeout(() => {
      client.queue('move', { forward: 0 });
    }, 1000);
  }, 5000);

  console.log("🛡️ AntiAFK activado: el bot se mueve automáticamente.");
}