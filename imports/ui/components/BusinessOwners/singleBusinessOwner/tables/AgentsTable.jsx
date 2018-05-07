import React, { Component, Fragment } from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import { Card, CardTitle, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';

import {
   Table,
   TableBody,
   TableHeader,
   TableHeaderColumn,
   TableRow,
   TableRowColumn,
} from 'material-ui/Table';


class AgentsTable extends Component {

   constructor(props) {
      super(props);
   }

   singleAgent(agentId){
      this.props.history.push(`/agents/${agentId}`);
   }

   render() {
      return (
         <Fragment>
            <Card>
               <CardTitle title='Agents'/>
               <CardText>
                  <Table
                     fixedHeader={ true }
                     selectable={ false }
                     multiSelectable={ false }
                  >
                     <TableHeader
                        displaySelectAll={ false }
                        adjustForCheckbox={ false }
                        displayRowCheckbox={ false }
                        enableSelectAll={ false }
                     >

                        <TableRow>
                           <TableHeaderColumn>Name</TableHeaderColumn>
                           <TableHeaderColumn>Number</TableHeaderColumn>
                           <TableHeaderColumn>Status</TableHeaderColumn>
                           <TableHeaderColumn>Action</TableHeaderColumn>
                        </TableRow>
                     </TableHeader>

                     <TableBody
                        displayRowCheckbox={ false }
                        showRowHover={ true }
                     >
                        {console.log(this.props)}
                        {console.log(this.props.history)}
                        {
                           this.props.agents.map((agent) => (
                              <TableRow key={ agent._id }>
                                 <TableRowColumn>{ agent.profile.name }</TableRowColumn>
                                 <TableRowColumn> { agent.profile.number }</TableRowColumn>
                                 <TableRowColumn> { agent.profile.status }</TableRowColumn>
                                 <TableRowColumn>
                                    <RaisedButton
                                       label='View'
                                       primary={true}
                                       onClick={this.singleAgent.bind(this, agent._id)}
                                    />
                                 </TableRowColumn>
                              </TableRow>
                           ))
                        }

                     </TableBody>
                  </Table>
               </CardText>

            </Card>
         </Fragment>
      );
   }
}

export default withTracker((props) => {

   return {
      agents: Meteor.users.find({ 'profile.role': 'agent' }, { limit: 20 }).fetch()
   };
})(AgentsTable)



