import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { ROLES } from '../../api/Classes/Const';


Meteor.startup(() => {
   if (!Meteor.users.findOne()) {
      console.log('true');
      let username = 'admin';
      let email = 'admin@gmail.com';
      let password = 'admin123';

      Accounts.createUser({
         email,
         username,
         password,
         profile: {
            role: ROLES.SUPER_ADMIN
         }
      });
   }
});
