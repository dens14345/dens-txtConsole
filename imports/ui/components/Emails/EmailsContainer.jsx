import React, { Component, Fragment } from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import Navbar from '../../layouts/Navbar/Navbar';
import Sidebar from '../../layouts/Sidebar/Sidebar';

import Emails from './Emails';

class EmailsContainer extends Component {

   constructor(props) {
      super(props);
      if (!Meteor.userId()) {
         this.props.history.replace('/login');
      }
   }

   render() {
      return (
         <Fragment>
            <Navbar/>
            <Sidebar/>
            <div className='my-container'>


               <Emails/>

            </div>
         </Fragment>
      );
   }
}

export default withTracker(() => {
   return {}
})(EmailsContainer)



