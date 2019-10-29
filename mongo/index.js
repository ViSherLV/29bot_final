const mongoose = require('mongoose');
const { log } = require('../helpers');

module.exports.connectToMongo = async function (
  uri = process.env.MONGODB_URI,
  options = { ssl: true, poolSize: 2, useNewUrlParser: false },
) {
  log.info(`[mongo][connect] db name ${process.env.DATABASE_NAME} mongo url ${uri}`);
  await mongoose.connect(uri, options);
}