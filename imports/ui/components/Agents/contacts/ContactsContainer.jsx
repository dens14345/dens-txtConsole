import { Meteor } from "meteor/meteor";
import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Route } from 'react-router-dom';
import AppBar from 'material-ui/AppBar';


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
               { /*<h1>contacts container number of contacts: {this.props.consumersCount}</h1>*/ }
               <AppBar
                  title='Contacts'
                  showMenuIconButton={ false }
               />
               <br/>

               <div className="row">
                  <div className="col-xs-4">
                     <ContactsList consumers={ this.props.consumers } businessId={ this.props.businessId }/>
                  </div>
                  <div className="col-xs-7">
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

   if (isReady) {
      businessId = user.profile.business;
      Meteor.subscribe('consumers.business', businessId);
      console.log('user is now ready');
   } else {
      console.log('user not ready');
   }


   return {
      user,
      consumers: ConsumersCollection.find({ business: businessId }).fetch(),
      businessId
   }
})(ContactsContainer)



