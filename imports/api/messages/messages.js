import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { ConversationsCollection } from '../conversations/conversations';
import { MESSAGE_DIRECTION} from '../Classes/Const';

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

      'sendMessage': function({messageBody, agentNumber, To}){
         let messageData =  HTTP.call(
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

         console.log(messageData);

         //para di na tayo mag call sa server ok>?
         let convo = ConversationsCollection.findOne({ convoWith: To });
         let convoId = 'default value';

         if(convo) {
            convoId = convo._id;
         }else{
            //need to get this newly inserted conversation ID
            convo = ConversationsCollection.insert({
               agentNumber,
               convoWith: To
            });
            convoId = convo
         }


         console.log(`TAKE A LOOK AT THESE: `, convo);
         Meteor.call('messages.insert', {
            body:             messageData.data.body,
            from:             messageData.data.from,
            to:               messageData.data.to,
            direction:        MESSAGE_DIRECTION.OUTBOUND,

            conversationId:   convoId
         //   asdf

         },  (error, success) => {
            console.log(`inserting message to db success: ${success}`);
         });

         // 'messages.insert'({ body, from, to, direction, conversationId }) {



            return messageData;
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