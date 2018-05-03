import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Route } from 'react-router-dom';

import Navbar from '../Navbar/Navbar';
import Sidebar from '../Sidebar/Sidebar';
import Businesses from './Businesses';
import SingleBusiness from './SingleBusiness';
import DepartmentsContainer from './DepartmentsContainer';
import { BusinessesCollection } from '../../../api/businesses/businesses';
import { DepartmentsCollection } from '../../../api/departments/departments';
import { ConsumersCollection } from '../../../api/consumers/consumers';
import { ROLES } from '../../../api/Classes/Const';
import { userRole } from '../../../api/Classes/Utils';

import { NotAllowed } from '../extras/NotAllowed';


class BusinessesContainer extends Component {

   constructor(props) {
      super(props);
      if (!Meteor.userId()) {
         this.props.history.replace('/login');
      }
   }


   render() {

      if (!this.props.user) {
         return (
            <div>
               loading
            </div>
         )
      } else {
         if (userRole() === ROLES.AGENT) {
            return (
               <NotAllowed/>
            )
         }
      }

      return (
         <div>
            { /*<Navbar/>
            <Sidebar/>*/ }
            <Route exact path='/businesses' component={ Businesses }/>
            <Route exact path='/businesses/:businessId' render={ (props) =>
               <SingleBusiness url={ props } businesses={ this.props.businesses }/> }
            />
            <Route path='/businesses/:businessId/:departmentId' render={ (props) =>
               <DepartmentsContainer url={ props } businesses={ this.props.businesses }/> }
            />



         </div>
      );
   }
}

export default withTracker(() => {
   Meteor.subscribe('businesses.owner', Meteor.userId());

   let user = Meteor.user();

   return {
      user,
      businesses: BusinessesCollection.find().fetch()
   }
})(BusinessesContainer)



