import Accounts from 'meteor/accounts-base';


export function loggedIn() {
   if (Meteor.userId()) {
      return true;
   }
}

export function currentUser() {

   let user = Meteor.user();
   return user;

   // return Meteor.users.findOne().profile.role;
   /* if(currentUser){
       return currentUser;
    }*/
}

export function createAgentAccount(){
   if(Meteor.isServer) {
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


