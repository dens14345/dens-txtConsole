import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Accounts } from 'meteor/accounts-base';
import { ROLES } from '../Classes/Const';

import {BusinessesCollection} from "../businesses/businesses";

// export const AgentsCollection = new Mongo.Collection('agents');
if (Meteor.isServer) {

   Meteor.methods({
      'agents.insert'({ name, email, username, password, number, status, businessId, departmentId }) {
         return Accounts.createUser({
            email,
            username,
            password,
            profile: {
               name,
               number,
               status,
               role: ROLES.AGENT,
               business: businessId,
               department: departmentId,
               belongsTo: Meteor.userId()
            }
         });
      },
      'agents.insertBulk'(docs) {
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
      },
      'agents.addToDepartment'({ _id, businessId, departmentId }) {
         return Meteor.users.update(
            { _id },
            {
               $set:
                  {
                     'profile.business': businessId,
                     'profile.department': departmentId
                  }
            }
         )
      },
      'countAgents'(){
         return Meteor.users.find({ 'profile.role': 'agent' }).count();
      }


   }); //end of methods
   Meteor.publish('agents.all', (limit = 0) => Meteor.users.find({ 'profile.role': 'agent' }, { limit }));

   Meteor.publish('agents.count', function () {
      Counts.publish(this, 'agents.count', Meteor.users.find({ 'profile.role': 'agent' }), {fastCount:true});
   });

   Meteor.publish('agents1.available', (businessOwnerId, skip = 10, limit = 10) =>
      Meteor.users.find({ 'profile.belongsTo': businessOwnerId }, { limit: limit, skip: skip }
   ));

   Meteor.publish('agents.available', (businessOwnerId, limit = 10) =>
      Meteor.users.find({ 'profile.belongsTo': businessOwnerId }, { limit }
   ));

   Meteor.publish('agents.registeredToDepartment', (businessOwnerId, departmentId) => Meteor.users.find(
      {
         'profile.belongsTo': businessOwnerId,
         'profile.department': departmentId
      }
   ));
   Meteor.publish('agents.department', (departmentId) => Meteor.users.find({
      'profile.department': departmentId
   }));


   Meteor.publish('agents.businessOwner', (businessOwnerId, limit = 0) => Meteor.users.find({
      'profile.belongsTo': businessOwnerId
   }, {
      limit
   }));

}

   /*a = function(){
      let temp__ = [];
      let id = new Mongo.ObjectID();
      let businessId = business fetched etc
      for(var i = 0; i < 5000; )
      temp__.push({
         "_id" : id._str,
         "createdAt" : new Date(),
         "services" : {
            "password" : {
               "bcrypt" : "$2a$10$r5WRQ1BnZwO.P5F4CntB4.8F20iYYMSo2bxVa.qse7THH5J4dycBa"
            },
            "resume" : {
               "loginTokens" : [

               ]
            }
         },
         "emails" : [
            {
               "address" : username + "@gmail.com",
               "verified" : false
            }
         ],
         "status" : {
            "online" : false,
         },
         "profile" : {
            "fullName" : name.findName(),
            "companyName" : name.jobTitle()
         },
   });

   userstempDb.batchInsert(temp__);


}*/