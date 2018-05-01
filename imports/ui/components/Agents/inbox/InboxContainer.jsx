import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
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
                     <AppBar
                        title='Brendan Lim'
                        showMenuIconButton={false}
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



