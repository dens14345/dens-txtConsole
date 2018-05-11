import React, { Component, Fragment } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';

import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Person from 'material-ui/svg-icons/social/person';
import EmailIcon from 'material-ui/svg-icons/communication/email';
import MessageIcon from 'material-ui/svg-icons/communication/message';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import ThemeIcon from 'material-ui/svg-icons/image/palette';
import LeftIcon from 'material-ui/svg-icons/navigation/chevron-left';
import LogoutIcon from 'material-ui/svg-icons/action/power-settings-new';

import Divider from 'material-ui/Divider';


import MaterialModal from '../../extras/Modal/MaterialModal';
import { ROLES } from '../../../api/Classes/Const';


class Navbar extends Component {
   constructor(props) {
      super(props);
      this.state = {
         value: 3,
         openEmailModalState: false,
         openMessageModalState: false,

         messageBody: '',

         emailBody: '',
         emailTo: ''
      };
   }

   toggleEmailModal() {
      this.setState({ openEmailModalState: !this.state.openEmailModalState });
   }

   toggleMessageModal() {
      this.setState({ openMessageModalState: !this.state.openMessageModalState });
   }

   logout(e) {
      e.preventDefault();
      Meteor.logout();
      window.localStorage.removeItem('Meteor.loginToken');
      window.localStorage.removeItem('Meteor.loginTokenExpires');
      window.localStorage.removeItem('Meteor.userId');
      window.location.replace('/login');
   }

   handleChange = (event, index, value) => this.setState({ value });

   updateTheme(theme) {
      Meteor.users.update({ _id: Meteor.userId() }, { $set: { 'profile.theme': theme } });
   }


   isAgent() {

      return (
         <Fragment>
            <IconButton tooltip='Compose new message' onClick={ this.toggleMessageModal.bind(this) }>
               <MessageIcon/>
            </IconButton>
            <IconButton tooltip='Compose Email' onClick={ this.toggleEmailModal.bind(this) }>
               <EmailIcon/>
            </IconButton>
         </Fragment>
      )
   }


   sendEmail() {
      console.log('Email To: ', this.state.emailTo);
      console.log('EmailBody: ', this.state.emailBody);
      let to = this.state.emailTo;
      let htmlEmailBody = this.state.emailBody;
      let agentEmail = Meteor.user().emails[0].address;

      Bert.alert('Sending Email', 'info', 'growl-top-right');

      let self = this;
      Meteor.call('email.send', {
         to,
         htmlEmailBody,
         from: agentEmail,
      }, function (err, succ) {

         console.log('error: ', err);
         console.log('succucces: ', succ);

         if (succ) {
            Bert.alert('Email sent', 'success', 'growl-top-right');
            self.setState({ emailTo: '', emailBody: '' });
         }

         if (err || !succ)
            Bert.alert('Email not sent', 'danger', 'growl-top-right');
      });
   }

   sendMessage() {
      let self = this;
      let messageBody = this.state.messageBody;
      // let agentNumber = this.props.agentNumber;
      let agentNumber = this.props.user.profile.number;
      let To = Meteor.settings.public.myNumber;

      Bert.alert('Sending message', 'info', 'growl-top-right');

      Meteor.call('sendMessage', { messageBody, agentNumber, To }, function (err, messageData) {
         console.log(err);
         console.log(messageData);
         if (messageData) {
            Bert.alert('Message Sent', 'success', 'growl-top-right');
            self.setState({ messageBody: '' });
         }

         if (err)
            Bert.alert('Message not set', 'danger', 'growl-top-right');
      });
   }


   render() {

      if (!this.props.user) {
         return (
            <div/>
         )
      }

      return (
         <div className='my-container'>
            <AppBar
               title={ this.props.user.username }
               iconElementLeft={ <IconButton><Person/></IconButton> }
               iconElementRight={
                  <Fragment>
                     {
                        (this.props.user.profile.role === ROLES.AGENT) ?
                           this.isAgent() : null
                     }
                     <IconMenu
                        iconButtonElement={ <IconButton><MoreVertIcon/></IconButton> }
                     >
                        <MenuItem primaryText='Theme'
                                  leftIcon={ <LeftIcon/> }
                                  menuItems={ [
                                     <MenuItem primaryText='Light Theme'
                                               onClick={ this.updateTheme.bind(this, 'lightBaseTheme') }
                                     />,
                                     <MenuItem primaryText='Dark Theme'
                                               onClick={ this.updateTheme.bind(this, 'darkBaseTheme') }
                                     />
                                  ] }
                        />
                        <Divider/>
                        <MenuItem primaryText='Sign out'
                                  onClick={ this.logout }
                                  leftIcon={<LogoutIcon/>}
                        />
                     </IconMenu>
                  </Fragment>

               }
            />

            { /*compose Email modal*/ }
            <MaterialModal title={ `Send Email` }
                           open={ this.state.openEmailModalState }
                           closeModal={ this.toggleEmailModal.bind(this) }
                           submit={ this.sendEmail.bind(this) }>

               <TextField
                  floatingLabelText='To'
                  value={ this.state.emailTo }
                  onChange={ (e) => this.setState({ emailTo: e.target.value }) }
               />

               <ReactQuill
                  theme='snow'
                  value={ this.state.emailBody }
                  onChange={ (e) => {
                     this.setState({ emailBody: e })
                  } }
                  style={ { height: 180 } }/>

            </MaterialModal>

            { /*Compose message modal*/ }
            <MaterialModal title={ `Compose new message` }
                           open={ this.state.openMessageModalState }
                           closeModal={ this.toggleMessageModal.bind(this) }
                           submit={ this.sendMessage.bind(this) }>

               <TextField
                  floatingLabelText='To'
                  value={ this.state.emailTo }
                  onChange={ (e) => this.setState({ emailTo: e.target.value }) }
               />

               <TextField
                  floatingLabelText='Type Message'
                  multiLine={ true }
                  rows={ 2 }
                  rowsMax={ 4 }
                  fullWidth={ true }
                  value={ this.state.messageBody }
                  onChange={ (e) => {
                     this.setState({ messageBody: e.target.value })
                  } }
               />


            </MaterialModal>
         </div>
      );
   }
}


export default withTracker((props) => {

   return {
      user: Meteor.users.findOne()
   }
})(Navbar)






