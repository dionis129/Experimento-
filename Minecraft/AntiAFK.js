export default function startAntiAFK(client) {
  console.log("🌀 Anti-AFK activado: movimiento aleatorio y saltos.");

  // Altura base del suelo (ajústala si tu mundo es más alto o bajo)
  const baseY = 64;

  function moveBot() {
    const x = Math.floor(Math.random() * 5) - 2;
    const z = Math.floor(Math.random() * 5) - 2;

    const position = {
      x: x,
      y: baseY,
      z: z
    };

    client.write("move_player", {
      runtime_id: client.entityId,
      position,
      rotation: { x: Math.random() * 360, y: 0 },
      mode: 0,
      on_ground: true,
      ridden_entrity_runtime_id: 0,
      teleportation_cause: 0,
      tick: BigInt(Date.now())
    });

    console.log(`🦶 Bot se movió a (${x}, ${baseY}, ${z})`);
  }

  function jump() {
    client.write("animate", {
      action_id: 1, // Acción de salto
      runtime_id: client.entityId
    });
    console.log("🦘 Bot saltó!");
  }

  // Mover cada 10s y saltar cada 15s
  setInterval(moveBot, 10000);
  setInterval(jump, 15000);
}