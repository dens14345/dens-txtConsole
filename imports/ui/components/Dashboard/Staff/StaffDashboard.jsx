import React, { Component, Fragment } from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import AgentsCard from './cards/AgentsCard';
import BusinessCard from './cards/BusinessCard';
import BusinessOwnerCard from './cards/BusinessOwnerCard';

import { BusinessesCollection } from '../../../../api/businesses/businesses';

class StaffDashboard extends Component {

   constructor(props) {
      super(props);
   }


   render() {
      let cardStyle = {};

      return (
         <div className='row'>
            <div className='col-sm-4'>
               <BusinessCard
                  style={ cardStyle }
                  businessesCount={this.props.businessesCount}
               />
            </div>

            <div className='col-sm-4'>
               <BusinessOwnerCard
                  style={ cardStyle }
                  businessOwnersCount={this.props.businessOwnersCount}
               />
            </div>

            <div className='col-sm-4'>
               <AgentsCard
                  style={ cardStyle }
                  agentsCount={ this.props.agentsCount }
               />
            </div>
         </div>
      );
   }
}

export default withTracker(() => {

   Meteor.subscribe('agents.all');
   Meteor.subscribe('businesses.all');
   Meteor.subscribe('businessOwner.all');

  /* console.log(Meteor.users.find().count());
   console.log(Meteor.users.find({ 'profile.role': 'agent' }).count());
   console.log(Meteor.users.find({ 'profile.role': 'b_owner' }).count());*/

   let agentsCount = Meteor.users.find({ 'profile.role': 'agent' }).count();
   let businessesCount = BusinessesCollection.find().count();
   let businessOwnersCount = Meteor.users.find({ 'profile.role': 'b_owner' }).count();

   return {
      agentsCount,
      businessesCount,
      businessOwnersCount
   }
})(StaffDashboard)
