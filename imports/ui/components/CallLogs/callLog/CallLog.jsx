import { Meteor } from 'meteor/meteor';
import React, { Component, Fragment } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import moment from 'moment';
import Divider from 'material-ui/Divider';


class CallLog extends Component {

   constructor(props) {
      super(props);
   }


   render() {
      function getYoutubeLikeToDisplay(millisec) {
         let seconds = (millisec / 1000).toFixed(0);
         let minutes = Math.floor(seconds / 60);
         let hours = "";
         if (minutes > 59) {
            hours = Math.floor(minutes / 60);
            hours = (hours >= 10) ? hours : "0" + hours;
            minutes = minutes - (hours * 60);
            minutes = (minutes >= 10) ? minutes : "0" + minutes;
         }

         seconds = Math.floor(seconds % 60);
         seconds = (seconds >= 10) ? seconds : "0" + seconds;
         if (hours != "") {
            return hours + ":" + minutes + ":" + seconds;
         }
         return minutes + ":" + seconds;
      }

      let { callLog } = this.props;

      return (
         <Fragment>
            <h3>{ callLog.from }</h3>
            <h4>{ getYoutubeLikeToDisplay(callLog.callDuration) }</h4>
            <h4>{moment(callLog.date).format('MMMM Do YYYY, h:mm:ss a')}</h4>
            { console.log(callLog) }
            <Divider/>
         </Fragment>
      );
   }
}

export default withTracker((props) => {
   let user;
   (Meteor.user()) ? user = Meteor.user() : null;

   return {
      user
   }
})(CallLog)



