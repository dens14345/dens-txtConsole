import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import Routes from '../startup/client/routes';

class App extends Component {
   render() {
      if(!this.props.user){
         return(
            <MuiThemeProvider>
               <Routes/>
            </MuiThemeProvider>
         );
      }
      let theme = '';
      if(this.props.user.profile.theme !== 'undefined'){
         if(this.props.user.profile.theme === 'lightBaseTheme')
            theme = lightBaseTheme;
         else if(this.props.user.profile.theme === 'darkBaseTheme')
            theme = darkBaseTheme;
         else
            theme = lightBaseTheme;
      }else{
         theme = lightBaseTheme;
      }

      return (
         <MuiThemeProvider muiTheme={getMuiTheme(theme)}>
            <Routes/>
         </MuiThemeProvider>
      );
   }

};

export default withTracker(() => {

   return {
      user: Meteor.user()
   }
})(App)




