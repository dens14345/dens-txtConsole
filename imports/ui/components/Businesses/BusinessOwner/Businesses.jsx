import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Route } from 'react-router-dom';

import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import AppBar from 'material-ui/AppBar';


import BusinessesTable from './tables/BusinessesTable';
import SingleBusiness from './SingleBusiness';
import Navbar from '../../../layouts/Navbar/Navbar';
import Sidebar from '../../../layouts/Sidebar/Sidebar';
import MaterialModal from '../../../extras/Modal/MaterialModal';

import { BusinessesCollection } from "../../../../api/businesses/businesses";
import { Accounts } from "meteor/accounts-base";
import { Meteor } from "meteor/meteor";
import { ROLES } from "../../../../api/Classes/Const";


class Businesses extends Component {

   constructor(props) {
      super(props);
      if (!Meteor.userId()) {

      }
      this.state = {
         open: false,
         businessName: ''
      }
   }

   handleInputChange(e) {
      this.setState({
         businessName: e.target.value
      });
   }

   addBusiness() {
      let businessName = this.state.businessName;

      Meteor.call('businesses.insert', businessName, (error, success) => {
         if (success) {
            this.setState({ businessName: '' })
         }
         console.log(error)
         console.log(success)
      });
   }

   openModal() {
      this.setState({ open: true })
   }

   closeModal() {
      this.setState({ open: false })
   }


   render() {

      return (
         <div>
            <Navbar/>
            <Sidebar/>
            <div className='my-container'>
               <AppBar
                  title='Businesses'
                  showMenuIconButton={ false }
               />
               <BusinessesTable/>
            </div>
         </div>
      );
   }
}

export default withTracker(() => {
   let userRole = '';

   let isReady = Accounts.loginServicesConfigured();
   (isReady)? userRole = Meteor.user().profile.role : null


   return {
      user: Meteor.user(),
      businesses: BusinessesCollection.find().fetch(),
      userRole
   }
})(Businesses)



