import { Meteor } from 'meteor/meteor';
import React, { Component, Fragment } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import AppBar from 'material-ui/AppBar';

import Navbar from '../../layouts/Navbar/Navbar';
import Sidebar from '../../layouts/Sidebar/Sidebar';

import ProfileForm from './ProfileForm';
import StaffProfileForm from './accounts/StaffProfileForm';
import { ROLES } from '../../../api/Classes/Const';
import { currentUser } from '../../../api/Classes/Utils';


class ProfileContainer extends Component {

   constructor(props) {
      super(props);
      if (!Meteor.userId()) {
         this.props.history.replace('/login');
      }
   }

   renderProfileForm(userRole) {
      // console.log(`userRole: ${userRole}`);
      switch (userRole) {
         case ROLES.SUPER_ADMIN:
         // return <SuperAdmin/>
         case ROLES.STAFF:
            return <StaffProfileForm account={currentUser()} />;
         case ROLES.B_OWNER:
         // return <BusinessOwner/>;
         case ROLES.AGENT:
         // return <Agent/>;
         default:
            break;
      }
   }

   render() {
      if (!this.props.user) {
         return (
            <div/>
         )
      }

      return (
         <div>
            <Navbar/>
            <Sidebar/>
            <div className='my-container'>
               <AppBar
                  title='Profile'
                  showMenuIconButton={ false }
               />

               {
                  (typeof currentUser() === 'undefined') ?
                     null : this.renderProfileForm(currentUser().profile.role)
               }
            </div>
         </div>

      );

   }
}

export default withTracker((props) => {
   // let user = Meteor.user();
   return {
      user: Meteor.user()
   }
})(ProfileContainer)



