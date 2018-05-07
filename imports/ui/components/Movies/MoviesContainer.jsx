import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';


import Navbar from '../../layouts/Navbar/Navbar';
import Sidebar from '../../layouts/Sidebar/Sidebar';
import { Movies } from "../../../api/movies/movies";


import Movie from './Movie';

class MoviesContainer extends Component {
	constructor(props) {
		super(props);
	}

   render() {
      return (
         <div>
            <Navbar/>
            <Sidebar/>
            <div className="my-container">
               <h3>Movies Component</h3>
            </div>
         </div>
      );
   }

	/*render() {
		if (!this.props.movies) {
			return (
				<h2>Loading</h2>
			)
		}

		return (
			<div>
				<h1>Movies Component</h1>
				<h4>Movies:</h4>
				<div>
					{
						this.props.movies.map((movie) =>
							<Movie
								key={movie._id}
								message={movie}
							/>
						)
					}
				</div>
			</div>
		);
	}*/
}

export default withTracker((props) => {
	Meteor.subscribe('movies.all');
	// Meteor.subscribe('movies.singleMovie', props.match.params.id)

	return {
		messages: Movies.find().fetch(),
	}
})(MoviesContainer)


