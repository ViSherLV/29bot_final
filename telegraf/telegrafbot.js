const Telegraf = require("telegraf");

module.exports = async app => {
  const bot = new Telegraf(process.env.telegramBotToken);
  app.use(bot.webhookCallback("/telegraf"));
  // bot.telegram.setWebhook('https://9c617b3f.ngrok.io/telegraf').catch(err=>console.log(err));

  bot.start(ctx => ctx.reply("Welcome!"));
  bot.help(ctx => ctx.reply("Send me a sticker"));
  bot.on("text", ({ reply }) => reply("Hello"));
  bot.launch();
};
