const { BaseScene: Scene } = require('telegraf');
const keyboards = require("./keyboards");

module.exports = (stage) => {
    const getPatientGender = new Scene("getPatientGender");
    stage.register(getPatientGender);
    const confirmPatientGender = new Scene("confirmPatientGender");
    stage.register(confirmPatientGender);

    getPatientGender.on("text", async (ctx)=>{
        ctx.session.patientGender = ctx.message.text;
        await ctx.reply(`Стать пацієнта - ${ctx.message.text}, вірно ?`,keyboards.confirmKeyboard);
        await ctx.scene.enter("confirmPatientGender");

    });

    confirmPatientGender.on("text", async(ctx)=>{
        if(ctx.message.text == "Так, все вірно"){
            await ctx.reply("Тепер вкажіть приблизну вагу пацієнта");
            await ctx.scene.enter("getPatientWeight");
        }else if(ctx.message.text == "Ні, хочу ввести повторно"){
            await ctx.reply("Вкажіть стать пацієнта",keyboards.getPatientGenderKeyboard);
            await ctx.scene.enter("getPatientGender");
        }
    });

};
