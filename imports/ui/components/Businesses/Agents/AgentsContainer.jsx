import { Meteor } from 'meteor/meteor';
import React, { Component, Fragment } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Route } from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base';

import { userRole } from '../../../../api/Classes/Utils';
import { NotAllowed } from '../../../extras/NotAllowed';
import { ROLES } from '../../../../api/Classes/Const';


import Navbar from '../../../layouts/Navbar/Navbar';
import Sidebar from '../../../layouts/Sidebar/Sidebar';

import AgentsTable from './extras/AgentsTable';
import SingleAgent from './extras/SingleAgent';


class AgentsContainer extends Component {

   constructor(props) {
      super(props);
      if (!Meteor.userId()) {
         this.props.history.replace('/login');
      }
   }

   render() {

      if (!this.props.user) {
         return (
            <div>
               loading
            </div>
         )
      } else {
         if (userRole() === ROLES.AGENT) {
            return (
               <NotAllowed/>
            )
         }
      }

      return (
         <Fragment>
            <Navbar/>
            <Sidebar/>
            <div className='my-container'>
               <Route exact path='/agents' component={ AgentsTable }/>
               <Route exact path='/agents/:agentId' component={ SingleAgent }/>
            </div>
         </Fragment>

      );

   }
}

export default withTracker(() => {
   let isReady = Accounts.loginServicesConfigured();
   let user = Meteor.user();

   if (isReady) {
      console.log(user.profile.role);

      switch (user.profile.role) {
         case ROLES.STAFF:
            Meteor.subscribe('agents.all');
            break;
         case ROLES.B_OWNER:
            // Meteor.subscribe('agents.businessOwner', Meteor.userId());
            Meteor.subscribe('agents.available', Meteor.userId(), 10);

            break;
         default:
            break;
      }
   }

   let agents = Meteor.users.find().fetch();
   let filteredAgents = agents.filter((agent) => {
      return agent.profile.role === ROLES.AGENT;
   });

   return {
      isReady,
      user,
      agents: filteredAgents
   }

})(AgentsContainer)



