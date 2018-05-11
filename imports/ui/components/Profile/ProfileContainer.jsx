import { Meteor } from 'meteor/meteor';
import React, { Component, Fragment } from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import Close from 'material-ui/svg-icons/navigation/close'
import FlatButton from 'material-ui/FlatButton'
import CommunicationCall from 'material-ui/svg-icons/communication/call'
import { deepOrange500 } from 'material-ui/styles/colors'
import TextField from 'material-ui/TextField';

import ReactMaterialUiNotifications from 'react-materialui-notifications';
import moment from 'moment';

import Navbar from '../../layouts/Navbar/Navbar';
import Sidebar from '../../layouts/Sidebar/Sidebar';

import ProfileForm from './form/ProfileForm';
import { ROLES } from '../../../api/Classes/Const';
import { currentUser } from '../../../api/Classes/Utils';



class ProfileContainer extends Component {

   constructor(props) {
      super(props);
      if (!Meteor.userId()) {
         this.props.history.replace('/login');
      }
      this.state = {
         count: 0,
         showNotification: false,
         value: '',
         openModalState: false,
         emailBody: '',
         emailTo: ''

      };
   }

   renderProfileForm(userRole) {
      switch (userRole) {
         case ROLES.SUPER_ADMIN:
         // return <SuperAdmin/>
         case ROLES.STAFF:
            return <ProfileForm account={ currentUser() }/>;
         case ROLES.B_OWNER:
         // return <BusinessOwner/>;
         case ROLES.AGENT:
            return <ProfileForm account={ currentUser() }/>;
         default:
            break;
      }
   }

   notify() {

      console.log(`notify function clicked`);
      ReactMaterialUiNotifications.showNotification({
         title: 'Title',
         additionalText: `Some message to be displayed ${this.state.count}`,
         icon: <CommunicationCall/>,
         iconBadgeColor:
         deepOrange500,
         overflowContent:
            <div>
               <FlatButton
                  label='dismiss'
                  icon={ <Close/> }
               />
               <FlatButton
                  label='answer'
                  icon={ <CommunicationCall/> }
               />
            </div>,
         timestamp:
            moment().format('h:mm A'),
         personalised:
            true,
         avatar:
            'demo.png',
         priority:
            true,
         zDepth:
            4
      });

      this.setState({
         count: ++this.state.count
      })
   }



   render() {
      if (!this.props.user) {
         return (
            <div/>
         )
      }

      return (
         <div>
            <Navbar/>
            <Sidebar/>
            <div className='my-container'>
               <AppBar
                  title='Profile'
                  showMenuIconButton={ false }
               />
              {/* <RaisedButton
                  label='Notification'
                  onClick={ this.notify.bind(this) }
               />

               <RaisedButton
                  label='Send Email'
                             onClick={ () => {this.setState({ openModalState: true })} }
               />*/}


               { /* <ReactMaterialUiNotifications
                  desktop={ true }
                  transitionName={ {
                     leave: 'dummy',
                     leaveActive: 'fadeOut',
                     appear: 'dummy',
                     appearActive: 'zoomInUp'
                  } }
                  transitionAppear={ true }
                  transitionLeave={ true }
                  autoHide={ 5000 }
               />*/ }


               {
                  (typeof currentUser() === 'undefined') ?
                     null : this.renderProfileForm(currentUser().profile.role)
               }
            </div>
         </div>

      );

   }
}

export default withTracker((props) => {
   // let user = Meteor.user();
   return {
      user: Meteor.user(),
   }
})(ProfileContainer)



