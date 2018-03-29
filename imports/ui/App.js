import React, { Component } from 'react';

import routes from '../startup/client/routes';

export default class App extends Component {
	render() {
		return (
			<div>
				{routes}
			</div>
		);
	}

};
