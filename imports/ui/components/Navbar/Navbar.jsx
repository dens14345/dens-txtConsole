import React, { Component, Fragment } from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { Link } from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';

import Logout from 'material-ui/svg-icons/action/power-settings-new';
import VerticalMenu from 'material-ui/svg-icons/navigation/more-vert';
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';
import FontIcon from 'material-ui/FontIcon';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import DropDownMenu from 'material-ui/DropDownMenu';
import RaisedButton from 'material-ui/RaisedButton';
import ArrowLeft from 'material-ui/svg-icons/hardware/keyboard-arrow-left';
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import AppBar from 'material-ui/AppBar';
import Divider from 'material-ui/Divider';

import FlatButton from 'material-ui/FlatButton';

import { Modal, Button } from 'react-materialize';


import Sidebar from '../Sidebar/Sidebar';


class Navbar extends Component {
   constructor(props) {
      super(props);
      this.state = {
         value: 3,
      };
   }

   logout(e) {
      e.preventDefault();
      Meteor.logout();
      window.location.replace('/login');
   }

   handleChange = (event, index, value) => this.setState({ value });

   updateTheme(theme) {
      Meteor.users.update({ _id: Meteor.userId() }, { $set: { 'profile.theme': theme } });
   }

   render() {

      if (!this.props.user) {
         return (
            <div/>
         )
      }


      return (
         <div className='my-container'>
            <AppBar
               title='Inbox'
               // onTitleClick={ handleClick }

               iconElementRight={
                  <IconMenu
                     iconButtonElement={ <IconButton><MoreVertIcon/></IconButton> }
                     anchorOrigin={ { horizontal: 'left', vertical: 'top' } }
                     targetOrigin={ { horizontal: 'left', vertical: 'top' } }
                  >
                     <MenuItem primaryText='Theme'
                               rightIcon={ <ArrowDropRight/> }
                               menuItems={ [
                                  <MenuItem primaryText='Light Theme'
                                            onClick={ this.updateTheme.bind(this, 'lightBaseTheme') }
                                  />,
                                  <MenuItem primaryText='Dark Theme'
                                            onClick={ this.updateTheme.bind(this, 'darkBaseTheme') }
                                  />
                               ] }
                     />
                     <MenuItem primaryText='Send feedback'/>
                     <MenuItem primaryText='Settings'/>
                     <MenuItem primaryText='Help'/>
                     <Divider/>
                     <MenuItem primaryText='Sign out'
                               onClick={this.logout.bind(this)}
                     />
                  </IconMenu>
               }
            />
            { /*   <Toolbar>
               <ToolbarGroup firstChild={ true }>
                  <RaisedButton label='Inbox' primary={ true }/>
               </ToolbarGroup>
               <ToolbarGroup>
                  <ToolbarTitle text='Options'/>
                  <FontIcon className='muidocs-icon-custom-sort'/>
                  <ToolbarSeparator/>
                  <IconMenu
                     iconButtonElement={
                        <IconButton touch={ true }>
                           <NavigationExpandMoreIcon/>
                        </IconButton>
                     }
                  >
                     <MenuItem primaryText='Download'/>
                     <MenuItem primaryText='More Info'/>
                  </IconMenu>
               </ToolbarGroup>
            </Toolbar>*/ }

            { /* <div className='row'>
               <div className='col-md-8'>
                  <h4>Testing</h4>
               </div>
               <div className='col-md-2'>
                  <Logout/>
                  <VerticalMenu/>

               </div>
               <div className='col-md-2'>

               </div>
            </div>*/ }

            { /*  <nav className='nav-extended teal'>
               <div>
                  <div className='row'>
                     <div className='col-sm-8'>
                        <a href='#'>Messaging app</a>
                     </div>
                     <div className='col-sm-4'>
                        <ul id='nav-mobile' className='right hide-on-med-and-down'>
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
                           <li><a href='#' onClick={ this.logout.bind(this) }> <i
                              className='material-icons'>power_settings_new</i> </a>
                           </li>
                        </ul>
                     </div>
                  </div>

               </div>
            </nav>*/ }
         </div>
      )
   }
}


export default withTracker((props) => {

   return {
      user: Meteor.users.findOne()
   }
})(Navbar)






