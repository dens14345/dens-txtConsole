
import React, { Component } from "react";
import { Link } from 'react-router-dom';

export default class BusinessOwner extends Component {

   render() {
      return (
         <div>
            <li>
               <Link  to='/dashboard'>
                  <i className="material-icons">dashboard</i>
                  dashboard
               </Link>
            </li>
            <li>
               <Link  to='/'>
                  <i className="material-icons">email</i>
                  for business
               </Link>
            </li>
         </div>

      );
   }
}




