import { Meteor } from 'meteor/meteor';
import Accounts from 'meteor/accounts-base';
import { ROLES } from "./Const";

export function loggedIn() {
   if (Meteor.userId()) {
      return true;
   }
}

export function currentUser() {
   let user = Meteor.user();
   return user;
}

export function userRole() {
   return Meteor.user().profile.role;
}

export function checkRole({ loader, notAllowedPage }) {

   if (!this.props.user) {
      return (
         <div>
            <loader/>
         </div>
      )
   } else {
      if (userRole() === ROLES.AGENT) {
         return (
            <NotAllowed/>
         )
      }
   }
}


export function createAgentAccount() {
   if (Meteor.isServer) {
      Accounts.createUser({
         email: 'agen1t@gmail.com',
         username: 'agent1',
         password: 'agent123',
         profile: {
            name: 'test',
            number: 'test',
            status: 'test',
            role: 'agent',
            business: 'test',
            department: 'test',
            belongsTo: Meteor.userId()
         }
      });
   }
}


if(Meteor.isServer) {
   Meteor.methods({
      'checkPassword'(digest) {

         if (this.userId) {
            let user = Meteor.user();
            let password = {digest: digest, algorithm: 'sha-256'};
            let result = Accounts._checkPassword(user, password);
            return result.error == null;
         } else {
            return false;
         }
      }
   });
}
