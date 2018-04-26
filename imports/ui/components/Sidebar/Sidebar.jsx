import React, { Component } from 'react';
import { render } from 'react-dom';
import { withTracker } from 'meteor/react-meteor-data';
import { Route, Link, NavLink } from 'react-router-dom';


import { currentUser } from '../../../api/Classes/Utils';
import { ROLES } from '../../../api/Classes/Const';
import SuperAdmin from './SuperAdmin';
import BusinessOwner from './BusinessOwner';
import Agent from './Agent';
import Staff from './Staff';

// import '../../stylesheets/sidebar.css';

class Sidebar extends Component {

   constructor(props) {
      super(props);
      $('.button-collapse').sideNav({
         menuWidth: 500, // Default is 300
         edge: 'right', // Choose the horizontal origin
         closeOnClick: true,
         draggable: true
      });
   }

   toggleSidebar(){
      $('.button-collapse').sideNav('show');
   }

   renderSidebar(userRole) {
      console.log(`userRole: ${userRole} ROLES.B_OWNER: ${ROLES.B_OWNER}`);
      switch (userRole) {
         case ROLES.SUPER_ADMIN:
            return <SuperAdmin/>
         case ROLES.B_OWNER:
            return <BusinessOwner/>;
         case ROLES.AGENT:
            return <Agent/>;
         case ROLES.STAFF:
            return <Staff/>;
         default:
            break;
      }
   }

   renderTest() {
      return <Agent/>
   }

   render() {
      return (
         <div>
            <ul id='sidebar' className='side-nav fixed'>
               <li>
                  <div id='test' className='user-view'>
                     <div className='background'>
                        <img
                           src='https://image.freepik.com/free-vector/watercolor-background-with-stars_23-2147659850.jpg'/>
                     </div>

                     <a className='center-align'>
                        <img src='https://react-materialize.github.io/img/react-materialize-logo.svg'
                             height='70' width='70' className='circle responsive-img center-image'/>
                     </a>

                     <a href='#'>
                        <span className='center-align white-text name'>

                        </span>
                     </a>
                     <a href='#'>
                        <span className='center-align white-text email'>_</span>
                     </a>

                  </div>
               </li>

               <li>
                  <div className='divider'>_</div>
               </li>

               {
                  (typeof currentUser() === 'undefined') ?
                     null : this.renderSidebar(currentUser().profile.role)
               }
            </ul>

            <a href='#' data-activates='slide-out' className='button-collapse'
               onClick={this.toggleSidebar.bind(this)}>
               <i className='material-icons'>menu</i>
            </a>
`
         </div>
      );
   }
}

export default withTracker(() => {
   return {
      user: Meteor.user()
   }
})(Sidebar)



