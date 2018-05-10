import { Meteor } from 'meteor/meteor';
import React, { Component, Fragment } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom';
import { List, ListItem } from 'material-ui/List';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble';
import { ConversationsCollection } from "../../../../api/conversations/conversations";


class ChatList extends Component {

   constructor(props) {
      super(props);
      this.state ={
         limit: 20
      }
   }


   incrementConversationSubscription(){
      this.setState({ limit:  this.state.limit+10});
      Meteor.subscribe('conversations.agentNumber', this.props.agentNumber, this.state.limit);
   }

   render() {
      let cardStyle = {
         // width: 220,
         // height: 500,
         // padding: '0px'

         width: 220,
         transitionDuration: '0.3s',
         height: 500,
         padding: '0px',
      };
      return (
         <Paper style={ cardStyle } zDepth={ 1 }>
            <Paper style={ { height: 450, overflowY: 'scroll' } } zDepth={ 0 }>
               <List>
                  <Subheader>Conversations {(`${this.props.showedConversations} / ${this.props.conversationCounts}`)}</Subheader>
                  <Divider/>
                  {
                     this.props.conversations.map((convo) =>

                        <Link key={ convo._id } to={ { pathname: `/inbox/${convo._id}` } }>
                           <ListItem
                              primaryText={ convo.convoWith }
                              rightIcon={ <CommunicationChatBubble/> }
                           />
                        </Link>
                     )
                  }
               </List>
            </Paper>

            <FlatButton
               style={{marginLeft: 50}}
               label='Load More'
               primary={true}
               onClick={this.incrementConversationSubscription.bind(this)}
            />

         </Paper>
      );

   }
}

export default withTracker((props) => {
   console.log(props);

   Meteor.subscribe('conversations.count', props.agentNumber);
   return {
      showedConversations: ConversationsCollection.find().count(),
      conversationCounts: Counts.get('conversations.count')
   };
})(ChatList)



