import { Meteor } from 'meteor/meteor';
import React, { Component, Fragment } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import MaterialModal from "../../extras/Modal/MaterialModal";

class StaffProfileForm extends Component {

   constructor(props) {
      super(props);

      let { account } = props;

      this.state = {
         open: false,
         username: account.username,
         email: account.emails[0].address,
         name: account.profile.name,


         oldPassword: ''
      }
   }


   updateProfile() {
      let oldPassword = this.state.oldPassword;


      let digest = Package.sha.SHA256(oldPassword);
      Meteor.call('checkPassword', digest, function(err, result) {
         if (result) {
            console.log('the passwords match!');
         }
      });
   }

   render() {
      return (
         <Card>
            <CardTitle title="Edit Profile"/>
            <CardText>
               <TextField
                  floatingLabelText='Username'
                  value={ this.state.username }
                  fullWidth={ true }
                  onChange={ (e) => this.setState({ username: e.target.value }) }
               />
               <TextField
                  floatingLabelText='Email'
                  value={ this.state.email }
                  fullWidth={ true }
                  onChange={ (e) => this.setState({ email: e.target.value }) }
               />
               <TextField
                  floatingLabelText='Name'
                  value={ this.state.name }
                  fullWidth={ true }
                  onChange={ (e) => this.setState({ name: e.target.value }) }
               />

               <TextField
                  floatingLabelText='New password'
                  value={ this.state.name }
                  fullWidth={ true }
                  type='password'
                  onChange={ (e) => this.setState({ name: e.target.value }) }
               />
               <TextField
                  floatingLabelText='Confirm'
                  value={ this.state.name }
                  fullWidth={ true }
                  type='password'
                  onChange={ (e) => this.setState({ name: e.target.value }) }
               />

            </CardText>

            <CardActions>
               <RaisedButton
                  label='Update Profile'
                  primary={ true }
                  onClick={ () => this.setState({ open: true }) }
               />
               <MaterialModal
                  title='Enter password to confirm'
                  open={ this.state.open }
                  closeModal={ () => this.setState({ open: false }) }
                  submit={ this.updateProfile.bind(this) }
               >
                  <TextField
                     floatingLabelText='Password'
                     value={ this.state.oldPassword }
                     fullWidth={ true }
                     type='password'
                     onChange={ (e) => this.setState({ oldPassword: e.target.value }) }
                  />
               </MaterialModal>
            </CardActions>
         </Card>
      );

   }
}

export default withTracker((props) => {
   return {}
})(StaffProfileForm)



