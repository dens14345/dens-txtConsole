import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import { Progress } from '../../extras/Progress';
import { userRole } from '../../../api/Classes/Utils';
import { ROLES } from '../../../api/Classes/Const';

import Navbar from '../../layouts/Navbar/Navbar';
import Sidebar from '../../layouts/Sidebar/Sidebar';


class CallLogContainer extends Component {

   constructor(props) {
      super(props);
      if (!Meteor.userId()) {
         this.props.history.replace('/login');
      }
   }


   render() {
      if (!this.props.user) {
         return (<Progress/>)
      } else {
         // if (userRole() === ROLES.AGENT) {
         //    this.props.history.replace('/inbox');
         // }
      }


      return (
         <div>
            <Navbar/>
            <Sidebar/>
            <div className='my-container'>
               <h1>Call logs</h1>
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
})(CallLogContainer)



