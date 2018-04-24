import React, { Component } from 'react';
import { render } from 'react-dom';


export default class Login extends Component {

   constructor(props) {
      super(props);
      this.state = {
         email: '',
         password: ''
      }
   }

   handleEmailInput(e){
      // console.log(e.target.value);
      this.setState({ email: e.target.value });
   }

   handlePasswordInput(e){
      // console.log(e.target.value);
      this.setState({ password: e.target.value });
   }

   login(e){
      e.preventDefault();
      let email = this.state.email;
      let password = this.state.password;

      Meteor.loginWithPassword(email, password);
   }

   render(){
      return(
         <div className="container-fluid">
            <h4>Login page</h4>
            <div className="row">
               <form className="col s12">
                  <div className="row">
                     <div className="input-field col s12">
                        <input id="email" type="email" className="validate"
                           onChange={this.handleEmailInput.bind(this)}
                           value={this.state.email}/>
                        <label htmlFor="email">Email</label>
                     </div>
                  </div>
                  <div className="row">
                     <div className="input-field col s12">
                        <input id="password" type="password" className="validate"
                           onChange={this.handlePasswordInput.bind(this)}
                           value={this.state.password}/>
                        <label htmlFor="password">Password</label>
                     </div>
                  </div>
                  <button className="btn" onClick={this.login.bind(this)}>Submit</button>
               </form>
            </div>
         </div>
      );
   }
}