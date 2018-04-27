import React, { Component, Fragment } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Route } from 'react-router-dom';


import CircularProgress from 'material-ui/CircularProgress';
import LinearProgress from 'material-ui/LinearProgress';
import AppBar from 'material-ui/AppBar';

import DepartmentsContainer from './DepartmentsContainer';
import DepartmentsTable from './DeparmentsTable';
import ConsumersTable from './ConsumersTable';

import { BusinessesCollection } from "../../../api/businesses/businesses";
import { DepartmentsCollection } from "../../../api/departments/departments";
import { ConsumersCollection } from "../../../api/consumers/consumers";

import Sidebar from '../Sidebar/Sidebar';
import Navbar from '../Navbar/Navbar';
import Businesses from "./Businesses";


class SingleBusiness extends Component {

   constructor(props) {
      super(props);
   }

   render1() {
      console.log(`render1()  function is called`)
      return (
         <Fragment>
            <AppBar
               title={ this.props.business[0].name }
            />
            <DepartmentsTable
               departments={ this.props.departments }
               businessId={ this.props.businessId }
            />
            <ConsumersTable
               consumers={ this.props.consumers }
               businessId={ this.props.businessId }
            />
         </Fragment>
      )
   }

   renderDepartmentsContainer() {
      console.log(`renderDepartmentsContainer() function is called`)
      return(
         <DepartmentsContainer/>
      )
   }

   render() {
      if (!this.props.business[0]) {
         return (
            <div className='container-fluid'>
               <CircularProgress size={ 100 } thickness={ 5 }/>
               <LinearProgress mode='indeterminate'/>
            </div>

         )
      }
      return (
         <div className='container-fluid'>
            <Sidebar/>
            <Navbar/>
            <AppBar
               title={ this.props.business[0].name }
            />
            <DepartmentsTable
               departments={ this.props.departments }
               businessId={ this.props.businessId }
            />
            <ConsumersTable
               consumers={ this.props.consumers }
               businessId={ this.props.businessId }
            />

            {/*<Route path='/businesses/:businessId' component={ this.render1.bind(this) }/>*/}
            {/*<Route path='/businesses/:businessId/:departmentId' component={this.render1.bind(this)}/>*/}
            { /*{ this.render1() }*/ }

            { /* <Route path='/businesses/:businessId' render={ (props) =>
               <DepartmentsContainer url={ props } businesses={ this.props.businesses }/> }
            />*/ }


         </div>
      );
   }
}

export default withTracker((props) => {
   let businesses = props.businesses;
   let businessId = props.url.match.params.businessId

   Meteor.subscribe('departments.business', businessId);
   Meteor.subscribe('consumers.business', businessId);

   let business = businesses.filter((business) => {
      return business._id === businessId
   });
   console.log(business[0]);
   return {
      business,
      businessId,
      departments: DepartmentsCollection.find().fetch(),
      consumers: ConsumersCollection.find().fetch()
   }

})(SingleBusiness)



