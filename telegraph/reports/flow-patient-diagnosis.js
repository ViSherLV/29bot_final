const { BaseScene: Scene } = require('telegraf');
const keyboards = require("./keyboards");

module.exports = (stage) => {
    const getPatientDiagnosis = new Scene("getPatientDiagnosis");
    stage.register(getPatientDiagnosis);
    const confirmPatientDiagnosis = new Scene("confirmPatientDiagnosis");
    stage.register(confirmPatientDiagnosis);

    getPatientDiagnosis.on("text", async (ctx)=>{
        ctx.session.patientDiagnosis = ctx.message.text;
        await ctx.reply(`Діагноз пацієнта  - ${ctx.message.text}, вірно ?`,keyboards.confirmKeyboard);
        await ctx.scene.enter("confirmPatientDiagnosis");
    })
    confirmPatientDiagnosis.on("text", async (ctx)=>{
        if(ctx.message.text == "Так, все вірно"){
            await ctx.reply("Тепер вкажіть надану пацієнту допомогу");
            await ctx.scene.enter("getPatientHelp");

        }else if(ctx.message.text == "Ні, хочу ввести повторно"){
            await ctx.reply("Вкажіть діагноз пацієнта");
            await ctx.scene.enter("getPatientDiagnosis");
        }
    });

};
