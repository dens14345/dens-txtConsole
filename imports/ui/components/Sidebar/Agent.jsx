
import React, { Component } from "react";
import { Link } from 'react-router-dom';



export default class Agent extends Component {

   render() {
      return (
         <li>
            <Link  to='/'>
               <i className="material-icons">email</i>
               for Agent
            </Link>
         </li>
      );
   }
}




