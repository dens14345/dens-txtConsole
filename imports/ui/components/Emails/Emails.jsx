import React, { Component, Fragment } from 'react';
import { withTracker } from 'meteor/react-meteor-data';


class Emails extends Component {

   constructor(props) {
      super(props);
   }

   render() {
      return (
         <Fragment>
            <h1>Emails Component</h1>
         </Fragment>
      );
   }
}

export default withTracker(() => {
   return {}
})(Emails)



