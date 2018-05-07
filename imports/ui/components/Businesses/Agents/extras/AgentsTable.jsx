import React, { Component, Fragment } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import faker from 'faker';
import { AGENT_STATUS, ROLES } from '../../../../../api/Classes/Const';

import AppBar from 'material-ui/AppBar';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import MaterialModal from '../../../../extras/Modal/MaterialModal';
import {
   Table,
   TableBody,
   TableHeader,
   TableHeaderColumn,
   TableRow,
   TableRowColumn,
} from 'material-ui/Table';

import AgentsCollection from '../../../../../api/agents/agents';
import { Meteor } from "meteor/meteor";


class AgentsTable extends Component {

   constructor(props) {
      super(props);
      this.state = {
         open: false,
         name: '',
         email: '',
         username: '',
         password: '',
         number: '',
         agentLimit: 10
      }
   }


   openModal() {
      this.setState({ open: true })
   }

   closeModal() {
      this.setState({ open: false })
   }

   addAgent() {
      Meteor.call('agents.insert', {
            name: this.state.name,
            email: this.state.email,
            username: this.state.username,
            password: this.state.password,
            number: this.state.number,
            status: AGENT_STATUS.ACTIVE,
            businessId: 'N/A',
            departmentId: 'N/A'
         },
         (err, succ) => {
            console.log(err);
            console.log(succ);
            (succ) ?
               this.setState({
                  name: '',
                  email: '',
                  username: '',
                  password: '',
                  number: ''
               }) : console.log(err)
         }
      );
   }

   addAgentUsingFaker() {
      let name = faker.name.findName();
      let email = faker.internet.email();
      let username = faker.internet.userName();
      let number = faker.phone.phoneNumber();
      let password = 'agent123';
      let status = AGENT_STATUS.ACTIVE;
      let businessId = 'N/A';
      let departmentId = 'N/A';


      let agents = [];
      for (let i = 0; i < 200; i++) {
         let name = faker.name.findName();
         let email = faker.internet.email();
         let username = faker.internet.userName();
         let number = faker.phone.phoneNumber();
         let password = 'agent123';
         let status = AGENT_STATUS.ACTIVE;
         let businessId = 'N/A';
         let departmentId = 'N/A';

         agents.push({
            name,
            email,
            username,
            number,
            password,
            status,
            businessId,
            departmentId
         })
      }
      console.log(agents);
      Meteor.call('agents.insertBulk', agents, (err, succ) => {
         (succ) ? console.log(`random agent inserted`) :
            console.log(err)
      })
   }

   incrementAgentsSubscription(){
      this.setState({ agentLimit: this.state.agentLimit * 2 });
      Meteor.subscribe('agents.available', Meteor.userId(), this.state.agentLimit);
   }
   render() {
      return (
         <Fragment>
            <AppBar
               title='Agents'
               showMenuIconButton={ false }
            />
            <Card>
               <CardTitle>
                  {
                     (this.props.user.profile.role === ROLES.B_OWNER) ?
                        (
                           <Fragment>
                              <RaisedButton
                                 label='New'
                                 primary={ true }
                                 onClick={ this.openModal.bind(this) }
                              />
                              <RaisedButton
                                 label='Use Faker'
                                 primary={ true }
                                 onClick={ this.addAgentUsingFaker.bind(this) }
                              />
                              <RaisedButton
                                 label='Load More'
                                 primary={true}
                                 onClick={this.incrementAgentsSubscription.bind(this)}
                              />
                           </Fragment>
                        ) : null
                  }

               </CardTitle>

               <CardText>
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
                           <TableHeaderColumn>Number</TableHeaderColumn>
                           <TableHeaderColumn>Business</TableHeaderColumn>
                           <TableHeaderColumn>Department</TableHeaderColumn>
                           <TableHeaderColumn>Status</TableHeaderColumn>
                           <TableHeaderColumn>Actions</TableHeaderColumn>
                        </TableRow>
                     </TableHeader>

                     <TableBody
                        displayRowCheckbox={ false }
                        deselectOnClickaway={ true }
                        showRowHover={ true }
                        stripedRows={ true }
                     >
                        {
                           this.props.agents.map((agent, index) => (
                              <TableRow key={ index }>
                                 <TableRowColumn>{ agent.profile.name }</TableRowColumn>
                                 <TableRowColumn> { agent.profile.number } </TableRowColumn>
                                 <TableRowColumn> { agent.profile.business }</TableRowColumn>
                                 <TableRowColumn> { agent.profile.department }</TableRowColumn>
                                 <TableRowColumn> { agent.profile.status } </TableRowColumn>
                                 <TableRowColumn> { agent.profile.status } </TableRowColumn>
                              </TableRow>
                           ))
                        }
                     </TableBody>
                  </Table>
                  <MaterialModal
                     title='Create new Agent'
                     open={ this.state.open }
                     closeModal={ this.closeModal.bind(this) }
                     submit={ this.addAgent.bind(this) }
                  >

                     <TextField
                        value={ this.state.name }
                        fullWidth={ true }
                        floatingLabelText='Agent Name'
                        onChange={ (e) => this.setState({ name: e.target.value }) }
                     />
                     <TextField
                        value={ this.state.email }
                        fullWidth={ true }
                        floatingLabelText='Email'
                        onChange={ (e) => this.setState({ email: e.target.value }) }

                     />
                     <TextField
                        value={ this.state.username }
                        fullWidth={ true }
                        floatingLabelText='Username'
                        onChange={ (e) => this.setState({ username: e.target.value }) }
                     />
                     <TextField
                        value={ this.state.password }
                        fullWidth={ true }
                        floatingLabelText='Password'
                        type='password'
                        onChange={ (e) => this.setState({ password: e.target.value }) }
                     />
                     <TextField
                        value={ this.state.number }
                        fullWidth={ true }
                        floatingLabelText='Number'
                        onChange={ (e) => this.setState({ number: e.target.value }) }
                     />

                  </MaterialModal>
               </CardText>
               { /*{console.log(this.props.agents)}*/ }
            </Card>
         </Fragment>

      );
   }
}

export default withTracker((props) => {

   let agents = Meteor.users.find({ 'profile.role': ROLES.AGENT }).fetch();

   return {
      agents,
      user: Meteor.user()
   };

})(AgentsTable)


