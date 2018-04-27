import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Route } from 'react-router-dom';

import Navbar from '../Navbar/Navbar';
import Sidebar from '../Sidebar/Sidebar';

import AgentsTable from './extras/AgentsTable';


class AgentsContainer extends Component {

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
            <div className="container-fluid">
               <h1>Agents</h1>
               <AgentsTable/>
            </div>
         </div>

      );

   }
}

export default withTracker(() => {


   return {}
})(AgentsContainer)



