// Import server startup through a single index entry point

import './register-api.js';
import './fixtures.js';
import './routes.js';

import { EmailsCollection } from '../../api/emails/emails';

/*


Meteor.autorun(() => {
      console.log('autorun');

      const nodemailer = require('nodemailer');
      let Future = require('fibers/future');

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
         from: 'staticvoidmain14345@gmail.com',
         to: 'staticvoidmain14345@gmail.com',
         subject: 'Power MMS credits',
         text: 'lasdfjjjjjjjjjjjjjjjjjjjjjjjjjjjjjasdlfkjasdlfkajsdflaksdjfljk',
         html: '',
         // attachments: arrFiles
      };

      transporter.sendMail(mailOptions, Meteor.bindEnvironment((error, info) => {
         let result = {};
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

});
*/
