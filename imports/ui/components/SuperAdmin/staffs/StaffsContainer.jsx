import { Meteor } from 'meteor/meteor';
import React, { Component, Fragment } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import AppBar from 'material-ui/AppBar';

import Navbar from '../../Navbar/Navbar';
import Sidebar from '../../Sidebar/Sidebar';

import StaffsTable from './StaffsTable';

class InboxContainer extends Component {

   constructor(props) {
      super(props);
      if (!Meteor.userId()) {
         this.props.history.replace('/login');
      }
   }

   render() {
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


   return {}
})(InboxContainer)



