import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { Link } from "react-router-dom";
import { withTracker } from 'meteor/react-meteor-data';
import { Modal, Button } from 'react-materialize';


class Navbar extends Component {

   logout(e) {
      e.preventDefault();
      Meteor.logout();
   }

   render() {

      if(!this.props.user){
         return (
            <span>not logged in</span>
         )
      }


      return (
         <div>
            <ul className="dropdown-content">
               <li><a href="">one</a></li>
               <li><a href="">two</a></li>
               <li className="divider"></li>
               <li><a href="">three</a></li>
            </ul>
            <nav className="nav-extended teal">
               <div className="nav-wrapper">
                  <a href="#" className="brand-logo">Messaging app</a>
                  <a href="#" data-activates="mobile-demo" className="button-collapse"><i
                     className="material-icons">menu</i></a>
                  <ul id="nav-mobile" className="right hide-on-med-and-down">
                     <li>
                        { /* <a href=""><img style={ { marginTop: '10px' } } height={ 40 } src="/img/user-avatar.png"
                                        alt="user-avatar"
                                        className="circle teal lighten-2"/></a>*/ }
                     </li>
                     <li>
                        <a href=''>
                           {
                              (typeof this.props.user.profile.firstname === 'undefined')?
                                 this.props.user.username :
                                 `${this.props.user.profile.firstname}
                                  ${this.props.user.profile.lastname}`
                           }
                        </a>
                     </li>

                     <li><a href="#" onClick={ this.logout.bind(this) }> <i className="material-icons">power_settings_new</i> </a>
                     </li>

                  </ul>
                  <ul className="side-nav" id="mobile-demo">
                     <li><a href="">Sass</a></li>
                     <li><a href="">Components</a></li>
                     <li><a href="">JavaScript</a></li>
                  </ul>
               </div>
            </nav>


         </div>
      )
   }
}



export default withTracker(() => {

   return {
      user: Meteor.users.findOne()
   }
})(Navbar)






