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
      },

      'consumer.insertBulk'(consumers) {
         consumers.forEach((con) => {
            let name = con.name;
            let number = con.number;
            let address = con.address;
            let business = con.businessId;
            ConsumersCollection.insert({
               name,
               number,
               address,
               business,
               dateAdded: new Date()
            });
            console.log('Consumer inserted');
         });
         return 'true';
      },

      'consumer.search'(name){
         // let consumers = ConsumersCollection.find({ name: {$regex: "//" + name + "//i" } }, {limit: 10}).fetch();
         // let consumers = ConsumersCollection.find({ name: /santino/i  }, {limit: 10}).fetch();
         // let consumers = ConsumersCollection.find({ name: {$regex:  "/" + name + "/i" } }, {limit: 10}).fetch();
         let consumers = ConsumersCollection.find({ name: {$regex: new RegExp(name, "i") } }, {limit: 10}).fetch();

         console.log(consumers);
         return consumers;
         // return true;
      }

   }); //end of methods


   Meteor.publish('consumers.all', () => ConsumersCollection.find());

   Meteor.publish('consumers.count', function (businessId) {
      Counts.publish(this, 'consumers.count', ConsumersCollection.find({ business: businessId }), { fastCount: true });
   });

   Meteor.publish('consumers.business.limit', (businessId, limit = 10) => ConsumersCollection.find(
      { business: businessId },
      { limit }
   ));

   Meteor.publish('consumers.business.limit.count', function(businessId){
      Counts.publish(this,  'consumers.business.limit.count', ConsumersCollection.find({ business: businessId }, {fastCount: true} ))
   });

   Meteor.publish('consumers.business', (businessId, limit = 10) =>
      ConsumersCollection.find({ business: businessId }, {limit})
   );



}