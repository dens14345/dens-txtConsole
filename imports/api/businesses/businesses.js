import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const BusinessesCollection = new Mongo.Collection('businesses');

if (Meteor.isServer) {

   Meteor.methods({

      'businesses.insert'(name){
         console.log(Meteor.userId());
         return BusinessesCollection.insert({
            name,
            dateCreated: new Date(),
            owner: Meteor.userId()
         })
      }


      /*'conversations.insert'(convoWith){
         return Conversations.insert({
            convoWith
         });
      },

      'conversations.isNumberExisting'(number){
         return Conversations.findOne({
            convoWith: number
         });
      }*/


   }); //end of methods


   Meteor.publish('businesses.all', () => BusinessesCollection.find());
   Meteor.publish('businesses.owner', (owner) => BusinessesCollection.find({owner}));
}