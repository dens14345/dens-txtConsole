import React, { Component } from 'react';
import { render } from 'react-dom';
import { loggedIn } from '../../../api/Classes/Utils'

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';


export default class Login extends Component {

   constructor(props) {
      super(props);
      this.state = {
         email: '',
         password: ''
      }
   }

   componentWillMount() {
      if (loggedIn()) {
         this.props.history.push('/');
      }
   }

   handleEmailInput(e) {
      this.setState({ email: e.target.value });
   }

   handlePasswordInput(e) {
      this.setState({ password: e.target.value });
   }

   login(e) {
      e.preventDefault();
      let email = this.state.email;
      let password = this.state.password;


      Meteor.loginWithPassword(email, password, (error, success) => {
         console.log(error);
         console.log(success);
         this.props.history.replace('/');
      });
   }

   render() {
      return (
            <Card style={{margin: '0px 200px 0px 200px'}}>
               <CardTitle title='Login'/>
               <CardText>
                     <form className="">
                        <div className="">
                           <TextField
                              value={ this.state.email}
                              fullWidth={ true }
                              floatingLabelText='Email'
                              type='email'
                              onChange={ this.handleEmailInput.bind(this) }
                           />
                        </div>
                        <div className="row">
                              <TextField
                                 value={ this.state.password }
                                 fullWidth={ true }
                                 floatingLabelText='Password'
                                 type='password'
                                 onChange={ this.handlePasswordInput.bind(this) }
                              />
                        </div>
                        <RaisedButton
                           label='Submit'
                           onClick={this.login.bind(this)}
                           primary={true}
                        />
                     </form>
               </CardText>
            </Card>
      );
   }
}