import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Accounts } from 'meteor/accounts-base';
import { ROLES } from '../Classes/Const';

// export const AgentsCollection = new Mongo.Collection('agents');
if (Meteor.isServer) {

   Meteor.methods({
      'agents.insert'({name, email, username, password, number, status, businessId, departmentId}){
         Accounts.createUser({
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

      'agents.addToDepartment'({_id, businessId, departmentId}){
         return Meteor.users.update(
            {_id},
            {$set:
               {
                  'profile.business': businessId,
                  'profile.department': departmentId
               }
            }
         )
      }



   }); //end of methods


   Meteor.publish('agents.businessOwner', (businessOwnerId) => Meteor.users.find({
      'profile.belongsTo': businessOwnerId
   }));



}