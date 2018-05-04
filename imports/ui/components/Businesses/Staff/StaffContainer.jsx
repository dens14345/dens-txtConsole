import React, { Component, Fragment } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Route } from 'react-router-dom';


import { ROLES } from '../../../../api/Classes/Const';


class StaffContainer extends Component {

   constructor(props) {
      super(props);

   }


   render() {


      return (
         <Fragment>
           <h1>Staffs Container</h1>
         </Fragment>

      );
   }
}

export default withTracker(() => {

   return {

   }
})(StaffContainer)



