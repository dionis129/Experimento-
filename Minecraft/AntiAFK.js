export default function startAntiAFK(client) {
  console.log("🛡️ AntiAFK Bedrock activado: esperando a que cargue el mundo...");

  client.on("start_game", (packet) => {
    console.log("✅ Bot dentro del mundo, iniciando AntiAFK...");

    let pos = packet.player_position;
    let tick = BigInt(0);

    setInterval(() => {
      tick += 1n;

      // Simula un pequeño movimiento y giro aleatorio
      pos = {
        x: pos.x + (Math.random() < 0.5 ? 0.3 : -0.3),
        y: pos.y,
        z: pos.z + (Math.random() < 0.5 ? 0.3 : -0.3),
      };

      const moveForward = Math.random() < 0.7;
      const jump = Math.random() < 0.3;

      client.write("player_auth_input", {
        position: pos,
        motion: { x: 0, y: 0, z: 0 },
        pitch: 0,
        yaw: Math.random() * 360,
        input_data: {
          ascend: false,
          descend: false,
          north_jump: moveForward,
          jump_down: jump,
        },
        input_mode: 0,
        play_mode: 0,
        tick,
        delta: { x: 0, y: 0, z: 0 },
      });

      console.log("🏃 Movimiento AntiAFK enviado:", moveForward ? "adelante" : "quieto");
    }, 5000); // cada 5 segundos
  });
}