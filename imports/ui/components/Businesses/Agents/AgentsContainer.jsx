import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Route } from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base';

import Navbar from '../../Navbar/Navbar';
import Sidebar from '../../Sidebar/Sidebar';

import { currentUser, userRole } from '../../../../api/Classes/Utils';
import { NotAllowed } from '../../extras/NotAllowed';

import { ROLES } from '../../../../api/Classes/Const';


import AgentsTable from './extras/AgentsTable';


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
         <div>
            <Navbar/>
            <Sidebar/>
            <div className="my-container">
               <h1>Agents</h1>
               <AgentsTable/>
            </div>
         </div>

      );

   }
}

export default withTracker(() => {
   let isReady = Accounts.loginServicesConfigured();
   let user = Meteor.user();


   return {
      isReady,
      user
   }

})(AgentsContainer)



