import { Meteor } from 'meteor/meteor';
import React, { Component, Fragment } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Card, CardText, CardActions } from 'material-ui/Card';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import SendIcon from 'material-ui/svg-icons/content/send';

import FlatButton from 'material-ui/FlatButton';
import moment from 'moment';

import MyChip from '../../../extras/MyChip/MyChip';

import { MessagesCollection } from '../../../../api/messages/messages';
import { MESSAGE_DIRECTION } from '../../../../api/Classes/Const';
import { Accounts } from "meteor/accounts-base";


class Messages extends Component {

   constructor(props) {
      super(props);
      this.state = {
         messageLimit: 20,
         messageBody: ''
      };
   }

   incrementMessageSubscription() {
      this.setState({ messageLimit: this.state.messageLimit + 10 });
      Meteor.subscribe('messages.convoId', this.props.convoId, this.state.messageLimit);
   }

   sendMessage() {
      let self = this;
      let messageBody = this.state.messageBody;
      let agentNumber = this.props.agentNumber;
      let To = Meteor.settings.public.myNumber;

      Bert.alert('Sending message', 'info', 'growl-top-right');

      Meteor.call('sendMessage', {messageBody, agentNumber, To}, function(err, succ){
         console.log(err);
         console.log(succ);
         if(succ){
            Bert.alert('Message Sent', 'success', 'growl-top-right');
            self.setState({ messageBody: '' });
         }

         if(err)
            Bert.alert('Message not set', 'danger', 'growl-top-right');
      });
   }


   render() {
      let styles = {
         chip: {
            margin: 10,
         },
         wrapper: {
            marginBottom: 50,
         },
         card: {
            backgroundColor: '#EEEEEE',
            height: 500,
            overflowY: 'scroll'
         }
      };
      return (
         <Fragment>
            <AppBar
               title='Brendan Lim'
               showMenuIconButton={ false }
            />
            <Card containerStyle={ styles.card }>
               <CardText>
                  {
                     this.props.messages.map((message, index) => {
                           let bColor = '';
                           let pullTo = '';
                           if (message.direction === MESSAGE_DIRECTION.OUTBOUND) {
                              bColor = '#C8E6C9';
                              pullTo = 'right';
                           }
                           else {
                              bColor = '#E0E0E0';
                              pullTo = 'left';
                           }

                           return (
                              <div key={ message._id }>
                                 <MyChip bgColor={ bColor } position={ pullTo }>
                                    <p>
                                       { message.body }
                                    </p>
                                    <p className='message-details'>
                                       { moment(message.date).format('MMMM Do YYYY, h:mm:ss a') }
                                    </p>
                                 </MyChip>
                                 <div style={ { clear: 'both' } }/>


                                 <br/>


                              </div>
                           )
                        }
                     )
                  }

               </CardText>

            </Card>
            <FlatButton
               label='load more'
               onClick={ this.incrementMessageSubscription.bind(this) }
            />

            <div className="row">
               <div className="col-sm-10">
                  <TextField
                     floatingLabelText='Type Message'
                     multiLine={ true }
                     rows={ 2 }
                     rowsMax={ 4 }
                     fullWidth={ true }
                     value={this.state.messageBody}
                     onChange={(e) => { this.setState({ messageBody: e.target.value })} }
                  />
               </div>
               <div className='col-sm-2'>
                  <FloatingActionButton onClick={this.sendMessage.bind(this)}>
                     <SendIcon />
                  </FloatingActionButton>
               </div>
            </div>

         </Fragment>

      );

   }
}

export default withTracker((props) => {
   let { convoId } = props;

   let isReady = Accounts.loginServicesConfigured();
   let agentNumber = '';

   if(isReady) {
      agentNumber = Meteor.user().profile.number;
   }

   Meteor.subscribe('messages.convoId', convoId);


   return {
      messages: MessagesCollection.find().fetch(),
      convoId,
      agentNumber
   }
})(Messages)



