import { Meteor } from 'meteor/meteor';
import React, { Component, Fragment } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';

import { MessagesCollection } from '../../../../api/messages/messages';


class Messages extends Component {

   constructor(props) {
      super(props);
   }

   render() {

      return (
         <Fragment>
            <AppBar
               title='Brendan Lim'
               showMenuIconButton={ false }
            />
            <Card>
               <CardText>
                  {
                     this.props.messages.map((message, index) =>
                        <p key={index}>{message.body}</p>
                     )
                  }
               </CardText>
            </Card>

         </Fragment>

      );

   }
}

export default withTracker((props) => {
   let { convoId } = props;

   Meteor.subscribe('messages.convoId', convoId);


   return {
      messages: MessagesCollection.find().fetch()
   }
})(Messages)



