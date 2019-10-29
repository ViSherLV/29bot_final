const Telegraf = require('telegraf');
const reportFlow = require('./reports');
var bodyParser = require('body-parser');
const { session } = Telegraf;
module.exports = async  function (app,bot) {
    await app.use(bot.webhookCallback("/telegraf"));
    await bot.telegram.setWebhook(`${process.env.HOST_URL_LOCAL}/telegraf`);
    await bot.use(session());
    await app.use(bodyParser.json());
    await reportFlow && bot.use(reportFlow().middleware());

}