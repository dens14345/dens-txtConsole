import React, { Component, Fragment } from "react";
import { Link } from 'react-router-dom';
import MenuItem from 'material-ui/MenuItem';

import DashboardIcon from 'material-ui/svg-icons/action/dashboard';
import BusinessIcon from 'material-ui/svg-icons/communication/business';
import PeopleIcon from 'material-ui/svg-icons/communication/contacts'
import ProfileIconCircle from 'material-ui/svg-icons/action/account-circle';



export default class Staff extends Component {

   render() {
      return (
         <Fragment>
            <Link to='/dashboard'>
               <MenuItem leftIcon={<DashboardIcon/>}>
                  Dashboard
               </MenuItem>
            </Link>
            <Link to='/businesses'>
               <MenuItem leftIcon={<BusinessIcon/>}>
                  Businesses
               </MenuItem>
            </Link>
            <Link to='/agents'>
               <MenuItem leftIcon={<PeopleIcon/>}>
                  Agents
               </MenuItem>
            </Link>
            <Link to='/profile'>
               <MenuItem leftIcon={<ProfileIconCircle/>}>
                  Profile
               </MenuItem>
            </Link>
         </Fragment>

      );
   }
}




