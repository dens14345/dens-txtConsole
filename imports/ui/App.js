import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';


import Routes from '../startup/client/routes';
import { CALL_STATUS } from "../api/Classes/Const";

function logCallToDb({con, callStatus, callDuration=''}){
   let callSid = con.parameters.CallSid;
   let from = con.parameters.From;
   let agentRegisteredName = con.device._clientName;
   let agentNumber = Meteor.user().profile.number;

   Meteor.call('calls.insert', {
      from, agentNumber, callStatus, callDuration, callSid, agentRegisteredName,
   }, (err, succ) => {
      console.log(`call details inserted to database: ${succ}`);
   });
}

(function getToken() {
   let callDuration = 0;
   let timer;

   _closeModal = () => {
      $('#call-modal').css('display', 'none');
      $('#button-container').css('display', 'block');
   };

   _displayModal = (con) => {
      let modal =           $('#call-modal');
      let modalDetails =    $('#call-modal-details');
      let buttonContainer = $('#button-container')
      let btnAnswer =       $('#btn-answerCall');
      let btnReject =       $('#btn-rejectCall');

      modal.css("display", "block");
      modalDetails.text(`Incoming call from: ${con.parameters.From}`);

      btnAnswer.click(() => {
         modalDetails.text(`Ongoing call with ${con.parameters.From}`);

         buttonContainer.css('display', 'none');
         con.accept();

         timer = setInterval(() => {
            callDuration += 1000;
            console.log(callDuration);
         }, 1000);
      });

      btnReject.click(() => {
         modal.css('display', 'none');
         con.reject();
         logCallToDb({con, callStatus: CALL_STATUS.REJECTED});
      });
   };


   $.ajax('/token')
      .done(function (token) {
         console.log(`Got a token: ${token}`);
         Twilio.Device.setup(token, {
            debug: true,
            warnings: true
         });

         Twilio.Device.ready((device) => console.log("App Ready to receive call"));
         Twilio.Device.incoming((con) => {
            _displayModal(con);
         });
         Twilio.Device.disconnect((con) => {
            _closeModal();
            clearInterval(timer);
            logCallToDb({con, callStatus: CALL_STATUS.INBOUND, callDuration});
         });

         Twilio.Device.cancel((con) => {
            _closeModal();
            logCallToDb({con, callStatus: CALL_STATUS.MISSED_CALL});
         });

      }).fail(function () {
         console.log('failed to request to twilio /token');
      });

}());

class App extends Component {
   render() {
      if(!this.props.user){
         return(
            <MuiThemeProvider>
               <Routes/>
            </MuiThemeProvider>
         );
      }
      let theme = '';
      if(this.props.user.profile.theme !== 'undefined'){
         if(this.props.user.profile.theme === 'lightBaseTheme')
            theme = lightBaseTheme;
         else if(this.props.user.profile.theme === 'darkBaseTheme')
            theme = darkBaseTheme;
         else
            theme = lightBaseTheme;
      }else{
         theme = lightBaseTheme;
      }

      return (
         <MuiThemeProvider muiTheme={getMuiTheme(theme)}>
            <Routes/>
         </MuiThemeProvider>
      );
   }

};

export default withTracker(() => {

   return {
      user: Meteor.user()
   }
})(App)




