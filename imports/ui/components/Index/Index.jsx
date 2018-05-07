import React, { Component } from 'react';
import { render } from 'react-dom';
import { withTracker } from 'meteor/react-meteor-data';

import { currentUser } from "../../../api/Classes/Utils";

import Navbar from '../../layouts/Navbar/Navbar';
import Sidebar from '../../layouts/Sidebar/Sidebar';


class Index extends Component {

   constructor(props) {
      super(props);
   }

   componentWillMount() {
      if (!Meteor.userId()) {
         this.props.history.push('/login');
      }
   }

   render() {
      return (
         <div>
            <Navbar/>
            <Sidebar/>
            {/*{console.log(currentUser())}
            {console.log(this.props.currentUser)}*/}
         </div>
      );
   }
}

export default withTracker(() => {
   // let currentUser = Meteor.currentUser().profile.role;
   return {
      // currentUser
   }
})(Index)

