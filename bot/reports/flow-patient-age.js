const { BaseScene: Scene } = require('telegraf');
const keyboards = require("./keyboards");

module.exports = (stage) => {
    const getPatientAge = new Scene("getPatientAge");
    stage.register(getPatientAge);
    const confirmPatientAge = new Scene("confirmPatientAge");
    stage.register(confirmPatientAge);

    getPatientAge.on("text", async (ctx)=>{
        ctx.session.patientAge = ctx.message.text;
        await ctx.reply(`Вік пацієнта  - ${ctx.message.text}, вірно ?`,keyboards.confirmKeyboard);
        await ctx.scene.enter("confirmPatientAge");

    });

    confirmPatientAge.on("text", async(ctx)=>{
        if(ctx.message.text == "Так, все вірно"){
            await ctx.reply("Тепер вкажіть стать пацієнта",keyboards.getPatientGenderKeyboard);
            await ctx.scene.enter("getPatientGender");
        }else if(ctx.message.text == "Ні, хочу ввести повторно"){
            await ctx.reply("Вкажіть вік пацієнта");
            await ctx.scene.enter("getPatientAge");
        }
    });
};
