import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Accounts } from 'meteor/accounts-base';
import { ROLES } from '../Classes/Const';

// export const AgentsCollection = new Mongo.Collection('agents');
if (Meteor.isServer) {

   Meteor.methods({
      'agents.insert'({name, email, username, password, number, status, businessId, departmentId}){
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
      'agents.insertBulk'(docs){
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

   Meteor.publish('agents.all', () => Meteor.users.find({ 'profile.role': 'agent' }) );



}