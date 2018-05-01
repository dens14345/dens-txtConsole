/*
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const ThemesCollection = new Mongo.Collection('themes');

if (Meteor.isServer) {

   Meteor.methods({

      'theme.update'(theme) {
         return ThemesCollection.update({
            theme
         });
      }


   }); //end of methods


   Meteor.publish('theme', () => ThemesCollection.find());
}*/
