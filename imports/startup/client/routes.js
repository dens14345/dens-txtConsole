import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';

import Login from '../../ui/components/Auth/Login';
import Register from '../../ui/components/Auth/Register';
import Index from '../../ui/components/Index/Index'
import MoviesContainer from '../../ui/components/Movies/MoviesContainer'
import Dashboard from '../../ui/components/Dashboard/Dashboard';
import ProfileContainer from '../../ui/components/Profile/ProfileContainer';
import AgentsContainer from '../../ui/components/Businesses/Agents/AgentsContainer';
import BusinessesContainer from '../../ui/components/Businesses/BusinessesContainer';
import StaffsContainer from '../../ui/components/SuperAdmin/staffs/StaffsContainer';

import InboxContainer from '../../ui/components/Agents/inbox/InboxContainer';
import ContactsContainer from '../../ui/components/Agents/contacts/ContactsContainer';


class Routes extends Component {

   render() {
      return (
         <Router>
            <div>
               <Route exact path='/' component={ Index }/>
               <Route path='/login' component={ Login }/>
               <Route path='/register' component={ Register }/>


               <Route path='/dashboard' component={ Dashboard }/>

               <Route path='/profile' component={ ProfileContainer }/>

               <Route path='/businesses' component={ BusinessesContainer }/>
               <Route path='/agents' component={ AgentsContainer }/>

               <Route path='/inbox' component={ InboxContainer }/>
               <Route path='/contacts' component={ ContactsContainer }/>


               <Route path='/staffs' component={ StaffsContainer }/>


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



