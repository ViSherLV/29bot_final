const { BaseScene: Scene } = require('telegraf');
const keyboards = require("./keyboards");

module.exports = (stage) => {
  const getPatientHelp = new Scene("getPatientHelp");
  stage.register(getPatientHelp);
  const confirmPatientHelp = new Scene("confirmPatientHelp");
  stage.register(confirmPatientHelp);

  getPatientHelp.on("text", async (ctx)=>{
      ctx.session.patientHelp = ctx.message.text;
      await ctx.reply(`Надана пацієнтові допомога  - ${ctx.message.text}, вірно ?`,keyboards.confirmKeyboard);
      await ctx.scene.enter("confirmPatientHelp");
  })
  confirmPatientHelp.on("text", async (ctx)=>{
      if(ctx.message.text == "Так, все вірно"){
          await ctx.reply("Тепер вкажіть результат наданої допомоги");
          await ctx.scene.enter("getPatientResult");

      }else if(ctx.message.text == "Ні, хочу ввести повторно"){
          await ctx.reply("Вкажіть допомогу надану пацієнту");
          await ctx.scene.enter("getPatientHelp");
      }
  });
};
