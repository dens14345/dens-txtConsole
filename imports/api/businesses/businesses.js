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

   }); //end of methods


   Meteor.publish('businesses.all', () => BusinessesCollection.find());
   Meteor.publish('businesses.owner', (owner) => BusinessesCollection.find({owner}));

   Meteor.publish('businessOwner.all', () => Meteor.users.find({ 'profile.role': 'b_owner' }));

}