const express = require('express');
const { setEnv, eventListener } = require('./helpers');
const { logger } = require('./helpers/middleware');
const { serverEvent } = require('./helpers/enums');
const { connectToMongo } = require('./mongo');
const { log } = require('./helpers');
const { setup: telegrafSetup } = require('./telegraph');
const { setWebhook } = require('./bot/helper');
const APIRouter = require('./api');
const bodyParser = require('body-parser')

setEnv(process.env.envPath);


process.on('uncaughtException', (err) => {
    log.info(`[uncaughtException] ${JSON.stringify(err)}`, err);
    process.exit(0);
});

const app = express();

app.use(logger);

eventListener(app);

app.listen(process.env.port, async () => app.emit(serverEvent.serverOnline));
connectToMongo()
    .then(() => {
        app.emit(serverEvent.mongo.connected);
        return telegrafSetup (app);
    })
    .then((bot) => {
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true }));

        app.use(APIRouter(bot));
        app.emit(serverEvent.serviceOnline);


        return setWebhook({ token: process.env.telegramBotToken, url: `${process.env.HOST_URL_LOCAL}/telegraf` });
    })
    .catch(err => {
        log.error(`${err.toString()}`);
    })
  .then(() => {
    app.emit(serverEvent.mongo.connected);
    return telegrafSetup(app);
  })
  .then(() => {
    app.emit(serverEvent.serviceOnline);

  })
  .catch(err => {
    log.error(`${err.toString()}`);
  })

module.exports = app;


