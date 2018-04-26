
import React, { Component } from "react";
import { Link } from 'react-router-dom';

export default class SuperAdmin extends Component {

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
                  Staff
               </Link>
            </li>
         </div>
      );
   }
}




