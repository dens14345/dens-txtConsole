
import React, { Component } from 'react';
import { render } from 'react-dom';
import { ROLES } from '../../../api/Classes/Const';
import { Accounts } from 'meteor/accounts-base';


export default class Register extends Component {

   constructor(props) {
      super(props);
      this.state = {
         fname    : '',
         lname    : '',
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

   register(e) {
      e.preventDefault();
      let fname = this.state.fname;
      let lname = this.state.lname;
      let email = this.state.email;
      let password = this.state.password;

      Accounts.createUser({
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
         <div className="container-fluid">
            <h4>Create an account</h4>
            <div className="row">
               <form className="col s12">
                  <div className="row">
                     <div className="input-field col s6">
                        <input id="fname" type="text" className="validate"
                               onChange={ this.handleFnameInput.bind(this) }
                               value={ this.state.fname }/>
                        <label htmlFor="fname">Firstname</label>
                     </div>
                     <div className="input-field col s6">
                        <input id="lname" type="text" className="validate"
                               onChange={ this.handleLnameInput.bind(this) }
                               value={ this.state.lname }/>
                        <label htmlFor="lname">Lastname</label>
                     </div>
                  </div>
                  <div className="row">
                     <div className="input-field col s12">
                        <input id="email" type="email" className="validate"
                               onChange={ this.handleEmailInput.bind(this) }
                               value={ this.state.email }/>
                        <label htmlFor="email">Email</label>
                     </div>
                  </div>
                  <div className="row">
                     <div className="input-field col s12">
                        <input id="password" type="password" className="validate"
                               onChange={ this.handlePasswordInput.bind(this) }
                               value={ this.state.password }/>
                        <label htmlFor="password">Password</label>
                     </div>
                  </div>
                  <button className="btn" onClick={ this.register.bind(this) }>Submit</button>
               </form>
            </div>
         </div>
      );
   }
};