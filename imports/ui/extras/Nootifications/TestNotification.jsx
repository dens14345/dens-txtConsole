import React, { Component, Fragment } from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import { Notification, NotificationActions, NotificationContainer } from 'material-ui-notifications';




class TestNotification extends Component {

   constructor(props) {
      super(props);

   }




   render() {

      return (
         <Fragment>
            <NotificationContainer/>
         </Fragment>

      );

   }
}

export default withTracker((props) => {

   return {

   }
})(TestNotification)



