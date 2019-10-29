const { util, PromiseProgerss } = require('../../helpers');
const { callbackQueryType, messageTypes, cardStatus, responderStatus } = require('../../helpers/enums');

module.exports = {
  action: {
    [callbackQueryType.status.card.showOnMap]: ({ userChatId, value }) => {
      return new PromiseProgerss(async (resolve, reject, progress) => {
        const [latitude, longitude] = value[0].split('|');
        resolve({
          toStart: false,
          message: {
            latitude,
            longitude,
            type: messageTypes.location,
            chat_id: userChatId,
          }
        });
      })
    }
  }
}