const { Card } = require('../card');
const { util, log } = require('../helpers');
const { messageTypes, callbackQueryType, chatBotAPI, cardStatus } = require('../helpers/enums');
const { Responder: { findTelegramUser } } = require('../mongo/methods');

function generateNewCard(card) {
  const keyboard = [
    [
      { text: cardStatus.accepted.name, callback_data: `${callbackQueryType.status.card.choose}_${cardStatus.accepted.value}_${card.id}` },
      { text: cardStatus.rejected.name, callback_data: `${callbackQueryType.status.card.choose}_${cardStatus.rejected.value}_${card.id}` },
    ], [
      { text: cardStatus.arrived.name, callback_data: `${callbackQueryType.status.card.choose}_${cardStatus.arrived.value}_${card.id}` },
      { text: cardStatus.finished.name, callback_data: `${callbackQueryType.status.card.choose}_${cardStatus.finished.value}_${card.id}_${card.patient.name}` },
    ]
  ];
  if (card.location.callAddress.latitude && card.location.callAddress.longitude) {
    keyboard.push([
      {
        text: 'Показати на карті',
        callback_data: `${callbackQueryType.status.card.showOnMap}_${card.location.callAddress.latitude.replace(',', '.')}|${card.location.callAddress.longitude.replace(',', '.')}`
      },
    ]);
  }
  return {
    type: messageTypes.withKeyboard,
    text: card.get(),
    parse_mode: 'Markdown',
    // latitude: card.location.callAddress.latitude.replace(',', '.'),
    // longitude: card.location.callAddress.longitude.replace(',', '.'),
    reply_markup: JSON.stringify({ inline_keyboard: keyboard })
  }
}


module.exports = bot => async function (req, res) {
  const {
    ChatBotCall: {
      responder_id: responderId,
      call_priority,
      call_card_id,
      region,
      caller_number,
      start_datetime,
      patient,
      complain,
      call_address,
      call_comment
    }
  } = req.body;

  const card = new Card(
    call_card_id,
    region,
    call_address,
    caller_number,
    start_datetime,
    patient,
    complain,
    call_priority,
    call_comment
  );

  const userProfile = await findTelegramUser(responderId);
  if (!userProfile) {
    return res.status(400).send({ message: `Not found chatId for responderId: ${responderId}` });
  }
  const messsage = generateNewCard(card);
  const params = chatBotAPI.callStatusUrl(responderId, 'Sent', call_card_id, userProfile.status);
  await util.request({ isInternal: true, ...params });
  bot.sendMessage(userProfile.chatId, messsage).
    then(data => { // return sended message
      res.status(200).send({ message: 'done' });
      const params = chatBotAPI.callStatusUrl(responderId, 'Delivered', call_card_id);
      return util.request({ isInternal: true, ...params });
    })
    .catch(err => {
      log.error(`[error][event:create-card][method:send-message] ${err.toString()}`);
      if (err.error.error_code == 400) {
        return res.status(400).send({ message: err.error.description, code: 1 });
      }
      res.status(500).send({ message: 'internal server error', code: 0 });
    });
}