import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Route } from 'react-router-dom';

import Navbar from '../Navbar/Navbar';
import Sidebar from '../Sidebar/Sidebar';
import Businesses from './Businesses';
import SingleBusiness from './SingleBusiness';
import DepartmentsContainer from './DepartmentsContainer';
import { BusinessesCollection } from "../../../api/businesses/businesses";
import { DepartmentsCollection } from "../../../api/departments/departments";
import { ConsumersCollection } from "../../../api/consumers/consumers";


class BusinessesContainer extends Component {

   constructor(props) {
      super(props);
      if (!Meteor.userId()) {
         this.props.history.replace('/login');
      }
   }


   render() {

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


            { /*<Route exact path='/businesses/:businessId' component={ SingleBusiness } extraProps={this.props.businesses}/>*/ }
            { /*<Route path='/businesses/:businessId' render={()=>
               <SingleBusiness {...this.props}/>}
            />*/ }

         </div>
      );
   }
}

export default withTracker(() => {
   Meteor.subscribe('businesses.owner', Meteor.userId());
   // Meteor.subscribe('departments.business', businessId);
   // Meteor.subscribe('consumers.business', businessId);


   return {
      businesses: BusinessesCollection.find().fetch(),
      // departments: DepartmentsCollection.find().fetch(),
      // consumers: ConsumersCollection.find().fetch()
   }
})(BusinessesContainer)



