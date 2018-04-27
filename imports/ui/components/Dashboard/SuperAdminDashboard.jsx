import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';


class SuperAdminDashboard extends Component {

   constructor(props) {
      super(props);
   }


   render() {
      return (
         <div>
            <h4>Super Admin Dashboard</h4>
            <div>testing</div>
            <div>testing</div>
            <div>testing</div>
            <div>testing</div>
         </div>
      );
   }
}

export default withTracker(() => {
   return {

   }
})(SuperAdminDashboard)
