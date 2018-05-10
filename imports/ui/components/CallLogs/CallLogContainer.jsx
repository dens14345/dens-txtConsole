import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';

import { Progress } from '../../extras/Progress';

import Navbar from '../../layouts/Navbar/Navbar';
import Sidebar from '../../layouts/Sidebar/Sidebar';
import CallLogsToolbar from './toolbar/CallLogsToolbar';
import CallLog from './callLog/CallLog';
import { CallsCollection } from "../../../api/calls/calls";


class CallLogContainer extends Component {

   constructor(props) {
      super(props);
      console.log(props);
      let path = props.location.pathname;

      if (!Meteor.userId()) {
         this.props.history.replace('/login');
      }
      if (path === '/call-logs' || path === /call-logs/) {
         this.props.history.replace('/call-logs/all');
      }
   }


   render() {
      if (!this.props.user) {
         return (<Progress/>)
      } else {
         // if (userRole() === ROLES.AGENT) {
         //    this.props.history.replace('/inbox');
         // }
      }


      return (
         <div>
            <Navbar/>
            <Sidebar/>
            <div className='my-container'>
               <CallLogsToolbar { ...this.props }/>
               <h1>Call logs</h1>

               {
                  this.props.callLogs.map((callLog) => (
                     // console.log(callLog._id._str);

                     <CallLog key={callLog._id._str}
                              callLog={callLog}
                     />
                  ))
               }


            </div>
         </div>
      );
   }
}

export default withTracker((props) => {
   let user;
   (Meteor.user()) ? user = Meteor.user() : null;

   let param = props.match.params.callLogFilter;

   let agentNumber;
   if (user) {
      agentNumber = user.profile.number;
   }

   switch (param) {
      case 'all':
         console.log(param);
         Meteor.subscribe('calls.agent.all', agentNumber);
         break;
      case 'inbound':
         console.log(param);
         Meteor.subscribe('calls.agent.callStatus', agentNumber, 'inbound');
         break;
      case 'outbound':
         console.log(param);
         Meteor.subscribe('calls.agent.callStatus', agentNumber, 'outbound');
         break;
      case 'missed':
         console.log(param);
         Meteor.subscribe('calls.agent.missedCalls', agentNumber);
         break;
      default:
         break;
   }

   return {
      user,
      callLogs: CallsCollection.find().fetch()
   }
})(CallLogContainer)



