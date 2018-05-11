import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const ConversationsCollection = new Mongo.Collection('conversations');

if (Meteor.isServer) {

   Meteor.methods({

      'conversations.insert'({agentNumber, convoWith}){
         return ConversationsCollection.insert({
            agentNumber,
            convoWith
         });
      },

      'conversations.isNumberExisting'(convoWith){
         return ConversationsCollection.findOne({ convoWith });
      }



   }); //end of methods

   Meteor.publish('conversations.agentNumber', (agentNumber, limit=10) =>
      ConversationsCollection.find({agentNumber}, {limit})
   );

   Meteor.publish('conversations.count', function(agentNumber){
      Counts.publish(this,  'conversations.count',  ConversationsCollection.find({agentNumber}))
   });

}