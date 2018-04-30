import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom';

import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import AvailableAgents from './Agents/extras/AvailableAgents';
import TextField from 'material-ui/TextField';

import {
   Table,
   TableBody,
   TableFooter,
   TableHeader,
   TableHeaderColumn,
   TableRow,
   TableRowColumn,
} from 'material-ui/Table';

import MaterialModal from '../extras/Modal/MaterialModal';
import { Meteor } from "meteor/meteor";


class AgentsTable extends Component {

   constructor(props) {
      super(props);
      this.state = {
         addAgentModal: false,
         confirmModal: false,
         selectedAgent: {},
         agentName: ''
      };
   }

   toggleAddAgentModal(){
      this.setState({addAgentModal: !this.state.addAgentModal})
   }
   toggleConfirmModal(){
      this.setState({confirmModal: !this.state.confirmModal})
   }

   removeAgent() {
      let _id = this.state.selectedAgent._id;
      let businessId = this.state.selectedAgent.profile.business;

      Meteor.call('agents.addToDepartment', {
         _id,
         businessId,
         departmentId: ''
      }, (err,succ) => {
         console.log(err);
         console.log(succ);
         if(succ) {
            this.setState({ confirmModal: false })
         }
      });
   }
   cantThinkOfAfunctionName(agent){

      this.setState({selectedAgent: agent})
      this.toggleConfirmModal()
   }

   handleInputChange(e) {
      this.setState({ agentName: e.target.value });
      console.log(this.state.agentName);
   }

   render() {
      return (
         <Card>
            <CardTitle title="Agents"/>
            <RaisedButton
               label='Add agent'
               primary={ true }
               onClick={ this.toggleAddAgentModal.bind(this) }
            />
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
                        <TableHeaderColumn>Agent</TableHeaderColumn>
                        <TableHeaderColumn>Number</TableHeaderColumn>
                        <TableHeaderColumn>Status</TableHeaderColumn>
                        <TableHeaderColumn>Actions</TableHeaderColumn>
                     </TableRow>
                  </TableHeader>

                  <TableBody
                     displayRowCheckbox={ false }
                     showRowHover={ true }
                  >
                     {
                        this.props.agents.map((agent, index) => (
                           <TableRow key={ index }>
                              <TableRowColumn>{ agent.profile.name }</TableRowColumn>
                              <TableRowColumn> { agent.profile.number }</TableRowColumn>
                              <TableRowColumn> { agent.profile.status }</TableRowColumn>
                              <TableRowColumn>
                                 <RaisedButton
                                    label='Remove'
                                    onClick={this.cantThinkOfAfunctionName.bind(this, agent)}
                                 />
                              </TableRowColumn>
                           </TableRow>
                        ))
                     }
                     {console.log(this.state.selectedAgent)}

                     <MaterialModal
                        title={`Remove from this department?`}
                        open={ this.state.confirmModal }
                        closeModal={ this.toggleConfirmModal.bind(this) }
                        submit={ this.removeAgent.bind(this) }
                     />
                  </TableBody>
               </Table>
               <MaterialModal
                  title='Add an agent'
                  open={ this.state.addAgentModal }
                  closeModal={ this.toggleAddAgentModal.bind(this) }
                  submit={ this.toggleAddAgentModal.bind(this) }
               >
                  <TextField
                     value={ this.state.agentName }
                     fullWidth={ true }
                     floatingLabelText='Agent name'
                     onChange={ this.handleInputChange.bind(this) }
                  />
                  <AvailableAgents
                     agents={ this.props.availableAgents }
                     businessId={ this.props.businessId }
                     departmentId={ this.props.departmentId }

                  />
               </MaterialModal>
            </CardText>

         </Card>

      );
   }
}

export default withTracker((props) => {
   console.log(props)
   Meteor.subscribe('agents.businessOwner', Meteor.userId());
   let agents = Meteor.users.find().fetch();

   let filterAgents = agents.filter((agent) => {
      return agent.profile.department === props.departmentId
   });

   let filterAvailableAgents = agents.filter((agent) => {
      return agent.profile.department === 'N/A' || agent.profile.department === ''
   });

   console.log(agents);
   console.log(filterAvailableAgents);

   return {
      agents: filterAgents,
      availableAgents: filterAvailableAgents
   }
})(AgentsTable)



