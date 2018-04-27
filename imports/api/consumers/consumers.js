import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const ConsumersCollection = new Mongo.Collection('consumers');

if (Meteor.isServer) {

   Meteor.methods({

      'consumer.insert'({name, number, address, businessId}) {
         return ConsumersCollection.insert({
            name,
            number,
            address,
            business: businessId,
            dateAdded: new Date()
         })
      }


   }); //end of methods


   Meteor.publish('consumers.all', () => ConsumersCollection.find());
   Meteor.publish('consumers.business', (businessId) => ConsumersCollection.find({ business: businessId }));
}