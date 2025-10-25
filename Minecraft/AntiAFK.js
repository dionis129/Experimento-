export default function startAntiAFK(bot) {
  console.log("🛡️ AntiAFK activado: el bot se moverá y saltará.");

  setInterval(() => {
    bot.setControlState("forward", true);
    if (Math.random() < 0.4) bot.setControlState("jump", true);

    setTimeout(() => {
      bot.setControlState("forward", false);
      bot.setControlState("jump", false);
    }, 1500);

    bot.look(Math.random() * Math.PI * 2, 0, true);
  }, 6000);
}