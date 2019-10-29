const { BaseScene: Scene } = require('telegraf');
const keyboards = require("./keyboards");
const Markup = require('telegraf/markup');

module.exports = (stage) =>{
    const start = new Scene('start');
    stage.register(start);

    start.on("text", ctx => {
    if(ctx.message.text=="Розочати заповнення форми"){
        ctx.reply("Вкажіть ім'я і фамілію пацієнта",Markup.removeKeyboard().extra());
        ctx.scene.enter('getPatientName')}
});
}