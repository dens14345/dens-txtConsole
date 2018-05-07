import React, { Component, Fragment } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Route } from 'react-router-dom';


import CircularProgress from 'material-ui/CircularProgress';
import LinearProgress from 'material-ui/LinearProgress';
import AppBar from 'material-ui/AppBar';

import DepartmentsContainer from './DepartmentsContainer';
import DepartmentsTable from './tables/DeparmentsTable';
import ConsumersTable from './tables/ConsumersTable';

import { BusinessesCollection } from '../../../../api/businesses/businesses';
import { DepartmentsCollection } from '../../../../api/departments/departments';
import { ConsumersCollection } from '../../../../api/consumers/consumers';

import Sidebar from '../../../layouts/Sidebar/Sidebar';
import Navbar from '../../../layouts/Navbar/Navbar';
import Businesses from './Businesses';


class SingleBusiness extends Component {

   constructor(props) {
      super(props);
   }


   render() {
      if (!this.props.business[0]) {
         return (
            <div className='my-container'>
               <CircularProgress size={ 100 } thickness={ 5 }/>
               <LinearProgress mode='indeterminate'/>
            </div>

         )
      }
      return (
         <Fragment>
            <Navbar/>
            <Sidebar/>
            <div className='my-container'>
               <AppBar
                  title={ this.props.business[0].name }
                  showMenuIconButton={false}
               />
               <DepartmentsTable
                  departments={ this.props.departments }
                  businessId={ this.props.businessId }
               />
               <ConsumersTable
                  // consumers={ this.props.consumers }
                  businessId={ this.props.businessId }
               />
            </div>
         </Fragment>

      );
   }
}

export default withTracker((props) => {
   console.log(props);
   let businesses = props.businesses;
   let businessId = props.url.match.params.businessId

   Meteor.subscribe('departments.business', businessId);
   // Meteor.subscribe('consumers.business', businessId);
   // Meteor.subscribe('consumers.business.limit', businessId, 50);


   let business = businesses.filter((business) => {
      return business._id === businessId
   });
   // console.log(business[0]);
   return {
      business,
      businessId,
      departments: DepartmentsCollection.find().fetch(),
      // consumers: ConsumersCollection.find().fetch()
   }

})(SingleBusiness)



