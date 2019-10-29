const Markup = require('telegraf/markup');
const {getChatIdFromBody} = require("../helpers/enums");
const { Responder: { findResponder } } = require('../mongo/methods');
let id = "";
const { Responder: { findTelegramUser } } = require('../mongo/methods');
module.exports = (bot)=>{
    return async (req,res)=>{
const responderId =req.body.Report.responder_id;
        const userProfile = await findTelegramUser(responderId);
        userProfile.chatId
        id = userProfile.chatId
        findResponder(id)
            .then( async data => {
                if (data) {
                    await bot.telegram.sendMessage(id,'Вітаємо вас в формі вводу даних пацієнта, давайте почнемо',{
                        reply_markup:{
                            keyboard:[
                                ["Розпочати заповнення форми"]
                            ]
                        }
                    });
                    await bot.on("message",async ctx=>{
                        if(ctx.message.text=="Розпочати заповнення форми"){
                            console.log(ctx.message.chat.id)
                            await ctx.reply("Вкажіть ім'я і фамілію пацієнта",Markup.removeKeyboard().extra());
                            await ctx.scene.enter('getPatientName')}
                    });
                    await res.send(`Респондера з chatId ${id} знайдено, форму запиту даних відправлено!`)


                } else {
                    res.status(400).send({ message: `Responder with chatId ${id} doesn\`t exist`});
                }
            }).catch(function (err) {
            console.log(err)

        })
    }
    return bot;
}