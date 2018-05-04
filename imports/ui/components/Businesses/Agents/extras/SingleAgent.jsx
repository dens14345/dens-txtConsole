import { Meteor } from 'meteor/meteor';
import React, { Component, Fragment } from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import { Progress } from '../../../extras/Progress';
import AppBar from 'material-ui/AppBar';


import { BusinessesCollection } from '../../../../../api/businesses/businesses';


class SingleAgent extends Component {

   constructor(props) {
      super(props);

   }


   render() {
      let { agent } = this.props;
      if (!agent)
         return <Progress/>;

      return (
         <Fragment>
            { /*<h1>{agent.profile.name}</h1>*/ }
            <AppBar
               title={`${agent.username} (${agent.profile.name})`}
               showMenuIconButton={false}
            />

         </Fragment>
      );
   }
}

export default withTracker((props) => {
   console.log(props)

   let agentId = props.match.params.agentId;
   console.log(Meteor.users.findOne({ _id: agentId }));

   return {
      user: Meteor.user(),
      agent: Meteor.users.findOne({ _id: agentId })
   }
})(SingleAgent)



