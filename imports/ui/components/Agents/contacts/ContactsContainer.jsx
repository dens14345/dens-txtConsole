import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Route } from 'react-router-dom';

import Navbar from '../../Navbar/Navbar';
import Sidebar from '../../Sidebar/Sidebar';

class ContactsContainer extends Component {

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
            <div className="my-container">
               <h1>contacts container</h1>
               <Card>
                  <CardTitle title="Consumers"/>

                  <CardText>


                  </CardText>

               </Card>
            </div>
         </div>

      );

   }
}

export default withTracker(() => {
   return {}
})(ContactsContainer)



