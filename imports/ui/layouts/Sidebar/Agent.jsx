import React, { Component, Fragment } from "react";
import { Link } from 'react-router-dom';
import MenuItem from 'material-ui/MenuItem';
import MessageIcon from 'material-ui/svg-icons/communication/message'
import PeopleIcon from 'material-ui/svg-icons/communication/contacts'
import CallLogIcon from 'material-ui/svg-icons/communication/call';
import ProfileIconCircle from 'material-ui/svg-icons/action/account-circle';


export default class Agent extends Component {

   render() {
      return (
         <Fragment>
            <Link to='/inbox'>
               <MenuItem leftIcon={ <MessageIcon/> }>
                  Inbox
               </MenuItem>
            </Link>
            <Link to='/contacts'>
               <MenuItem leftIcon={ <PeopleIcon/> }>
                  Contacts
               </MenuItem>
            </Link>
            <Link to='/call-logs'>
               <MenuItem leftIcon={ <CallLogIcon/> }>
                  Call logs
               </MenuItem>
            </Link>
            <Link to='/profile'>
               <MenuItem leftIcon={ <ProfileIconCircle/> }>
                  Profile
               </MenuItem>
            </Link>
         </Fragment>
      );
   }
}


/*<Fragment>
            <Link  to='/dashboard'>
               <MenuItem>
                  Dashboard
               </MenuItem>
            </Link>
            <Link  to='/businesses'>
               <MenuItem>
                  Businesses
               </MenuItem>
            </Link>
            <Link  to='/agents'>
               <MenuItem>
                  Agents
               </MenuItem>
            </Link>
         </Fragment>*/