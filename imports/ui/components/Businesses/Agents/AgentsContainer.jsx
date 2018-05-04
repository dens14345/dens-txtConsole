import React, { Component, Fragment } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Route } from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base';
import AppBar from 'material-ui/AppBar';

import { currentUser, userRole } from '../../../../api/Classes/Utils';
import { NotAllowed } from '../../extras/NotAllowed';
import { ROLES } from '../../../../api/Classes/Const';


import Navbar from '../../Navbar/Navbar';
import Sidebar from '../../Sidebar/Sidebar';

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
         <Fragment>
            <Navbar/>
            <Sidebar/>

            <div className="my-container">
               <AppBar
                  title='Agents'
                  showMenuIconButton={ false }
               />
               <AgentsTable/>
            </div>
         </Fragment>

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



