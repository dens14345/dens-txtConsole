import { Meteor } from 'meteor/meteor';
import React, { Component, Fragment } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Route } from 'react-router-dom';
import faker from 'faker';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';

import { MessagesCollection } from '../../../../api/messages/messages';
import { ConversationsCollection } from "../../../../api/conversations/conversations";

import Navbar from '../../../layouts/Navbar/Navbar';
import Sidebar from '../../../layouts/Sidebar/Sidebar';

import ChatList from './ChatList';
import Messages from './Messages';


class InboxContainer extends Component {

   constructor(props) {
      super(props);
      if (!Meteor.userId()) {
         this.props.history.replace('/login');
      }
   }

   addConversationUsingFaker() {
      let agentNumber = Meteor.user().profile.number;
      let convoWith = faker.phone.phoneNumber();


      Meteor.call('conversations.insert', {
         agentNumber,
         convoWith
      }, (err, convoId) => {
         if (convoId) {

            console.log(convoId);
            let messages = [];
            for (let i = 0; i < 100; i++) {
               let body = faker.lorem.sentences();
               let from = faker.phone.phoneNumber();
               let to = agentNumber;
               let direction = 'incoming';
               let conversationId = convoId;

               messages.push({
                  body, from, to, direction, conversationId
               })


            }

            console.log(messages);

            Meteor.call('messages.insertBulk', messages, (err, succ) => {
               (succ) ? console.log('messages inserted ') :
                  console.log(err)
            })
         }
      });
   }

   render() {
      return (
         <div>
            <Navbar/>
            <Sidebar/>
            <div className='my-container'>
               <div className='row'>
                  <div className='col-md-3'>
                     <ChatList conversations={ this.props.conversations }/>
                  </div>
                  <div className='col-md-9'>
                     <RaisedButton
                        label='fake data'
                        onClick={ this.addConversationUsingFaker.bind(this) }
                        primary={ true }
                     />


                     <Route exact path='/inbox/:convoId' render={ (props) =>
                        <Messages
                           allProps={ props }
                           convoId={ props.match.params.convoId }
                        />
                     }/>

                  </div>
               </div>
            </div>
         </div>

      );

   }
}

export default withTracker((props) => {
   let agentNumber;
   (Meteor.user()) ? agentNumber = Meteor.user().profile.number : null;

   Meteor.subscribe('conversations.agentNumber', agentNumber);

   return {
      conversations: ConversationsCollection.find().fetch(),
      messages: MessagesCollection.find().fetch()
   }
})(InboxContainer)



