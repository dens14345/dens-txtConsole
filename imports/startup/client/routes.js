import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';

import Login from '../../ui/components/Auth/Login';
import Register from '../../ui/components/Auth/Register';
import Index from '../../ui/components/Index/Index'
import MoviesContainer from '../../ui/components/Movies/MoviesContainer'
import Dashboard from '../../ui/components/Dashboard/Dashboard';
import AgentsContainer from '../../ui/components/Agents/AgentsContainer';
import Businesses from '../../ui/components/Businesses/Businesses';
import BusinessesContainer from '../../ui/components/Businesses/BusinessesContainer';
import SingleBusiness from '../../ui/components/Businesses/Businesses';

import { userRole } from "../../api/Classes/Utils";


class Routes extends Component {

   render() {
      return (
         <Router>
            <div>
               <Route exact path='/' component={ Index }/>
               <Route path='/login' component={ Login }/>
               <Route path='/register' component={ Register }/>


               <Route path='/dashboard' component={ Dashboard }/>
               <Route path='/businesses' component={ BusinessesContainer }/>
               <Route path='/agents' component={ AgentsContainer }/>

               <Route path='/movies' component={ MoviesContainer }/>
            </div>
         </Router>
      );
   }
}

export default withTracker(() => {
   let user = Meteor.user();
   return {
      user
   }
})(Routes)



