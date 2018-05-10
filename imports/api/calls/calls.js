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
   // Meteor.publish('calls.all', () => CallsCollection.find());

   Meteor.publish('calls.agent.all', (agentNumber) => CallsCollection.find({agentNumber}) );

   Meteor.publish('calls.agent.callStatus', (agentNumber, callStatus) =>
      CallsCollection.find({agentNumber, callStatus})
   );

   Meteor.publish('calls.agent.missedCalls', (agentNumber) =>
      CallsCollection.find({agentNumber,
         $or:[
            {callStatus: 'missed_call'},
            { callStatus: 'rejected'}
         ]
      })
   );

}
