const { Markup } = require('telegraf');

const startKeyboard = Markup
    .keyboard(['Розочати заповнення форми'])
    .oneTime()
    .resize()
    .extra();

const confirmKeyboard = Markup
    .keyboard([
        ["Так, все вірно"], ["Ні, хочу ввести повторно"],
    ])
    .oneTime()
    .resize()
    .extra();

const getPatientGenderKeyboard = Markup
    .keyboard(["Чоловіча", "Жіноча"])
    .oneTime()
    .resize()
    .extra();

module.exports = { confirmKeyboard, getPatientGenderKeyboard, startKeyboard };
