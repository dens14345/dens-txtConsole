import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import { currentUser } from "../../../api/Classes/Utils";
import { ROLES } from "../../../api/Classes/Const";

import BusinessOwnerDashboard from './BusinessOwnerDashboard';
import SuperAdminDashboard from './SuperAdminDashboard';
import Navbar from '../Navbar/Navbar';
import Sidebar from '../Sidebar/Sidebar';
import { Meteor } from "meteor/meteor";

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
         case ROLES.AGENT:
            return <Agent/>;
         case ROLES.STAFF:
            return <Staff/>;
         default:
            break;
      }
   }


   render() {
      return (
         <div>
            <Navbar/>
            <Sidebar/>
            <div className='my-container'>
               {
                  // (typeof currentUser() === 'undefined') ?
                     // null : this.renderDashboard(currentUser().profile.role)
                     // null : this.renderDashboard(this.props.user.profile.role)
                  (this.props.user)?
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



