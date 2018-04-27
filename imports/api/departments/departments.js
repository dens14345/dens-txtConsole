import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const DepartmentsCollection = new Mongo.Collection('departments');

if (Meteor.isServer) {

   Meteor.methods({

      'departments.insert'(name, businessId){
         return DepartmentsCollection.insert({
            name,
            dateCreated: new Date(),
            business: businessId
         });
      }

   }); //end of methods


   Meteor.publish('departments.all', () => DepartmentsCollection.find());
   Meteor.publish('departments.single', (departmentId) => DepartmentsCollection.find({_id: departmentId}));
   Meteor.publish('departments.business', (businessId) => DepartmentsCollection.find({business:businessId}));
}