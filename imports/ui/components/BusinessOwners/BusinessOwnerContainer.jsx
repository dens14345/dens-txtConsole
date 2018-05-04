import React, { Component, Fragment } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Route } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { ROLES } from '../../../api/Classes/Const';
import { Progress } from '../extras/Progress';
import { NotAllowed } from '../extras/NotAllowed';

import Navbar from '../Navbar/Navbar';
import Sidebar from '../Sidebar/Sidebar';

import BusinessOwners from './businessOwners/BusinessOwners';
import SingleBusinessOwner from './singleBusinessOwner/SingleBusinessOwner'


class BusinessOwnerContainer extends Component {

   constructor(props) {
      super(props);
      if (!Meteor.userId()) {
         this.props.history.replace('/login');
      }
   }


   render() {
      if (!this.props.user) {
         return (<Progress/>)
      } else {
         switch (this.props.user.profile.role) {
            case ROLES.B_OWNER:
               return <NotAllowed/>;
            case ROLES.AGENT:
               return <NotAllowed/>;
            default:
               break;
         }
      }

      return (
         <Fragment>
            <Navbar/>
            <Sidebar/>
            <div className="my-container">
               <Route exact path='/business-owners' component={ BusinessOwners }/>
               <Route exact path='/business-owners/:b_ownerId' component={ SingleBusinessOwner }/>
               <Route exact path='/business-owners/:b_ownerId/businesses' component={ () => <h1>businesses</h1> }/>
            </div>
         </Fragment>

         /*<Fragment>
            <Route exact path='/business-owners' component={ BusinessOwners }/>
            <Route exact path='/business-owners/:b_ownerId' component={ () => <h1>:b_ownerId</h1> }/>
            <Route exact path='/business-owners/:b_ownerId/businesses' component={ () => <h1>businesses</h1> }/>
         </Fragment>*/
      );
   }
}

export default withTracker(() => {

   return {
      //   load the businesses and business owners here.
      user: Meteor.user()

   }
})(BusinessOwnerContainer)



