import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import Drawer from 'material-ui/Drawer';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton'

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
      this.state = { open: true }
   }

   handleSidebarToggle() {
      this.setState({ open: !this.state.open })
   }

   renderSidebar(userRole) {
      console.log(`userRole: ${userRole}`);
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

   render() {
      if(!this.props.user){
         return(
            <div/>
         )
      }

      return (
         <div>
            <RaisedButton
               label="Toggle Drawer"
               onClick={ this.handleSidebarToggle.bind(this) }
            />

            <Drawer open={ this.state.open }
                    docked={ true }
                    onRequestChange={ this.handleSidebarToggle.bind(this) }
                    openSecondary={ false }
            >
               <RaisedButton
                  label="Toggle Drawer"
                  onClick={ this.handleSidebarToggle.bind(this) }
               />
               <Divider/>
               {
                  (typeof currentUser() === 'undefined') ?
                     null : this.renderSidebar(currentUser().profile.role)
               }
            </Drawer>
         </div>

      );
   }
}

export default withTracker(() => {
   return {
      user: Meteor.user()
   }
})(Sidebar)



