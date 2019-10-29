const { BaseScene: Scene } = require('telegraf');
const keyboards = require("./keyboards");

module.exports = (stage) => {
    const getPatientWeight = new Scene("getPatientWeight");
    stage.register(getPatientWeight);
    const confirmPatientWeight = new Scene("confirmPatientWeight");
    stage.register(confirmPatientWeight);

    getPatientWeight.on("text", async (ctx)=>{
        ctx.session.patientWeight = ctx.message.text;
        await ctx.reply(`Вага пацієнта  - ${ctx.message.text}, вірно ?`,keyboards.confirmKeyboard);
        await ctx.scene.enter("confirmPatientWeight");
    })
    confirmPatientWeight.on("text", async (ctx)=>{
        if(ctx.message.text == "Так, все вірно"){
            await ctx.reply("Тепер введіть діагноз пацієнта");
            await ctx.scene.enter("getPatientDiagnosis");
        }else if(ctx.message.text == "Ні, хочу ввести повторно"){
            await ctx.reply("Вкажіть вагу пацієнта");
            await ctx.scene.enter("getPatientWeight");
        }
    });
};
