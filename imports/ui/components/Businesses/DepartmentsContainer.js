import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Route } from 'react-router-dom';

import Navbar from '../Navbar/Navbar';
import Sidebar from '../Sidebar/Sidebar';

import AgentsTable from './AgentsTable';
import { DepartmentsCollection } from "../../../api/departments/departments";

class DepartmentsContainer extends Component {

   constructor(props) {
      super(props);

   }


   render() {
      if(!this.props.department){
         return(
            <h1>loading</h1>
         )
      }

      return (
         <div className="my-container">
            <Navbar/>
            <Sidebar/>
            <h1>{this.props.department.name}</h1>
            <AgentsTable
               businessId={this.props.businessId}
               departmentId={this.props.departmentId}
            />
            {console.log(this.props.business)}
            {console.log(this.props.department)}
         </div>
      );
   }
}

export default withTracker((props) => {
   let businesses = props.businesses;
   let businessId = props.url.match.params.businessId;
   let departmentId = props.url.match.params.departmentId;

   let business = businesses.filter((business) => {
      return business._id === businessId
   });

   Meteor.subscribe('departments.single', departmentId);
   return {
      business: business[0],
      department: DepartmentsCollection.findOne(),
      businessId,
      departmentId
   }
})(DepartmentsContainer)



