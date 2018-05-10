import { Meteor } from 'meteor/meteor';
import bodyParser from 'body-parser';
import multer from 'multer';

import { MessagesCollection } from '../../api/messages/messages';
import { ConversationsCollection } from '../../api/conversations/conversations';

// Picker.middleware(multer().any());
Picker.middleware(bodyParser.json());
Picker.middleware(bodyParser.urlencoded({ extended: false }));

let affixResponse = function (instance, statusCode, headers, body) {
   if (instance) {
      instance.statusCode = statusCode;
      for (let head in headers) {
         instance.setHeader(head, headers[head]);
      }
      instance.end(body);
   }
};

let insertInboundMessageToDb = function (body) {
   let convoID = 'not set';

   let convo = ConversationsCollection.findOne({ convoWith: body.From, agentNumber: body.To });
   if (convo) {            //If therss an existing convo from the sender, just insert the message
      console.log(convo);   // with the selected convoId
      convoID = convo._id;

      MessagesCollection.insert({
         body: body.Body,
         date: new Date(),
         from: body.From,
         to: body.To,
         direction: 'inbound',
         messageSid: body.MessageSid,
         conversationId: convo._id
      });
   } else {                                     //theres no existing convo so
      console.log('no existing conversation');  //create new conversation
                                                //then insert the convo ID to message(conversationID)

      Meteor.call('conversations.insert', {convoWith: body.From, agentNumber: body.To}, (error, convoId) => {
         console.log(`new conversation collection: ${convoId}`);
         console.log(`sending number to: ${body.To}`);

         convoID = convoId

         MessagesCollection.insert({
            body: body.Body,
            date: new Date(),
            from: body.From,
            to: body.To,
            direction: 'inbound',
            messageSid: body.MessageSid,
            conversationId: convoId
         });
      });
   }
}
Meteor.startup(() => {
   Picker.route('/sms', function (params, request, response, next) {
      let body = {};
      switch (request.method) {
         case 'POST':
            body = request.body;
            break;
         case 'GET':
            body = params.query;
            break;
      }

      affixResponse(response, 200, { 'Content-Type': 'application/json' }, JSON.stringify(body));

      if (request.headers.host !== 'localhost:3000') {

         let convoID = 'not set';

         let convo = Conversations.findOne({ convoWith: body.From }); //should be from
         if (convo) {
            console.log(convo);
            convoID = convo._id;

            Messages.insert({
               body: body.Body,
               date: new Date(),
               from: body.From,
               to: body.To,
               direction: 'inbound',
               messageSid: body.MessageSid,
               conversationId: convo._id
            });
         } else {
            console.log('no existing conversation');
            console.log(`sending number to: ${body.To}`);

            Meteor.call('conversations.insert', body.From, (error, convoId) => {
               console.log(`new conversation collection: ${convoId}`);
               console.log(`sending number to: ${body.To}`);

               convoID = convoId

               Messages.insert({
                  body: body.Body,
                  date: new Date(),
                  from: body.From,
                  to: body.To,
                  direction: 'inbound',
                  messageSid: body.MessageSid,
                  conversationId: convoId
               });
            });
         }

         console.log(`message Id insert: ${insert}`);

         console.log(JSON.stringify(body));

      }
      else {


         insertInboundMessageToDb(body);
      }
   });


   Picker.route('/voice', function(params, request, response, next){
      const VoiceResponse = require('twilio').twiml.VoiceResponse;
     

      const twiml = new VoiceResponse();
      twiml.redirect('/pickup');


      // const gather = twiml.gather({
      //    numDigits: 1,
      //    timeout: 30,
      //    action: '/gather',
      // });
      // gather.say('Hello. Good day! Please press 3 to speak to an agent.');
      //
      // twiml.say('You did not press any key. Goodbye');

      affixResponse(response, 200, { 'Content-Type': 'application/xml' }, twiml.toString());


   });

   Picker.route('/gather', function (params, request, response, next) {
      const VoiceResponse = require('twilio').twiml.VoiceResponse;

      const twiml = new VoiceResponse();
      if (request.body.Digits) {
         switch (request.body.Digits) {
            case '3':
               twiml.redirect('/pickup');
               break;
            default:
               twiml.say('Please wait for 30 seconds');
               twiml.play('http://3563af45.ngrok.io/classic.mp3');
               // twiml.play('https://demo.twilio.com/docs/classic.mp3');
               // twiml.play('https://drive.google.com/file/d/1aE2YfoNNUr8D7MnHj4sC4tBgSaJuNJ0S/view');
               // twiml.play('http://localhost:3000/classic.mp3');
               break;
         }
      } else {
         // twiml.redirect('/voice');
         // twiml.say('You did not press any key. Goodbye');
      }

      affixResponse(response, 200, { 'Content-Type': 'application/xml' },
         twiml.toString());
   });


   Picker.route('/pickup', function (params, request, response, next) {
      const VoiceResponse = require('twilio').twiml.VoiceResponse;
      const twiml = new VoiceResponse();


      const dial = twiml.dial();
      dial.client('denver');


      console.log(twiml.toString());

      affixResponse(response, 200, { 'Content-Type': 'application/xml' },
         twiml.toString());
   });

   Picker.route('/playback', function (params, request, response, next) {
      const VoiceResponse = require('twilio').twiml.VoiceResponse;
      const twiml = new VoiceResponse();

      const gather = twiml.gather({
         numDigits: 1,
         timeout: 2,
         action: '/voice',
      });
      gather.play('https://demo.twilio.com/docs/classic.mp3');

      console.log(twiml.toString());
      affixResponse(response, 200, { 'Content-Type': 'application/xml' },
         twiml.toString());
   });


   Picker.route('/token', function (params, request, response, next) {
      const accountSid = Meteor.settings.twilio.accountSid;
      const authToken = Meteor.settings.twilio.authToken;

      const ClientCapability = require('twilio').jwt.ClientCapability;

      const capability = new ClientCapability({
         accountSid: accountSid,
         authToken: authToken,
      });

      capability.addScope(new ClientCapability.IncomingClientScope('denver'));
      const token = capability.toJwt();

      affixResponse(response, 200, { 'Content-Type': 'application/jwt' },
         token);
   });
});

