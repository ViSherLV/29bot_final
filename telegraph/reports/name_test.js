const { BaseScene: Scene } = require('telegraf');
const keyboards = require("./keyboards");
const { Stage } = require('telegraf');

const stage = new Stage();
const getPatientName = new Scene('getPatientName');
stage.register(getPatientName);
const confirmPatientName = new Scene("confirmPatientName");
stage.register(confirmPatientName);
getPatientName.on("text", async ctx => {
    ctx.session.patientName = ctx.message.text;
    await ctx.reply(`Ім'я та фамілія пацієнта  - ${ctx.message.text}, вірно ?`, keyboards.confirmKeyboard);
    await ctx.scene.enter("confirmPatientName");
});
confirmPatientName.on("text", async (ctx)=>{
    if(ctx.message.text=="Так, все вірно"){
        ctx.reply("Тепер вкажіть вік пацієнта");
        ctx.scene.enter("getPatientAge");
    }else if(ctx.message.text == "Ні, хочу ввести повторно"){

        await ctx.reply("Вкажіть ім'я та фамілію пацієнта");
        await ctx.scene.enter('getPatientName');
    }
});
module.exports = confirmPatientName;