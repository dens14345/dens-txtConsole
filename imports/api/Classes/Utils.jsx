
export function loggedIn(){
   if(Meteor.userId()){
      return true;
   }
}

export function currentUser(){

   let user = Meteor.user();
   return user;

   // return Meteor.users.findOne().profile.role;
  /* if(currentUser){
      return currentUser;
   }*/
}
