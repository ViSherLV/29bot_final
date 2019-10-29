const { BaseScene: Scene } = require('telegraf');
const keyboards = require("./keyboards");
const Markup = require('telegraf/markup');
module.exports = (stage) => {
    const confirmAll = new Scene("confirmAll");
    stage.register(confirmAll)
    confirmAll.on("text", async(ctx)=>{
        if(ctx.message.text == "Так, все вірно"){

            await ctx.reply("Дякуємо, дані було відправлено",Markup.removeKeyboard().extra());

            await ctx.scene.leave()
        }else if(ctx.message.text=="Ні, хочу ввести повторно"){
            await ctx.reply("Вкажіть ім'я пацієнта");
            await ctx.scene.enter("getPatientName");
        }
    })
};
