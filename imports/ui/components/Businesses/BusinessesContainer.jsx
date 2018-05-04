import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Route } from 'react-router-dom';

import Navbar from '../Navbar/Navbar';
import Sidebar from '../Sidebar/Sidebar';
import Businesses from './BusinessOwner/Businesses';
import SingleBusiness from './BusinessOwner/SingleBusiness';
import DepartmentsContainer from './BusinessOwner/DepartmentsContainer';
import { BusinessesCollection } from '../../../api/businesses/businesses';
import { DepartmentsCollection } from '../../../api/departments/departments';
import { ConsumersCollection } from '../../../api/consumers/consumers';
import { ROLES } from '../../../api/Classes/Const';
import { userRole } from '../../../api/Classes/Utils';

import { NotAllowed } from '../extras/NotAllowed';

import BusinessOwnerContainer from './BusinessOwner/BusinessOwnerContainer';
import StaffContainer from './Staff/StaffContainer';


class BusinessesContainer extends Component {

   constructor(props) {
      super(props);
      if (!Meteor.userId()) {
         this.props.history.replace('/login');
      }
   }

   /* renderBusinessComponent() {
       switch (userRole()) {
          case ROLES.SUPER_ADMIN:
             return <SuperAdmin/>
          case ROLES.B_OWNER:
             return <BusinessOwnerContainer/>;
          case ROLES.AGENT:
             return <Agent/>;
          case ROLES.STAFF:
             return <Staff/>;
          default:
             break;
       }
    }*/

   renderBusinessComponent() {
      switch (userRole()) {
         case ROLES.SUPER_ADMIN:
            return <SuperAdmin/>
         case ROLES.B_OWNER:
            return <Route path='/businesses' component={ BusinessOwnerContainer }/>;
         case ROLES.AGENT:
            return <Agent/>;
         case ROLES.STAFF:
            return <Route path='/businesses' component={ StaffContainer }/>;
         default:
            break;
      }
   }

   render() {

      if (!this.props.user) {
         return (
            <div>
               loading
            </div>
         )
      }

      return (
         <div>
            { this.renderBusinessComponent() }
         </div>
      );
   }
}

export default withTracker(() => {

   let user = Meteor.user();

   return {
      user,
   }
})(BusinessesContainer)



