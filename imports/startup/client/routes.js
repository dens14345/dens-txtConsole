import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import MoviesContainer from '../../ui/components/Movies/MoviesContainer';


let index = () => {
	return (
		<div>
			<h1>index page from routes js</h1>
		</div>
	)
}

let contacts = () => {
	return (
		<div>
			<h1>contacts page</h1>
		</div>
	)
}

export default routes = (
	<Router>
		<div>
			<Route exact path="/" component={index}/>
			<Route path="/contacts" component={contacts}/>
			<Route path="/movies" component={MoviesContainer}/>
		</div>
	</Router>
)
