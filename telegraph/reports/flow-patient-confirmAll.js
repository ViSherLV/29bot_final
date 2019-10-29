const { BaseScene: Scene } = require('telegraf');
const Markup = require('telegraf/markup');
const {sendReport} = require("../../mongo/methods/reports");
const req = require("request");
const { util: { request } } = require('../../helpers');
module.exports = (stage) => {
    const confirmAll = new Scene("confirmAll");
    stage.register(confirmAll);
    confirmAll.on("text", async(ctx)=>{
        if(ctx.message.text == "Так, все вірно"){



            id = ctx.message.chat.id; 
            await sendReport(id,
                ctx.session.patientName,
                ctx.session.patientAge,
                ctx.session.patientGender,
                ctx.session.patientWeight,
                ctx.session.patientDiagnosis,
                ctx.session.patientHelp,
                ctx.session.patientHelpComment,
                ctx.session.patientResult,
                ctx.session.callcardId
            );
            const myModule= require("../../api/reports");
            const secret= myModule.secret;
            const callCardId = myModule.callCardId;
            const messageDate = ctx.message.date;
            function formatDateTime(input){
                var epoch = new Date(0);
                epoch.setSeconds(parseInt(input));
                var date = epoch.toISOString();
                date = date.replace('T', ' ');
                return date.split('.')[0].split(' ')[0] + ' ' + epoch.toLocaleTimeString().split(' ')[0];
            };

            const time = formatDateTime(messageDate);
            //const uri = `https://chatbot.central103.org/api/responder/${responderId}/`
            const uri = "https://chatbot.central103.org/api/responder/FR-30-000001/"
            const Report ={
                secret: secret,
                Report: {
                    call_card_id: callCardId,
                    event_datetime: time,
                    patient: {
                        first_name: ctx.session.patientName,
                        family_name: "#",
                        middle_name: "#",
                        age: ctx.session.patientAge,
                        sex: ctx.session.patientGender
                    },
                    diagnosis: ctx.session.patientDiagnosis,
                    help_provided: ctx.session.patientHelp,
                    help_comment: ctx.session.patientHelpComment,
                    er_result: ctx.session.patientResult,
                    complain: "#"
                }
            };
            const ReportJSON = JSON.stringify(Report);
            console.log(ReportJSON);
            const result = await request({uri,method:'PUT'});
            if (result.statusCode != 200) {
                    console.log(result.statusCode)
                    console.log("error")

            }else {
                console.log(`Запит принйятор, код відповіді: ${result.statusCode}`)
            }
            await ctx.reply("Дякуємо, дані було відправлено",Markup.removeKeyboard().extra());



            await ctx.scene.leave()
        }else if(ctx.message.text=="Ні, хочу ввести повторно"){
            await ctx.reply("Вкажіть ім'я пацієнта");
            await ctx.scene.enter("getPatientName");
        }
    })
};
