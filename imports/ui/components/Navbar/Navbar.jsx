import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { Link } from "react-router-dom";
import { withTracker } from 'meteor/react-meteor-data';
import { Modal, Button } from 'react-materialize';
import Sidebar from '../Sidebar/Sidebar';


class Navbar extends Component {

   logout(e) {
      e.preventDefault();
      Meteor.logout();
      window.location.replace('/login');
   }

   render() {

      if (!this.props.user) {
         return (
            <div/>
         )
      }


      return (
         <div>

            <div className="row">
               <div className="col-sm"><p>column</p></div>
               <div className="col-sm"><p>column</p></div>
               <div className="col-sm"><p>column</p></div>
            </div>
            <div className="row">
               <div className="col-xs">
                  <div className="box">auto</div>
               </div>
               <div className="col-xs">
                  <div className="box">auto</div>
               </div>
               <div className="col-xs">
                  <div className="box">auto</div>
               </div>
            </div>
            {/*<nav className="nav-extended teal">
               <div>
                  <div className="row">
                     <div className="col-sm">
                        <a href="#" className="brand-logo">Messaging app</a>
                     </div>
                     <div className="col-sm">
                        <ul id="nav-mobile" className="right hide-on-med-and-down">
                           <li>
                              <a href=''>
                                 {
                                    (typeof this.props.user.profile.firstname === 'undefined') ?
                                       this.props.user.username :
                                       `${this.props.user.profile.firstname}
                                     ${this.props.user.profile.lastname}`
                                 }
                              </a>
                           </li>
                           <li><a href="#" onClick={ this.logout.bind(this) }> <i
                              className="material-icons">power_settings_new</i> </a>
                           </li>
                        </ul>
                     </div>
                  </div>

               </div>
            </nav>*/}


         </div>
      )
   }
}


export default withTracker((props) => {

   return {
      user: Meteor.users.findOne()
   }
})(Navbar)






