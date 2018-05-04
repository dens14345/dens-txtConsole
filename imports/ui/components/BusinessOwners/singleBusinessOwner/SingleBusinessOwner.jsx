import React, { Component, Fragment } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import AppBar from 'material-ui/AppBar';
import { Progress } from '../../extras/Progress';
import AgentsCard from '../../Dashboard/Staff/cards/AgentsCard';
import BusinessCard from '../../Dashboard/Staff/cards/BusinessCard';
import UserInfoCard from './cards/UserInfoCard';
import BusinessesTable from './tables/BusinessesTable'
import AgentsTable from './tables/AgentsTable';


import { BusinessesCollection } from '../../../../api/businesses/businesses';

class SingleBusinessOwner extends Component {

   constructor(props) {
      super(props);

   }


   render() {
      if (!this.props.businessOwner) {
         return (
            <Progress/>
         )
      }

      let bOwner = this.props.businessOwner;
      return (
         <Fragment>
            <AppBar
               title={ `${bOwner.profile.firstname} ${bOwner.profile.lastname}` }
               showMenuIconButton={ false }
            />
            <br/>
            <div className='row'>
               <div className='col-sm-4'>
                  <UserInfoCard { ...bOwner }/>
               </div>
               <div className='col-sm-4'>
                  <BusinessCard businessesCount={ this.props.businessesCount }/>
               </div>
               <div className='col-sm-4'>
                  <AgentsCard agentsCount={ this.props.agentsCount }/>
               </div>
            </div>

            <br/>
            <BusinessesTable history={this.props.history} businesses={this.props.businesses}/>


            <br/>
            <AgentsTable history={this.props.history} />

         </Fragment>
      );
   }
}

export default withTracker((props) => {
   let b_ownerId = props.match.params.b_ownerId;
   Meteor.subscribe('businessOwner', b_ownerId);
   Meteor.subscribe('businesses.owner', b_ownerId);
   Meteor.subscribe('agents.businessOwner', b_ownerId);


   let businessOwner = Meteor.users.findOne({ 'profile.role': 'b_owner' });
   let agents = Meteor.users.find({ 'profile.role': 'agent' }).fetch();
   let agentsCount = agents.length;
   let businessesCount = BusinessesCollection.find().count();
   let businesses = BusinessesCollection.find().fetch();

   return {
      user: Meteor.user(),
      agents,
      agentsCount,
      businessesCount,
      businessOwner,
      businesses
   }
})(SingleBusinessOwner)



