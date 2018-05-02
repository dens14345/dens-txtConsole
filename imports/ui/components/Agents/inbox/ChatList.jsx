import { Meteor } from 'meteor/meteor';
import React, { Component, Fragment } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom';


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
         <Paper style={ cardStyle } zDepth={ 1 }>
            <List>
               <Subheader>Recent Chats</Subheader>
               <Divider/>
               {
                  this.props.conversations.map((convo) =>

                     <Link key={convo._id} to={{pathname: `/inbox/${convo._id}`}}>
                        <ListItem
                           primaryText={convo.convoWith}
                           rightIcon={ <CommunicationChatBubble/> }
                        />
                     </Link>
                  )
               }
            </List>
         </Paper>
      );

   }
}

export default withTracker((props) => {
   // console.log(props);
   return {

   }
})(ChatList)



