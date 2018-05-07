import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';



import RaisedButton from 'material-ui/RaisedButton';
import {
   Table,
   TableBody,
   TableHeader,
   TableHeaderColumn,
   TableRow,
   TableRowColumn,
} from 'material-ui/Table';


class AvailableAgents extends Component {

   constructor(props) {
      super(props);

   }

   addAgent(_id, businessId, departmentId){
      console.log(`_ID: ${_id}`);
      console.log(`businessId: ${businessId}`);
      console.log(`departmentId: ${departmentId}`);
      Meteor.call('agents.addToDepartment', {
         _id,
         businessId,
         departmentId
      }, (err,succ) => {
         console.log(err);
         console.log(succ)
      });
   }

   render() {
      if (this.props.agents === undefined || this.props.agents.length === 0) {
         return(
            <h2>No available agents</h2>
         )
      }

      console.log(this.props.agents);
      return (

         <Table
            fixedHeader={ true }
            fixedFooter={ true }
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
                  <TableHeaderColumn>Agent</TableHeaderColumn>
                  <TableHeaderColumn>Status</TableHeaderColumn>
                  <TableHeaderColumn>Actions</TableHeaderColumn>
               </TableRow>
            </TableHeader>

            <TableBody
               displayRowCheckbox={ false }
               deselectOnClickaway={ true }
               showRowHover={ true }
            >
               {
                  this.props.agents.map((agent, index) => (
                     <TableRow key={ index }>
                        <TableRowColumn>{ agent.profile.name }</TableRowColumn>
                        <TableRowColumn> { agent.profile.status } </TableRowColumn>
                        <TableRowColumn>
                           <RaisedButton
                              label='Add'
                              primary={ true }
                              onClick={this.addAgent.bind(this,
                                 agent._id,
                                 this.props.businessId,
                                 this.props.departmentId
                              )}
                           />
                        </TableRowColumn>

                     </TableRow>
                  ))
               }
            </TableBody>
         </Table>


      );
   }
}

export default withTracker((props) => {

   return {
   };

})(AvailableAgents)


