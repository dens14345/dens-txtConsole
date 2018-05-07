import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Route } from 'react-router-dom';

import Navbar from '../../layouts/Navbar/Navbar';
import Sidebar from '../../layouts/Sidebar/Sidebar';

import InboxContainer from './inbox/InboxContainer';

class AgentsContainer extends Component {

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
            <Route exact path='/inbox' component={ InboxContainer }/>
            { /*<Route exact path='/businesses/:businessId' render={ (props) =>
               <SingleBusiness url={ props } businesses={ this.props.businesses }/> }
            />
            <Route path='/businesses/:businessId/:departmentId' render={ (props) =>
               <DepartmentsContainer url={ props } businesses={ this.props.businesses }/> }
            />*/ }
         </div>

      );

   }
}

export default withTracker(() => {
   return {}
})(AgentsContainer)



