import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';

import Login from '../../ui/components/Auth/Login';
import Register from '../../ui/components/Auth/Register';
import Index from '../../ui/components/Index/Index'
import MoviesContainer from '../../ui/components/Movies/MoviesContainer'
import Dashboard from '../../ui/components/Dashboard/Dashboard';
import { userRole } from "../../api/Classes/Utils";


class Routes extends Component {

   render() {
      return (
         <Router>
            <div>
               <Route exact path='/' component={ Index }/>
               <Route path='/dashboard' component={ Dashboard }/>
               <Route path='/login' component={ Login }/>
               <Route path='/register' component={ Register }/>
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



/*
let index = () => {
   return (
      <div className='container-fluid'>
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
         <Route exact path='/' component={ Index }/>
         <Route path='/login' component={ Login }/>
         <Route path='/register' component={ Register }/>
      </div>
   </Router>
)
*/

