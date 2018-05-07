import React, { Component, Fragment } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Route } from 'react-router-dom';

import Businesses from './Businesses';
import SingleBusiness from './SingleBusiness';
import DepartmentsContainer from './DepartmentsContainer';
import { BusinessesCollection } from '../../../../api/businesses/businesses';



class BusinessOwnerContainer extends Component {

   constructor(props) {
      super(props);

   }


   render() {
      return (
         <Fragment>
            <Route exact path='/businesses' component={ Businesses }/>
            <Route exact path='/businesses/:businessId' render={ (props) =>
               <SingleBusiness url={ props } businesses={ this.props.businesses }/> }
            />
            <Route path='/businesses/:businessId/:departmentId' render={ (props) =>
               <DepartmentsContainer url={ props } businesses={ this.props.businesses }/> }
            />
         </Fragment>
      );
   }
}

export default withTracker(() => {

   return {
      businesses: BusinessesCollection.find().fetch()
   }
})(BusinessOwnerContainer)



