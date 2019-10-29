const { BaseScene: Scene } = require('telegraf');
const keyboards = require("./keyboards");

module.exports = (stage) => {
    const getPatientResult = new Scene("getPatientResult");
    stage.register(getPatientResult);
    const confirmPatientResult = new Scene("confirmPatientResult");
    stage.register(confirmPatientResult);

    getPatientResult.on("text", async (ctx)=>{
        ctx.session.patientResult = ctx.message.text;
        await ctx.reply(`Результат наданої допомоги  - ${ctx.message.text}, вірно ?`,keyboards.confirmKeyboard);
        await ctx.scene.enter("confirmPatientResult");
    });
    confirmPatientResult.on("text", async (ctx)=>{

        if(ctx.message.text == "Так, все вірно"){
            await ctx.reply(`Дякуємо, опитування завершено!\nОтримані дані:\nІм'я пацієнта: ${ctx.session.patientName}\nВік пацієнта: ${ctx.session.patientAge}\nСтать пацієнта: ${ctx.session.patientGender}\nВага пацієнта: ${ctx.session.patientWeight}\nДіагноз: ${ctx.session.patientDiagnosis}\nНадана допомога: ${ctx.session.patientHelp}\nРезультат: ${ctx.session.patientResult}\n\nВсе вірно?
                         
         `,keyboards.confirmKeyboard)
            let result = {patientName,
                patientGender,
                patientWeight,
                patientDiagnosis,
                patientHelp,
                patientHelp,
                patientResult} = ctx.session;
            console.log(result);
            await ctx.scene.enter("confirmAll");

        }else if(ctx.message.text == "Ні, хочу ввести повторно"){
            await ctx.reply("Вкажіть результат наданої допомоги");
            await ctx.scene.enter("getPatientResult");
        }
    });
};
