import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import FlatButton from 'material-ui/FlatButton';
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';

import { blue500, blue700, green500, green700, deepOrange500, deepOrange700 } from 'material-ui/styles/colors';

import InboundCallIcon from 'material-ui/svg-icons/communication/call-received';
import OutboundCallIcon from 'material-ui/svg-icons/communication/call-made';
import AllLogIcon from 'material-ui/svg-icons/communication/call';
import { Meteor } from "meteor/meteor";


class CallLogsToolbar extends Component {

   constructor(props) {
      super(props);
      this.state = {
         value: 3,
      };
   }

   handleChange = (event, index, value) => this.setState({ value });

   changeLink(link) {
      this.props.history.push(`/call-logs/${link}`)
   }

   render() {
      return (
         <Toolbar>
            <ToolbarGroup firstChild={ true }>
               <ToolbarTitle text={this.props.toolbarTitle} />
            </ToolbarGroup>


            <ToolbarGroup>
               <span>All</span>
               <IconButton
                  children={ <AllLogIcon color={ blue700 }/> }
                  onClick={this.changeLink.bind(this, 'all')}
               />
               <ToolbarSeparator/>

               { /*----------------------------------------------*/ }

               <IconButton
                  children={ <InboundCallIcon color={ blue700 }/> }
                  onClick={this.changeLink.bind(this, 'inbound')}
               />
               <ToolbarSeparator/>

               { /*----------------------------------------------*/ }


               <IconButton
                  children={ <OutboundCallIcon color={ green700 }/> }
                  onClick={this.changeLink.bind(this, 'outbound')}
               />
               <ToolbarSeparator/>

               { /*----------------------------------------------*/ }

               <IconButton
                  children={ <InboundCallIcon color={ deepOrange700 }/> }
                  onClick={this.changeLink.bind(this, 'missed')}
               />


            </ToolbarGroup>

         </Toolbar>
      );
   }
};

export default withTracker((props) => {
   let toolbarTitle;

   let param = props.match.params.callLogFilter;
   switch (param){
      case 'all':
         toolbarTitle = 'All';
         break;
      case 'inbound':
         toolbarTitle = 'Received Calls';
         break;
      case 'outbound':
         toolbarTitle = 'Calls made';
         break;
      case 'missed':
         toolbarTitle = 'Missed Calls';
         break;
      default:
         break;
   }

   return {
      toolbarTitle
   }

})(CallLogsToolbar)
