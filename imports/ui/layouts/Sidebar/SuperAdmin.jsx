
import React, { Component, Fragment} from "react";
import { Link } from 'react-router-dom';
import MenuItem from 'material-ui/MenuItem';

import PeopleIcon from 'material-ui/svg-icons/communication/contacts'
import ProfileIconCircle from 'material-ui/svg-icons/action/account-circle';

export default class SuperAdmin extends Component {

   render() {
      return (
         <Fragment>
            <Link to='/staffs'>
               <MenuItem leftIcon={<PeopleIcon/>}>
                  Staffs
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




