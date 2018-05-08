import React, { Component, Fragment } from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import AvailableAgents from '../../Agents/extras/AvailableAgents';
import TextField from 'material-ui/TextField';
import {Progress} from '../../../../extras/Progress';

import {
   Table,
   TableBody,
   TableHeader,
   TableHeaderColumn,
   TableRow,
   TableRowColumn,
} from 'material-ui/Table';

import MaterialModal from '../../../../extras/Modal/MaterialModal';
import { Meteor } from 'meteor/meteor';
import { ROLES } from '../../../../../api/Classes/Const';
import { Accounts } from 'meteor/accounts-base';


class AgentsTable extends Component {

   constructor(props) {
      super(props);
      this.state = {
         addAgentModal: false,
         confirmModal: false,
         selectedAgent: {},
         agentName: '',
         limit: 20
      };
   }

   toggleAddAgentModal() {
      this.setState({ addAgentModal: !this.state.addAgentModal })
   }

   toggleConfirmModal() {
      this.setState({ confirmModal: !this.state.confirmModal })
   }

   removeAgent() {
      let _id = this.state.selectedAgent._id;
      let businessId = this.state.selectedAgent.profile.business;

      Meteor.call('agents.addToDepartment', {
         _id,
         businessId,
         departmentId: ''
      }, (err, succ) => {
         console.log(err);
         console.log(succ);
         if (succ) {
            this.setState({ confirmModal: false })
         }
      });
   }

   cantThinkOfAfunctionName(agent) {

      this.setState({ selectedAgent: agent })
      this.toggleConfirmModal()
   }

   handleInputChange(e) {
      this.setState({ agentName: e.target.value });
      console.log(this.state.agentName);
   }

   incrementAgentsSubscription(){

      this.setState({ limit: this.state.limit + 20 });
      Meteor.subscribe('agents.available', this.props.businessOwnerId, this.state.limit);
   }

   renderAddAgentButton(){
      console.log('bro ano na bat ayaw mo mag render');
      return(
         <Fragment>
            <RaisedButton
               label='Add agent'
               primary={ true }
               onClick={ this.toggleAddAgentModal.bind(this) }
            />
            <RaisedButton
               label='load more'
               onClick={this.incrementAgentsSubscription.bind(this)}
            />
         </Fragment>
      )
   }

   render() {
      if(!this.props.user.profile){
         return (<Progress/>);
      }
      
      return (
         <Fragment>

            <Card>
               <CardTitle title='Agents'/>
               {console.log(this.props.user.profile.role)}
               {
                  (this.props.user.profile.role === ROLES.B_OWNER)?
                     this.renderAddAgentButton(): null
               }


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
                           this.props.registeredAgents.map((agent, index) => (
                              <TableRow key={ index }>
                                 <TableRowColumn>{ agent.profile.name }</TableRowColumn>
                                 <TableRowColumn> { agent.profile.number }</TableRowColumn>
                                 <TableRowColumn> { agent.profile.status }</TableRowColumn>
                                 <TableRowColumn>
                                    <RaisedButton
                                       label='Remove'
                                       onClick={ this.cantThinkOfAfunctionName.bind(this, agent) }
                                    />
                                 </TableRowColumn>
                              </TableRow>
                           ))
                        }


                        <MaterialModal
                           title={ `Remove from this department?` }
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
         </Fragment>

      );
   }
}

export default withTracker((props) => {

   let isReady = Accounts.loginServicesConfigured();
   let user = Meteor.user();


   //------------------------------------------

   let businessOwnerId = Meteor.userId();
   let departmentId = props.departmentId;




   if(isReady) {
      switch (user.profile.role) {
         case ROLES.STAFF:
            Meteor.subscribe('agents.department', departmentId);
            break;
         case ROLES.B_OWNER:
            Meteor.subscribe('agents.available', businessOwnerId, 20);
            Meteor.subscribe('agents.registeredToDepartment', businessOwnerId, departmentId);
            break;
         default:
            break;
      }
   }

   let registeredAgents = Meteor.users.find({'profile.department': departmentId}).fetch();
   let availableAgents = Meteor.users.find({'profile.belongsTo': businessOwnerId}).fetch();






   return {
      registeredAgents,
      availableAgents,
      businessOwnerId,
      user
   }
})(AgentsTable)



