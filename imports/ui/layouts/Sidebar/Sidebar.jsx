import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import Drawer from 'material-ui/Drawer';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';

import { currentUser } from '../../../api/Classes/Utils';
import { ROLES } from '../../../api/Classes/Const';
import SuperAdmin from './SuperAdmin';
import BusinessOwner from './BusinessOwner';
import Agent from './Agent';
import Staff from './Staff';
import  Test  from './Test';


// import '../../stylesheets/sidebar.css';

const mql = window.matchMedia(`(min-width: 992px)`);

class Sidebar extends Component {

   constructor(props) {
      super(props);
      this.state = {
         open: true,
         mql: mql
      }
   }

   componentWillMount() {
      mql.addListener(this.mediaQueryChanged.bind(this));
      this.setState({ mql: mql, docked: mql.matches });
   }

   handleSidebarToggle() {
      this.setState({ open: !this.state.open })
   }

   mediaQueryChanged() {
      this.setState({
         mql: mql,
         docked: this.state.mql.matches,
      });
      console.log(this.state.mql);
      console.log(this.state.docked);
      this.handleSidebarToggle();
   }

   renderSidebar(userRole) {
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
      if (!this.props.user) {
         return (
            <div/>
         )
      }

      let drawerStyle = {
         background: 'black',
         backgroundColor: 'black'
      }

      return (
         <div>
            <RaisedButton
               label="Toggle Drawer"
               onClick={ this.handleSidebarToggle.bind(this) }
            />

            <Drawer style={ drawerStyle }
                    className='my-background-color'
                    containerClassName='my-background-color'
                    open={ this.state.open }
                    docked={ this.state.docked }
                    onRequestChange={ this.handleSidebarToggle.bind(this) }
                    openSecondary={ false }
            >
               {/*<AppBar*/}
                  {/*title='txtConsole'*/}
                  {/*showMenuIconButton={ false }*/}
               {/*/>*/}

               <Test/>

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



