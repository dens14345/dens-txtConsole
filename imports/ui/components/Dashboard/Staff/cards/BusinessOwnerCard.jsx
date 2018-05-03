import React, { Component, Fragment } from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import Divider from 'material-ui/Divider';


class BusinessOwnerCard extends Component {

   constructor(props) {
      super(props);
   }

   render() {
      return (
         <Card style={this.props.style}>
            <CardText>
               <div className="row">
                  <div className="col-sm-4">
                     <img src='/icons/b_owner-icon.png' alt=''/>
                  </div>
                  <div className="col-sm-8">
                     <h4>Business Owners</h4>
                     <span>{this.props.businessOwnersCount}</span>
                  </div>
               </div>
            </CardText>
            <CardActions>
               <Divider/>
               <h4>Last updated: </h4>
            </CardActions>
         </Card>
      );
   }
}

export default withTracker(() => {
   return {}
})(BusinessOwnerCard)

