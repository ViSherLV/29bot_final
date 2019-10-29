module.exports.serverEvent = {
  serverOnline: 'server online',
  serviceOnline: 'service online',
  mongo: {
    connected: 'mongo connected',
    error: 'mongo error',
  },
};

module.exports.messageTypes = {
  simpleMessage: 'simpleMessage',
  withKeyboard: 'withKeyboard',
  location: 'location'
};

module.exports.callbackQueryType = {
  status: {
    responder: {
      set: 'set responder status',
      choose: 'choose responder status'
    },
    card: {
      choose: 'choose card status',
      showOnMap: 'card show on map',
    }
  },
};

module.exports.telegramMessageTypes = {
  message: 'message',
  callback_query: 'callback_query'
};

module.exports.telegramMessageHandlers = {
  message: {
    getUserChatId: (pack) => pack.message.from.id,
    getText: (pack) => pack.message.text,
  },
  callback_query: {
    getUserChatId: (pack) => pack.callback_query.from.id,
    getQuery: (pack) => pack.callback_query.data,
  },
}

module.exports.responderStatus = { ready: 'Ready', busy: 'Busy', offduty: 'Offduty' }

module.exports.cardStatus = {
  accepted: { name: 'Прийнято', value: 'Accepted' },
  arrived: { name: 'На місці', value: 'Arrived' },
  finished: { name: 'Завершено', value: 'Finished' },
  rejected: { name: 'Відхилено', value: 'Rejected' },
}

module.exports.chatBotAPI = {
  respondersStatusUrl: (responderId, status) => {
    return {
      method: 'PUT',
      uri: `${process.env.CHAT_BOT_URL}/api/responder/${responderId}/`,
      body: {
        Responder: { status }
      },
    };
  },
  callStatusUrl: (responderId, callStatus, callCardId, status) => {
    return {
      method: 'PUT',
      uri: `${process.env.CHAT_BOT_URL}/api/responder/${responderId}/`,
      body: {
        Responder: {
          status,
          call_card_id: callCardId,
          call_status: callStatus,
          event_datetime: new Date().toISOString().slice(0, -1)
        }
      }
    }
  }
}

module.exports.getChatIdFromBody = function (req) {
    id = Number(req.body.chatId);
    return id;


};
module.exports.getResponderIdFromBody = function (req) {
  responderId = req.body.responderId;
  return responderId;

}
