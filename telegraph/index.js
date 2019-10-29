const Telegraf = require('telegraf');
const { session } = Telegraf;
const reportFlow = require('./reports');
module.exports.setup = async function (app) {

    const bot = new Telegraf(process.env.telegramBotToken);
    await app.use(bot.webhookCallback("/telegraf"));
    await bot.use(session());
    await reportFlow && bot.use(reportFlow().middleware());
    return bot;

};