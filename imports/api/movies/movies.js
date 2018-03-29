import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const Movies = new Mongo.Collection('movies');

/*
*
* Define Schema here
*
* */


if(Meteor.isServer) {
	Meteor.methods({
		/*
		* Methods here
		*
		* */
	});

	Meteor.publish('contacts.all', () => Contacts.find());
}