
import React, { Component, Fragment } from "react";
import { Link } from 'react-router-dom';
import MenuItem from 'material-ui/MenuItem';

export default class BusinessOwner extends Component {

   render() {
      return (
         <Fragment>
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
         </Fragment>
      );
   }
}



