const { BaseScene: Scene } = require('telegraf');
const Markup = require('telegraf/markup');
const {sendReport} = require("../../mongo/methods/reports");
module.exports = (stage) => {
    const confirmAll = new Scene("confirmAll");
    stage.register(confirmAll)
    confirmAll.on("text", async(ctx)=>{
        if(ctx.message.text == "Так, все вірно"){

            ctx.session.callcardId ="ER-2019-06-02-000044"
            id = ctx.message.chat.id; 
            await sendReport(id,
                ctx.session.patientName,
                ctx.session.patientAge,
                ctx.session.patientGender,
                ctx.session.patientWeight,
                ctx.session.patientDiagnosis,
                ctx.session.patientHelp,
                ctx.session.patientResult,
                ctx.session.callcardId);
                ctx.session.patientResult;
            await ctx.reply("Дякуємо, дані було відправлено",Markup.removeKeyboard().extra());

            await ctx.scene.leave()
        }else if(ctx.message.text=="Ні, хочу ввести повторно"){
            await ctx.reply("Вкажіть ім'я пацієнта");
            await ctx.scene.enter("getPatientName");
        }
    })
};
