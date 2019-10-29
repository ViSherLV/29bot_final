const assert = require('assert');
const { checkWebhook, setWebhook, verification } = require('./helper');
const getRouter = require('./router');
const { TelegramBot } = require('./logic');
const { log } = require('../helpers');

async function setup(app, { token, webhook }) {
  assert(token != null);
  assert(webhook != null);
  log.info(`webhook ${webhook}`);
  // const telegramBot = new TelegramBot(token);
  // app.use(getRouter(telegramBot));

  const result = {};
  result.verification = await verification(token);
  log.info(JSON.stringify(result.verification));
  if (!result.verification) {
    throw new Error(`Telegram bot with token: ${token} is not verify`);
  }
  result.setWebhook = await checkWebhook(token)
    .then(res => {
      log.info(JSON.stringify(res));
      const { result: { url: oldUrl } } = res;
      if (oldUrl != webhook) {
        return setWebhook({ token, url: webhook });
      }
    });
    log.info(result.setWebhook);

  return {  };
}

module.exports = { setup }