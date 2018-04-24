import React, { Component } from 'react';
import { render } from 'react-dom';
import { withTracker } from 'meteor/react-meteor-data';
import { Route, Link, NavLink } from 'react-router-dom';


// import '../../stylesheets/sidebar.css';

class Sidebar extends Component {

   constructor(props) {
      super(props);

   }

   render() {
      return (
         <div className="">
            <ul id="sidebar" className="side-nav fixed ">
               <li>
                  <div id="test" className="user-view">
                     <div className="background">
                        <img
                           src="https://image.freepik.com/free-vector/watercolor-background-with-stars_23-2147659850.jpg"/>
                     </div>

                     <a className="center-align">
                        <img src="https://react-materialize.github.io/img/react-materialize-logo.svg"
                             height="70" width="70" className="circle responsive-img center-image"/>
                     </a>

                     <a href="#">
                        <span className="center-align white-text name">John Doe</span>
                     </a>
                     <a href="#">
                        <span className="center-align white-text email">_</span>
                     </a>

                  </div>
               </li>




               <li>
                  <div className="divider">_</div>
               </li>


            </ul>

            <a href="#" data-activates="slide-out" className="button-collapse">
               <i className="material-icons">menu</i>
            </a>


         </div>
      );
   }
}

export default withTracker(() => {
   return {}
})(Sidebar)



