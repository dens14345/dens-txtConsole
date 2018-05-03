import { Meteor } from 'meteor/meteor';
import React, { Component, Fragment } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

class ProfileForm extends Component {

   render() {
      return (
         <Card>
            <CardTitle title="Edit Profile"/>
            <CardText>
               <TextField
                  // value={ this.state.consumerName }
                  fullWidth={ true }
                  floatingLabelText='Consumer Name'
               />
               <TextField
                  // value={ this.state.consumerName }
                  fullWidth={ true }
                  floatingLabelText='Consumer Name'
               />
               <TextField
                  // value={ this.state.consumerName }
                  fullWidth={ true }
                  floatingLabelText='Consumer Name'
               />
               <RaisedButton
                  label='Update Profile'
                  primary={ true }
                  // onClick={}
               />
            </CardText>
         </Card>
      );

   }
}

export default withTracker((props) => {


   return {}
})(ProfileForm)



