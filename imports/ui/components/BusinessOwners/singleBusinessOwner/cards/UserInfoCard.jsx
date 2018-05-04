import React, { Component, Fragment } from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';


class AgentsCard extends Component {

   constructor(props) {
      super(props);
   }

   render() {
      let bOwner = this.props;

      return (
         <Card style={ this.props.style }>
            <CardText>
               <div className="row">
                  <div className="col-sm-4">
                     <br/>
                     <img src='/icons/profile-icon.png' alt=''/>
                  </div>
                  <div className="col-sm-8">
                     <h4>Account Info:</h4>
                     <p>{ `${bOwner.profile.firstname} ${bOwner.profile.lastname}` }</p>
                     <p>{ this.props.emails[0].address }</p>
                     <p>Status</p>

                  </div>
               </div>
            </CardText>

         </Card>
      );
   }
}

export default withTracker(() => {
   return {}
})(AgentsCard)

