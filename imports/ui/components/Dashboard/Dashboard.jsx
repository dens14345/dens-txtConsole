import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import { Progress } from '../../extras/Progress';
import { currentUser, userRole } from '../../../api/Classes/Utils';
import { ROLES } from '../../../api/Classes/Const';

import Navbar from '../../layouts/Navbar/Navbar';
import Sidebar from '../../layouts/Sidebar/Sidebar';

import BusinessOwnerDashboard from './BusinessOwnerDashboard';
import SuperAdminDashboard from './SuperAdminDashboard';
import StaffDashboard from './Staff/StaffDashboard';


class Dashboard extends Component {

   constructor(props) {
      super(props);
      console.log(Meteor.userId());
      if (!Meteor.userId()) {
         this.props.history.replace('/login');
      }
   }

   renderDashboard(userRole) {
      console.log(`userRole: ${userRole} ROLES.B_OWNER: ${ROLES.B_OWNER}`);
      switch (userRole) {
         case ROLES.SUPER_ADMIN:
            return <SuperAdminDashboard/>
         case ROLES.B_OWNER:
            return <BusinessOwnerDashboard/>;
         /*case ROLES.AGENT:
            return <Agent/>;*/
         case ROLES.STAFF:
            return <StaffDashboard/>;
         default:
            break;
      }
   }


   render() {
      if (!this.props.user) {
         return (<Progress/>)
      } else {
         if (userRole() === ROLES.AGENT) {
            this.props.history.replace('/inbox');
         }
      }


      return (
         <div>
            <Navbar/>
            <Sidebar/>
            <div className='my-container'>
               {
                  (this.props.user) ?
                     this.renderDashboard(this.props.user.profile.role) :
                     null
               }
            </div>
         </div>
      );
   }
}

export default withTracker(() => {
   let user;
   (Meteor.user()) ? user = Meteor.user() : null;
   return {
      user
   }
})(Dashboard)



