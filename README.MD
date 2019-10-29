#

## Telegram message

### Strucutre
1. Simple message
```
{
  "update_id": Number,
  "message": {
    "message_id": Number,
    "from": {
      "id": Number,
      "is_bot": Boolean,
      "first_name": String,
      "last_name": String,
      "language_code": String
    },
    "chat": {
      "id": Number,
      "first_name": String,
      "last_name": String,
      "type": "private"
    },
    "date": Number,
    "text": String
  }
}
```
userChatId = message.from.id;
2. Callback query
```
{
  "update_id": 339346124,
  "callback_query": {
    "id": "2205959479657822337",
    "from": {
      "id": 513614965,
      "is_bot": false,
      "first_name": "Mykola",
      "last_name": "Jakowlew",
      "language_code": "uk"
    },
    "message": {
      "message_id": 61,
      "from": {
        "id": 828213148,
        "is_bot": true,
        "first_name": "ChatBot103_Test",
        "username": "ChatBot103_bot"
      },
      "chat": {
        "id": 513614965,
        "first_name": "Mykola",
        "last_name": "Jakowlew",
        "type": "private"
      },
      "date": 1563116513,
      "text": "Виклик зроблено:...",
      "reply_markup": {
        "inline_keyboard": [
          [
            {
              "text": "text-1",
              "callback_data": "ER-2019-06-02-000044"
            },
            {
              "text": "text-2",
              "callback_data": "ER-2019-06-02-000044A"
            }
          ]
        ]
      }
    },
    "chat_instance": "-5800819825719693292",
    "data": "ER-2019-06-02-000044"
  }
}
```

userChatId = callback_query.from.id
callBackData = callback_query.data