import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Route } from 'react-router-dom';

import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';


import BusinessesTable from './BusinessesTable';
import SingleBusiness from './SingleBusiness';
import Navbar from '../Navbar/Navbar';
import Sidebar from '../Sidebar/Sidebar';
import MaterialModal from '../extras/Modal/MaterialModal';

import { BusinessesCollection } from "../../../api/businesses/businesses";


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
               <h1>Businesses</h1>
               <RaisedButton
                  label='New'
                  primary={ true }
                  onClick={ this.openModal.bind(this) }
               />

               <MaterialModal
                  title='Create new Business'
                  open={ this.state.open }
                  closeModal={ this.closeModal.bind(this) }
                  submit={ this.addBusiness.bind(this) }
               >
                  <TextField
                     value={ this.state.businessName }
                     fullWidth={ true }
                     floatingLabelText='Business Name'
                     onChange={ this.handleInputChange.bind(this) }
                  />

               </MaterialModal>
               <BusinessesTable/>
            </div>
         </div>
      );
   }
}

export default withTracker(() => {
   Meteor.subscribe('businesses.owner', Meteor.userId());
   return {
      user: Meteor.user(),
      businesses: BusinessesCollection.find().fetch()
   }
})(Businesses)



