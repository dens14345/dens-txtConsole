import { Meteor } from 'meteor/meteor';
import React, { Component, Fragment } from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import MobileTearSheet from '../../extras/MobileTearSheet';
import { List, ListItem } from 'material-ui/List';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble';


class ChatList extends Component {

   constructor(props) {
      super(props);
   }

   render() {
      let cardStyle = {
         width: 220,
         height: 500,
         padding: '0px'
      };
      return (
         <Fragment>

            <Paper style={ cardStyle } zDepth={ 1 }>
               <List>
                  <Subheader>Recent Chats</Subheader>
                  <Divider/>
                  <ListItem
                     primaryText="Brendan Lim"
                     rightIcon={ <CommunicationChatBubble/> }
                  />
                  <ListItem
                     primaryText="Eric Hoffman"
                     rightIcon={ <CommunicationChatBubble/> }
                  />
                  <ListItem
                     primaryText="Grace Ng"
                     rightIcon={ <CommunicationChatBubble/> }
                  />
                  <ListItem
                     primaryText="Kerem Suer"
                     rightIcon={ <CommunicationChatBubble/> }
                  />
                  <ListItem
                     primaryText="Raquel Parrado"
                     rightIcon={ <CommunicationChatBubble/> }
                  />

               </List>

            </Paper>

         </Fragment>

      );

   }
}

export default withTracker(() => {
   return {}
})(ChatList)



