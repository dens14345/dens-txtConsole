import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import faker from 'faker';
import { AGENT_STATUS, ROLES } from '../../../../../api/Classes/Const';

import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import MaterialModal from '../../../extras/Modal/MaterialModal';
import {
   Table,
   TableBody,
   TableHeader,
   TableHeaderColumn,
   TableRow,
   TableRowColumn,
} from 'material-ui/Table';

import AgentsCollection from '../../../../../api/agents/agents';


class AgentsTable extends Component {

   constructor(props) {
      super(props);
      this.state = {
         open: false,
         name: '',
         email: '',
         username: '',
         password: '',
         number: ''
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
      let number  = faker.phone.phoneNumber();
      let password = 'agent123';
      let status =  AGENT_STATUS.ACTIVE;
      let businessId = 'N/A';
      let departmentId= 'N/A';



      // console.log(`name: ${name} \nemail: ${email} \nusername: ${username} \nnumber: ${number}`);


      for (let i = 0; i <= 5000; i++) {
         Meteor.call('agents.insert', {
               name,
               email,
               username,
               password,
               number,
               status,
               businessId,
               departmentId
            },
            (err, succ) => {
               console.log(err);
               console.log(succ);
               (succ) ? console.log(`random agent inserted`) : null
            }
         );
      }

   }

   render() {
      return (
         <Card>
            <CardTitle>
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
                        <TableHeaderColumn colSpan='3' tooltip='Super Header' style={ { textAlign: 'center' } }>
                        </TableHeaderColumn>
                     </TableRow>
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
                              { /*<TableRowColumn>*/ }
                              { /*<Link to={ { pathname: `${window.location.pathname}/${department._id}` } }>*/ }
                              { /*<RaisedButton*/ }
                              { /*label='View'*/ }
                              { /*primary={ true }*/ }
                              { /*/>*/ }
                              { /*</Link>*/ }
                              { /*</TableRowColumn>*/ }
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

      );
   }
}

export default withTracker((props) => {
   Meteor.subscribe('agents.businessOwner', Meteor.userId());
   // console.log(Meteor.users.find().fetch());

   let agents = Meteor.users.find().fetch();
   let filteredAgents = agents.filter((agent) => {
      return agent.profile.role === ROLES.AGENT;
   });
   // console.log(filteredAgents);

   return {
      agents: filteredAgents
   };

})(AgentsTable)


