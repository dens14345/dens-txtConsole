import { Meteor } from 'meteor/meteor';
import React, { Component, Fragment } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import AppBar from 'material-ui/AppBar';

import Navbar from '../../../layouts/Navbar/Navbar';
import Sidebar from '../../../layouts/Sidebar/Sidebar';

import StaffsTable from './StaffsTable';
import { ROLES } from "../../../../api/Classes/Const";
import { userRole } from "../../../../api/Classes/Utils";
import { NotAllowed } from '../../../extras/NotAllowed';

class InboxContainer extends Component {

   constructor(props) {
      super(props);
      if (!Meteor.userId()) {
         this.props.history.replace('/login');
      }
   }

   render() {
      if (!this.props.user) {
         return (<div/>)
      } else {
         if (userRole() === ROLES.AGENT || userRole() === ROLES.STAFF) {
            return (
               <NotAllowed/>
            )
         }
      }


      return (
         <div>
            <Navbar/>
            <Sidebar/>
            <div className='my-container'>
               <AppBar
                  title='Staffs'
                  showMenuIconButton={ false }
               />
               <StaffsTable/>
            </div>
         </div>

      );

   }
}

export default withTracker((props) => {


   return {
      user: Meteor.user()
   }
})(InboxContainer)



