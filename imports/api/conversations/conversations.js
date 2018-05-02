import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const ConversationsCollection = new Mongo.Collection('conversations');

if (Meteor.isServer) {

   Meteor.methods({

      // 'departments.insert'(name, businessId){
      //    return DepartmentsCollection.insert({
      //       name,
      //       dateCreated: new Date(),
      //       business: businessId
      //    });
      // }
      'conversations.insert'({agentNumber, convoWith}){
         return ConversationsCollection.insert({
            agentNumber,
            convoWith
         });
      }


   }); //end of methods

   Meteor.publish('conversations.agentNumber', (agentNumber) => ConversationsCollection.find({agentNumber}));

}