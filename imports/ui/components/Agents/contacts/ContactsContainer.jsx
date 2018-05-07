import { Meteor } from "meteor/meteor";
import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Route } from 'react-router-dom';


import Navbar from '../../../layouts/Navbar/Navbar';
import Sidebar from '../../../layouts/Sidebar/Sidebar';

import ContactsList from './ContactsList';
import ContactInfo from './ContactInfo';
import { ConsumersCollection } from "../../../../api/consumers/consumers";
import InboxContainer from "../inbox/InboxContainer";


class ContactsContainer extends Component {

   constructor(props) {
      super(props);
      if (!Meteor.userId()) {
         this.props.history.replace('/login');
      }
   }

   render() {
      if (!this.props.consumers) {
         return (
            <div className="my-container">
               <h1>loading</h1>
            </div>
         )
      }
      return (
         <div>
            <Navbar/>
            <Sidebar/>
            <div className="my-container">
               <h1>contacts container</h1>

               <div className="row">
                  <div className="col-xs-3">
                     <ContactsList consumers={ this.props.consumers }/>
                  </div>
                  <div className="col-xs-8">
                     <Route path='/contacts/:consumerId' render={ (props) =>
                        <ContactInfo url={ props } consumers={ this.props.consumers }/> }
                     />
                  </div>
               </div>

            </div>
         </div>

   );

   }
   }

   export default withTracker(() => {
      let isReady = Accounts.loginServicesConfigured()
      let user = Meteor.user();
      let businessId;

   if(isReady){
      Meteor.subscribe('consumers.business', user.profile.business);
      businessId = user.profile.business;
      console.log('user is now ready');
   }else{
      console.log('user not ready');
   }


      //('consumers.business', (businessId) => ConsumersCollection.find({ business: businessId }));

      return {
      user,
      consumers: ConsumersCollection.find({ business: businessId }).fetch()
   }
   })(ContactsContainer)



