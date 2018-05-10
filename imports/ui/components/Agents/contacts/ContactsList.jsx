import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom';

import Paper from 'material-ui/Paper';
import { List, ListItem, makeSelectable } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

import Person from 'material-ui/svg-icons/social/person';

import SelectableList from './SelectableList';
import { Meteor } from "meteor/meteor";
import { ConsumersCollection } from "../../../../api/consumers/consumers";


class ContactsList extends Component {

   constructor(props) {
      super(props);
      this.state = {
         limit: 20
      }
   }

   handleClick() {
      // this.props.history.push('/test-link');
   }

   incrementContactsSubscription() {
      this.setState({ limit: this.state.limit + 10 });
      Meteor.subscribe('consumers.business', this.props.businessId, this.state.limit);
   }


   render() {

      let cardStyle = {
         // width: 220,
         width: 300,
         transitionDuration: '0.3s',
         height: 500,
         padding: '0px',
      };
      return (
         <Paper style={ cardStyle } zDepth={ 1 }>
            <Paper style={ { height: 450, overflowY: 'scroll' } } zDepth={ 0 }>
               <List>
                  <Subheader>Contacts ({`${this.props.showedConsumersCount} /
                                       ${this.props.consumersCount}`})</Subheader>
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

            <FlatButton
               style={{marginLeft: 70}}
               label='Load More'
               onClick={ this.incrementContactsSubscription.bind(this) }
               primary={true}
            />


         </Paper>

      );

   }
}

export default withTracker((props) => {
   console.log(props);

   Meteor.subscribe('consumers.count', props.businessId);
   return {
      showedConsumersCount: ConsumersCollection.find().count(),
      consumersCount: Counts.get('consumers.count')
   }
})(ContactsList)


