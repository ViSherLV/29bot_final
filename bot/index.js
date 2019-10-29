// const Telegraf = require("telegraf");
const { TelegrafBot } = require("./logic");
const Markup = require("telegraf/markup");
const reportFlow = require("./reports");
const { log } = require("../helpers");
const { session } = Telegraf;
const keyboards = require("./reports/keyboards");

module.exports.setup = async function(app) {
  const bot = new TelegrafBot(process.env.telegramBotToken);
  let id = 974382806;

  await app.use(bot.api.webhookCallback("/telegraf"));
  await bot.telegram.setWebhook(`${process.env.HOST_URL_LOCAL}/telegraf`);
  await bot.api.use(session());

  reportFlow && bot.api.use(reportFlow().middleware());
  await app.post("/telegraf/reports", async (req, res) => {
    id = Number(req.body.responderId);
    await bot.telegram.sendMessage(
      id,
      "Вітаємо вас в формі вводу даних пацієнта, давайте почнемо",
      {
        reply_markup: {
          keyboard: [["Розпочати заповнення форми"]]
        }
      }
    );
    res.sendStatus(200);
  });

  bot.api.on("message", async ctx => {
    if (ctx.message.text == "Розпочати заповнення форми") {
      await ctx.reply(
        "Вкажіть ім'я і фамілію пацієнта",
        Markup.removeKeyboard().extra()
      );
      await ctx.scene.enter("getPatientName");
    }
    console.log(ctx.message.text);
    console.log("выше текст");
  });

  // bot.launch();
  return bot.api;
};

module.exports = { setup };

// const assert = require('assert');
// const { checkWebhook, setWebhook, verification } = require('./helper');
// const getRouter = require('./router');
// const { TelegramBot } = require('./logic');
// const { log } = require('../helpers');

// async function setup(app, { token, webhook }) {
//   assert(token != null);
//   assert(webhook != null);
//   log.info(`webhook ${webhook}`);
//   // const telegramBot = new TelegramBot(token);
//   // app.use(getRouter(telegramBot));

//   const result = {};
//   result.verification = await verification(token);
//   log.info(JSON.stringify(result.verification));
//   if (!result.verification) {
//     throw new Error(`Telegram bot with token: ${token} is not verify`);
//   }
//   result.setWebhook = await checkWebhook(token)
//     .then(res => {
//       log.info(JSON.stringify(res));
//       const { result: { url: oldUrl } } = res;
//       if (oldUrl != webhook) {
//         return setWebhook({ token, url: webhook });
//       }
//     });
//     log.info(result.setWebhook);

//   return {  };
// }

// module.exports = { setup }
