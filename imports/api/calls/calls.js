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
      },

      'calls.makeCall'(from = Meteor.settings.public.myNumber, to = Meteor.settings.public.myTwilioNumber){
         const accountSid = Meteor.settings.twilio.accountSid;
         const authToken = Meteor.settings.twilio.authToken;


         const client = require('twilio')(accountSid, authToken);

         return client.api.calls
            .create({
               url: 'http://demo.twilio.com/docs/voice.xml',
               to,
               from
            })
            .then(call => call.sid)
            .catch(error => error);
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
