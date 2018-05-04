import React, { Component, Fragment } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import BusinessOwnersTable from './BusinessOwnersTable';

class BusinessOwners extends Component {

   constructor(props) {
      super(props);

   }


   render() {


      return (
         <Fragment>
            <BusinessOwnersTable {...this.props}/>
         </Fragment>
      );
   }
}

export default withTracker((props) => {
   Meteor.subscribe('businessOwner.all')

   let businessOwners = Meteor.users.find({ 'profile.role': 'b_owner' }).fetch();

   return {
      user: Meteor.user(),
      businessOwners

   }
})(BusinessOwners)



