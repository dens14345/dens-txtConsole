
export function loggedIn(){
   if(Meteor.userId()){
      return true;
   }
}

export function userRole(){
   return Meteor.users.findOne().profile.role;
}