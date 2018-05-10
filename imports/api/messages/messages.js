import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const MessagesCollection = new Mongo.Collection('messages');

if (Meteor.isServer) {

   Meteor.methods({
      'messages.insert'({ body, from, to, direction, conversationId }) {
         check('conversationId', String);
         return MessagesCollection.insert({
            body,
            from,
            to,
            direction,
            conversationId,
            date: new Date()
         });
      },

      sendMessage: function({messageBody, agentNumber, To}){
         return HTTP.call(
            'POST',
            `https://api.twilio.com/2010-04-01/Accounts/${Meteor.settings.twilio.accountSid}
               /SMS/Messages.json`, {
               params: {
                  From: agentNumber,
                  To,
                  Body: messageBody
               },
               auth:
               `${Meteor.settings.twilio.accountSid}:
                ${Meteor.settings.twilio.authToken}`
            }
         );
      },

      'messages.insertBulk'(messages) {
         messages.forEach((message) => {
            let body = message.body;
            let from = message.from;
            let to = message.to;
            let direction = message.direction;
            let conversationId = message.conversationId;

            MessagesCollection.insert({
               body, from, to, direction, conversationId, date: new Date()
            });
            console.log('messages inserted');
         });
         return true;
      }


   }); //end of methods

   Meteor.publish('messages.all', () => MessagesCollection.find());
   Meteor.publish('messages.convoId', (convoId, limit=10) =>
      MessagesCollection.find({ conversationId: convoId }, {limit})
   );

}