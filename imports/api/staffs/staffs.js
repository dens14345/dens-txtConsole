import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Accounts } from 'meteor/accounts-base';
import { ROLES } from '../Classes/Const';

// export const AgentsCollection = new Mongo.Collection('agents');
if (Meteor.isServer) {

   Meteor.methods({
      'staff.insert'({name, email, username, password, status}){
         return Accounts.createUser({
            email,
            username,
            password,
            profile: {
               name,
               status,
               role: ROLES.STAFF,
               dateModified: new Date()
            }
         });
      },

      'staff.update'(id, doc) {
         // Update account
         Meteor.users.update(id, {
            $set: {
               username: doc.username,
               profile: doc.profile
            }
         });

         // Update password
         if (doc.password != 'the same') {
            Accounts.setPassword(id, doc.password);
         }

         return true;
      },


      // 'agents.insertBulk'(docs){
      //    let userId = Meteor.userId();
      //    let status = 'active';
      //    let role = ROLES.AGENT;
      //    let business = 'N/A';
      //    let department = 'N/A';
      //
      //    docs.forEach((doc) => {
      //       Accounts.createUser({
      //          email: doc.email,
      //          username: doc.username,
      //          password: doc.password,
      //          profile: {
      //             name: doc.name,
      //             number: doc.number,
      //             status,
      //             role,
      //             business,
      //             department,
      //             belongsTo: userId
      //          }
      //       });
      //       console.log('record inserted')
      //    });
      //    return true;
      // },
   }); //end of methods



   Meteor.publish('staffs', () => Meteor.users.find({'profile.role': ROLES.STAFF}));



}