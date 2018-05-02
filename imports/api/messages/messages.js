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
   Meteor.publish('messages.convoId', (convoId) => MessagesCollection.find({ conversationId: convoId }));

}