// Client entry point, imports all client code

import '/imports/startup/client';
import '/imports/startup/both';


import { Meteor } from 'meteor/meteor';
import React from 'react'
import { render } from 'react-dom';

import App from '../imports/ui/App';


Meteor.startup(()=>{
	render(
		<App/>,
		document.getElementById('render-target')
	);
})















