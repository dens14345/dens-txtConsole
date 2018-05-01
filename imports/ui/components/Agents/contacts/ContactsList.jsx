import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Link, NavLink } from 'react-router-dom';

import Paper from 'material-ui/Paper';
import { List, ListItem, makeSelectable } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import Person from 'material-ui/svg-icons/social/person';

import SelectableList from './SelectableList';


class ContactsList extends Component {

   constructor(props) {
      super(props);
   }

   handleClick() {
      // this.props.history.push('/test-link');
   }


   render() {

      let cardStyle = {
         width: 220,
         transitionDuration: '0.3s',
         height: 500,
         padding: '0px'
      };
      return (
         <Paper style={ cardStyle } zDepth={ 1 }>
            <List>
               <Subheader>Contacts</Subheader>
               <Divider/>

               {
                  this.props.consumers.map((consumer) => (
                     <Link className='my-background-color'
                           key={ consumer._id }
                        // activeClassName={'my-background-color'}
                           to={ { pathname: `/contacts/${consumer._id}` } }
                     >
                        <ListItem
                           // primaryText={ consumer.name }
                           leftIcon={ <Person/> }
                           onClick={ this.handleClick.bind(this) }
                        >
                           { consumer.name }
                        </ListItem>
                     </Link>
                  ))
               }

            </List>

         </Paper>

      );

   }
}

export default withTracker((props) => {
   return {}
})(ContactsList)


