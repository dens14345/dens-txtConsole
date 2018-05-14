import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { SideNav, SideNavItem, Button } from 'react-materialize';

import BusinessCard from './Staff/cards/BusinessCard';
import AgentsCard from './Staff/cards/AgentsCard';

class BusinessOwnerDashboard extends Component {

   constructor(props) {
      super(props);
   }


   render() {
      return (
         <div className='row'>
            <div className='col-sm-4'>
               <BusinessCard businessesCount={ this.props.businessesCount }/>
            </div>
            <div className='col-sm-4'>
               <AgentsCard agentsCount={ this.props.agentsCount }/>
            </div>
         </div>

      );
   }
}

export default withTracker(() => {

   Meteor.subscribe('businesses.owner.count', Meteor.userId());
   Meteor.subscribe('agents.businessOwner.count', Meteor.userId());

   return {
      businessesCount: Counts.get('businesses.owner.count'),
      agentsCount: Counts.get('agents.businessOwner.count')
   };
})(BusinessOwnerDashboard)

