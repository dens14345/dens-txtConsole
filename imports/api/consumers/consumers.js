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
      }

      /*'agents.insertBulk'(docs){
         let userId = Meteor.userId();
         let status = 'active';
         let role = ROLES.AGENT;
         let business = 'N/A';
         let department = 'N/A';

         docs.forEach((doc) => {
            Accounts.createUser({
               email: doc.email,
               username: doc.username,
               password: doc.password,
               profile: {
                  name: doc.name,
                  number: doc.number,
                  status,
                  role,
                  business,
                  department,
                  belongsTo: userId
               }
            });
            console.log('record inserted')
         });
         return true;
      },*/


   }); //end of methods


   Meteor.publish('consumers.all', () => ConsumersCollection.find());

   Meteor.publish('consumers.count', function (businessId) {
      Counts.publish(this, 'consumers.count', ConsumersCollection.find({ business: businessId }), { fastCount: true });
   });


   Meteor.publish('consumers.business.limit', (businessId, limit) => ConsumersCollection.find(
      { business: businessId },
      { limit }
   ));
   Meteor.publish('consumers.business', (businessId, limit = 10) =>
      ConsumersCollection.find({ business: businessId }, {limit})
   );



}