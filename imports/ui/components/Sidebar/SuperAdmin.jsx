
import React, { Component, Fragment} from "react";
import { Link } from 'react-router-dom';
import MenuItem from 'material-ui/MenuItem';

export default class SuperAdmin extends Component {

   render() {
      return (
         <Fragment>
            <Link to='/dashboard'>
               <MenuItem>
                  Dashboard
               </MenuItem>
            </Link>
            <Link to='/staffs'>
               <MenuItem>
                  Staffs
               </MenuItem>
            </Link>
            <Link to='/profile'>
               <MenuItem>
                  Profile
               </MenuItem>
            </Link>
         </Fragment>
      );
   }
}




