const { BaseScene: Scene } = require('telegraf');
const keyboards = require("./keyboards");

module.exports = (stage) => {

    const getPatientHelpComment = new Scene("getPatientHelpComment");
    stage.register(getPatientHelpComment);
    const confirmPatientComment = new Scene("confirmPatientComment");
    stage.register(confirmPatientComment);

    getPatientHelpComment.on("text", async (ctx)=>{
        ctx.session.patientHelpComment = ctx.message.text;
        await ctx.reply(`Коментар до допомоги  - ${ctx.message.text}, вірно ?`,keyboards.confirmKeyboard);
        await ctx.scene.enter("confirmPatientComment");
    })
    confirmPatientComment.on("text", async (ctx)=>{
        if(ctx.message.text == "Так, все вірно"){
            await ctx.reply("Тепер вкажіть результат наданої допомоги");
            await ctx.scene.enter("getPatientResult");

        }else if(ctx.message.text == "Ні, хочу ввести повторно"){
            await ctx.reply("Вкажіть коментар до наданої допомоги");
            await ctx.scene.enter("getPatientHelpComment");
        }
    });
}