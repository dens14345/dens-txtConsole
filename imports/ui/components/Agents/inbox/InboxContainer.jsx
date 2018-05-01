import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import faker from 'faker';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';

import Navbar from '../../Navbar/Navbar';
import Sidebar from '../../Sidebar/Sidebar';

import ChatList from './ChatList';

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

      let addConvo = () => {
         Meteor.call('conversations.insert',{
            agentNumber,
            convoWith
         });
      }

      addConvo().then((err, succ) => {
         console.log(err);
         console.log(succ);
      });

     /* let convoId = Meteor.call('conversations.insert',{
            agentNumber,
            convoWith
         }, (err, succ) => {
            console.log(succ);
            return succ;
         });
      console.log(convoId);*/
   }

   render() {
      return (
         <div>
            <Navbar/>
            <Sidebar/>
            <div className='my-container'>
               <div className="row">
                  <div className="col-md-3">
                     <ChatList/>
                  </div>
                  <div className="col-md-9">
                     <RaisedButton
                        label='fake data'
                        onClick={ this.addConversationUsingFaker.bind(this) }
                        primary={true}
                     />
                     <AppBar
                        title='Brendan Lim'
                        showMenuIconButton={ false }
                     />
                     <Card>
                        <CardText>
                           <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. A aliquid amet blanditiis
                              consequatur enim id iusto laboriosam magni nemo odio perspiciatis quasi quia quos
                              repellendus similique suscipit tempora totam, voluptatum!</p>
                           <Divider/>

                           <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. A aliquid amet blanditiis
                              consequatur enim id iusto laboriosam magni nemo odio perspiciatis quasi quia quos
                              repellendus similique suscipit tempora totam, voluptatum!</p>
                           <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. A aliquid amet blanditiis
                              consequatur enim id iusto laboriosam magni nemo odio perspiciatis quasi quia quos
                              repellendus similique suscipit tempora totam, voluptatum!</p>

                        </CardText>

                     </Card>
                  </div>
               </div>
            </div>
         </div>

      );

   }
}

export default withTracker(() => {
   return {}
})(InboxContainer)



