import { Meteor } from 'meteor/meteor';
import React, { Component, Fragment } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import EditIcon from 'material-ui/svg-icons/editor/border-color';

import IconButton from 'material-ui/IconButton';

import MaterialModal from "../../../extras/Modal/MaterialModal";

class StaffProfileForm extends Component {

   constructor(props) {
      super(props);

      let { account } = props;

      this.state = {
         open: false,
         username: account.username,
         email: account.emails[0].address,
         name: account.profile.name,
         newPassword: '',
         confirmPassword: '',

         usernameEdit: true,
         emailEdit: true,
         nameEdit: true,
         passwordEdit: true,

         updatePassword: false,


         oldPassword: ''
      };
   }


   updateProfile() {
      let email = this.props.account.emails[0].address;
      let oldPassword = this.state.oldPassword;
      let digest = Package.sha.SHA256(oldPassword);

      let doc = {
         username: this.state.username,
         email,
         name: this.state.name,
         updatePassword: this.state.updatePassword,
         password: this.state.newPassword
      };


      Meteor.call('checkPassword', digest, function (err, passwordMatch) {
         //password match
         if (passwordMatch) {
            console.log('the passwords match!');
            Meteor.call('updateUser', Meteor.userId(), doc, (err, succ) => {
               console.log(err);
               console.log(succ);
            });
         }else{
            console.log('password does not match');
         }
      });


   }

   render() {
      let style = {
         width: 600
      };
      return (
         <Card>
            <CardTitle title="Edit Profile"/>
            <CardText>
               <TextField
                  style={ style }
                  floatingLabelText='Username'
                  value={ this.state.username }
                  fullWidth={ false }
                  onChange={ (e) => this.setState({ username: e.target.value }) }
                  disabled={ this.state.usernameEdit }
               />

               <IconButton
                  onClick={ () => this.setState({ usernameEdit: false }) }
                  children={ <EditIcon/> }

               />

               <br/>
               <TextField
                  style={ style }
                  floatingLabelText='Email'
                  value={ this.state.email }
                  fullWidth={ false }
                  onChange={ (e) => this.setState({ email: e.target.value }) }
                  disabled={ this.state.emailEdit }
               />

               <IconButton
                  onClick={ () => this.setState({ emailEdit: false }) }
                  children={ <EditIcon/> }
               />

               <TextField
                  style={ style }
                  floatingLabelText='Name'
                  value={ this.state.name }
                  fullWidth={ false }
                  onChange={ (e) => this.setState({ name: e.target.value }) }
                  disabled={ this.state.nameEdit }
               />

               <IconButton
                  onClick={ () => this.setState({ nameEdit: false }) }
                  children={ <EditIcon/> }
               />

               <TextField
                  style={ style }
                  floatingLabelText='New password'
                  value={ this.state.newPassword }
                  fullWidth={ false }
                  type='password'
                  onChange={ (e) => this.setState({ newPassword: e.target.value }) }
                  disabled={ this.state.passwordEdit }
               />
               <IconButton
                  onClick={ () => {
                     this.setState({
                        passwordEdit: false,
                        updatePassword: true
                     });
                  }}
                  children={ <EditIcon/> }
               />
               <br/>
               <TextField
                  style={ style }
                  floatingLabelText='Confirm'
                  value={ this.state.confirmPassword }
                  fullWidth={ false }
                  type='password'
                  onChange={ (e) => this.setState({ confirmPassword: e.target.value }) }
                  disabled={ this.state.passwordEdit }
               />

            </CardText>

            <CardActions>
               <RaisedButton
                  label='Update Profile'
                  primary={ true }
                  onClick={ () => {
                     if(this.state.updatePassword){
                        if((this.state.newPassword === this.state.confirmPassword) &&
                           (this.state.newPassword.length !== 0)){
                           this.setState({ open: true });
                        }else{
                           console.log('your password does not match');
                           return;
                        }
                     }else{
                        this.setState({ open: true });
                     }
                  }}
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
                     fullWidth={ false }
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



