import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const EmailsCollection = new Mongo.Collection('emails');

if (Meteor.isServer) {

   Meteor.methods({
      'email.send'({to,from,htmlEmailBody}){
         const nodemailer = require('nodemailer');
         let success ;
         let result = {};

         // let Future = require('fibers/future');

         let smtpConfig = {
            host: Meteor.settings.smtp.host,
            port: Meteor.settings.smtp.port,
            secure: false,
            auth: {
               user: Meteor.settings.smtp.username,
               pass: Meteor.settings.smtp.password,
            },
            tls: {
               rejectUnauthorized: false
            }
         };
         let transporter = nodemailer.createTransport(smtpConfig);

         let mailOptions = {
            from,
            to,
            subject: 'Txt Console',
            text: '',
            html: htmlEmailBody,
            // attachments: arrFiles
         };

         transporter.sendMail(mailOptions, Meteor.bindEnvironment(function (error, info){

            if (error && error !== null) {
               result.error = error;
            } else {
               EmailsCollection.insert({
                  from: 'denver',
                  date: new Date(),
                  localDate: new Date(),
                  'message-id': info.messageId,
                  plain: '',
                  html: 'denver',
                  // attachments: arrFiles,
                  subject: 'Power MMS credits',
                  read: true,
                  eadd: 'staticvoidmain14345@gmail.com',
                  to: 'staticvoidmain14345@gmail.com',
                  createdAt: new Date()
               });
               result.status = 200;
               result.id = info.messageId;
               result.response = info.response;
            }
            console.log('result', result);
         }));
         return result;
      }
   }); //end of methods



}