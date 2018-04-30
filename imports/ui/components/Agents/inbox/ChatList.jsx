import { Meteor } from 'meteor/meteor';
import React, { Component, Fragment } from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import MobileTearSheet from '../../extras/MobileTearSheet';
import { List, ListItem } from 'material-ui/List';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble';



class ChatList extends Component {

   constructor(props) {
      super(props);
   }

   render() {
      return (
         <Fragment>

            <MobileTearSheet >
               <List>
                  <Subheader>Recent chats</Subheader>
                  <ListItem
                     primaryText="Brendan Lim"
                     // leftAvatar={ <Avatar src="img/user-avatar.png"/> }
                     rightIcon={ <CommunicationChatBubble/> }
                  />
                  <ListItem
                     primaryText="Eric Hoffman"
                     // leftAvatar={ <Avatar src="img/user-avatar.png"/> }
                     rightIcon={ <CommunicationChatBubble/> }
                  />
                  <ListItem
                     primaryText="Grace Ng"
                     // leftAvatar={ <Avatar src="img/user-avatar.png"/> }
                     rightIcon={ <CommunicationChatBubble/> }
                  />
                  <ListItem
                     primaryText="Kerem Suer"
                     // leftAvatar={ <Avatar src="img/user-avatar.png"/> }
                     rightIcon={ <CommunicationChatBubble/> }
                  />
                  <ListItem
                     primaryText="Raquel Parrado"
                     // leftAvatar={ <Avatar src="img/user-avatar.png"/> }
                     rightIcon={ <CommunicationChatBubble/> }
                  />
               </List>
               <Divider/>
               <List>
                  <Subheader>Bookmarked</Subheader>
                  <ListItem
                     primaryText="Brendan Lim"
                     // leftAvatar={ <Avatar src="img/user-avatar.png"/> }
                     leftIcon={ <CommunicationChatBubble/> }
                  />
                  <ListItem
                     primaryText="Eric Hoffman"
                     // leftAvatar={ <Avatar src="img/user-avatar.png"/> }
                     leftIcon={ <CommunicationChatBubble/> }
                  />
                  <ListItem
                     primaryText="Grace Ng"
                     // leftAvatar={ <Avatar src="img/user-avatar.png"/> }
                     leftIcon={ <CommunicationChatBubble/> }
                  />
                  <ListItem
                     primaryText="Kerem Suer"
                     // leftAvatar={ <Avatar src="img/user-avatar.png"/> }
                     leftIcon={ <CommunicationChatBubble/> }
                  />
                  <ListItem
                     primaryText="Raquel Parrado"
                     // leftAvatar={ <Avatar src="img/user-avatar.png"/> }
                     leftIcon={ <CommunicationChatBubble/> }
                  />
               </List>
            </MobileTearSheet>
               {/*<Card>
                  <CardText>

                  </CardText>
               </Card>*/}
         </Fragment>

      );

   }
}

export default withTracker(() => {
   return {}
})(ChatList)



