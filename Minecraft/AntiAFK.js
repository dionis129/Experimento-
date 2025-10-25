export default function startAntiAFK(client) {
  console.log("🛡️ AntiAFK Bedrock activado: el bot se mueve y salta automáticamente.");

  let toggle = false;

  setInterval(() => {
    if (!client?.player?.position) return;

    const pos = client.player.position;
    const newPos = { ...pos };

    // Alterna entre avanzar y retroceder un poco
    newPos.z += toggle ? 0.3 : -0.3;
    toggle = !toggle;

    // Simular movimiento (paquete MovePlayer)
    client.write('move_player', {
      runtime_id: client.entityId,
      position: newPos,
      pitch: 0,
      yaw: Math.random() * 360,
      head_yaw: Math.random() * 360,
      mode: 0, // Normal
      on_ground: true,
      ridden_runtime_id: 0
    });

    // Simular salto ocasional
    if (Math.random() < 0.4) {
      const jumpPos = { ...newPos, y: newPos.y + 0.5 };
      client.write('move_player', {
        runtime_id: client.entityId,
        position: jumpPos,
        pitch: 0,
        yaw: 0,
        head_yaw: 0,
        mode: 0,
        on_ground: false,
        ridden_runtime_id: 0
      });
    }

  }, 5000); // Cada 5 segundos se mueve
}