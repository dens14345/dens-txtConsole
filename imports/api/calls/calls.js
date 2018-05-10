import { Meteor } from 'meteor/meteor';

export const CallsCollection = new Mongo.Collection('calls', {idGeneration: 'MONGO'});

if (Meteor.isServer) {

   Meteor.methods({


      'calls.insert'({from, agentNumber,  callStatus, callDuration, callSid='',agentRegisteredName=''}){
         return CallsCollection.insert({
            from,
            agentNumber,
            callStatus,
            callDuration,
            callSid,
            agentRegisteredName,
            date: +new Date()
         });
      }
   }); //end of methods


   //Publications here
   Meteor.publish('calls.all', () => CallsCollection.find());

}