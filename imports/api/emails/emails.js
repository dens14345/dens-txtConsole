import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const EmailsCollection = new Mongo.Collection('emails');

if (Meteor.isServer) {

   Meteor.methods({


   }); //end of methods



}