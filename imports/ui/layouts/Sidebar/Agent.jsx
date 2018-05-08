import React, { Component, Fragment } from "react";
import { Link } from 'react-router-dom';
import MenuItem from 'material-ui/MenuItem';


export default class Agent extends Component {

   render() {
      return (
         <Fragment>
            <Link to='/inbox'>
               <MenuItem>
                  Inbox
               </MenuItem>
            </Link>
            <Link to='/contacts'>
               <MenuItem>
                  Contacts
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