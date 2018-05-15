
import React, { Component } from 'react';
import { render } from 'react-dom';
import { ROLES } from '../../../api/Classes/Const';
import { Accounts } from 'meteor/accounts-base';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';




export default class Register extends Component {

   constructor(props) {
      super(props);
      this.state = {
         fname    : '',
         lname    : '',
         username : '',
         email    : '',
         password : ''
      };
   }

   handleFnameInput(e) {
      this.setState({ fname: e.target.value });
   }
   handleLnameInput(e) {
      this.setState({ lname: e.target.value });
   }
   handleEmailInput(e) {
      this.setState({ email: e.target.value });
   }
   handlePasswordInput(e) {
      this.setState({ password: e.target.value });
   }
   handleUsernameInput(e){
      this.setState({ username : e.target.value });
   }
   register(e) {
      e.preventDefault();
      let fname      = this.state.fname;
      let lname      = this.state.lname;
      let username   = this.state.username;
      let email      = this.state.email;
      let password   = this.state.password;

      Accounts.createUser({
         username,
         email,
         password,
         profile: {
            firstname: fname,
            lastname: lname,
            role: ROLES.B_OWNER
         }
      });
   }

   render() {
      return (
         <div className="my-container">
            <h4>Create an account</h4>
            <div className="row">
               <form className="col s12">
                  <div className="row">
                     <div className="input-field col s6">
                        <TextField
                           value={ this.state.fname}
                           fullWidth={ true }
                           floatingLabelText='Firstname'
                           onChange={ this.handleFnameInput.bind(this) }
                        />
                     </div>
                     <div className="input-field col s6">
                        <TextField
                           value={ this.state.lname}
                           fullWidth={ true }
                           floatingLabelText='Lastname'
                           onChange={ this.handleLnameInput.bind(this) }
                        />
                     </div>
                  </div>
                  <div className="row">
                     <div className="input-field col s12">
                        <TextField
                           value={ this.state.username}
                           fullWidth={ true }
                           floatingLabelText='Username'
                           onChange={ this.handleUsernameInput.bind(this) }
                        />
                     </div>
                  </div>
                  <div className="row">
                     <div className="input-field col s12">
                        <TextField
                           value={ this.state.email}
                           fullWidth={ true }
                           floatingLabelText='Email'
                           type='email'
                           onChange={ this.handleEmailInput.bind(this) }
                        />
                     </div>
                  </div>
                  <div className="row">
                     <div className="input-field col s12">
                        <TextField
                           value={ this.state.password}
                           fullWidth={ true }
                           floatingLabelText='Password'
                           type='password'
                           onChange={ this.handlePasswordInput.bind(this) }
                        />
                     </div>
                  </div>
                  <RaisedButton
                     label='Submit'
                     onClick={this.register.bind(this)}
                     primary={true}
                  />
               </form>
            </div>
         </div>
      );
   }
};