import React, { Component } from 'react';
import { render } from 'react-dom';


export default class Movie extends Component{
	render(){
		var messageClass = "";
		var isOutBound = " hidden";
		if(this.props.message.direction === "inbound"){
			messageClass = "right-align";
			isOutBound = " ";
		}

		let date = moment(this.props.message.date).format('MMMM D, YY - h:mm:ss a');

		return (
			<div>

				<h4 className={"flow-text " + messageClass}>{this.props.message.body}</h4>
				<p className={messageClass}> <small> {date } </small> </p>
				<p className={messageClass + isOutBound}> <small> from: {this.props.message.from}</small></p>
				<hr/>
			</div>
		)
	}
}