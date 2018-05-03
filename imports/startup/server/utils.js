import { Meteor } from 'meteor/meteor';

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
