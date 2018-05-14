import { Meteor } from "meteor/meteor";
import React, { Component, Fragment } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import faker from 'faker';
import { AGENT_STATUS, ROLES } from '../../../../../api/Classes/Const';

import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import MaterialModal from '../../../../extras/Modal/MaterialModal';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import {
   Table,
   TableBody,
   TableHeader,
   TableHeaderColumn,
   TableRow,
   TableRowColumn,
} from 'material-ui/Table';
import { Accounts } from "meteor/accounts-base";


class InfiniteScrollingAgentsTable extends Component {

   constructor(props) {
      super(props);
      this.state = {
         open: false,
         name: '',
         email: '',
         username: '',
         password: '',
         number: '',
         agentLimit: 10,
         page: 1,
         limit: 20,
         skip: 0,
         addAgentModal: false
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

            if(succ) {
               this.setState({ name: '', email: '', username: '', password: '', number: '' });
               Bert.alert('Agent Inserted', 'success', 'growl-top-right');
            }else{
               Bert.alert('Failed To insert agent', 'danger', 'growl-top-right');
               console.log(err);
            }
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

      Bert.alert('Inserting agents', 'info', 'growl-top-right');


      let agents = [];
      for (let i = 0; i < 500; i++) {
         let name = faker.name.findName();
         let email = faker.internet.email();
         let username = faker.internet.userName() + faker.random.word();
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
         (succ) ?
            Bert.alert('Agents Inserted', 'success', 'growl-top-right') :
            console.log(err)


      })
   }


   toggleAddAgentModal() {
      this.setState({ addAgentModal: !this.state.addAgentModal })
   }

   renderAddAgentButton() {
      return (
         <Fragment>
            <RaisedButton
               label='Add agent'
               primary={ true }
               onClick={ this.toggleAddAgentModal.bind(this) }
            />

            <RaisedButton
               label='Fake 500 agents'
               primary={ true }
               onClick={ this.addAgentUsingFaker.bind(this) }
            />
         </Fragment>
      )
   }

   handleNextPageClick() {
      console.log('handleNextPageClick');
      console.log(`skip: `, this.state.skip);


      (this.props.userRole === ROLES.B_OWNER) ?
         Meteor.subscribe('agents1.available', Meteor.userId(), this.state.skip) :
         Meteor.subscribe('agents.all', this.state.skip);


      Session.set('skipLimit', this.state.skip);

      this.setState({
         limit: this.state.limit + 5,
         skip: this.state.skip + 5
      });

      this.setState({
         data: this.props.agents,
         page: this.state.page + 1,
      });
   }


   render() {
      let paperStyle = {
         transitionDuration: '0.3s',
         height: 550,
         padding: '0px',
      };

      return (
         <Fragment>
            <AppBar
               title='Agents'
               showMenuIconButton={ false }
            />

            <Divider/>
            <Paper style={ paperStyle } zDepth={ 1 }>
               {
                  (this.props.userRole === ROLES.B_OWNER) ?
                     (this.renderAddAgentButton()) : null
               }

               <Paper style={ { height: 450, overflowY: 'scroll' } } zDepth={ 0 }>
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

                        {
                           this.props.agents.map((agent, index) => (
                              <TableRow key={ index }>
                                 <TableRowColumn>{ agent.name }</TableRowColumn>

                              </TableRow>
                           ))
                        }

                     </TableBody>
                  </Table>
               </Paper>

               <FlatButton
                  label='load more'
                  primary={ true }
                  onClick={ this.handleNextPageClick.bind(this) }
               />
            </Paper>


            <MaterialModal
               title='Add an agent'
               open={ this.state.addAgentModal }
               closeModal={ this.toggleAddAgentModal.bind(this) }
               submit={ this.addAgent.bind(this) }
            >

               <TextField
                  value={ this.state.name }
                  fullWidth={ true }
                  floatingLabelText='Agent name'
                  onChange={ (e) => this.setState({name: e.target.value}) }
               />

               <TextField
                  value={ this.state.email }
                  fullWidth={ true }
                  floatingLabelText='Email'
                  onChange={ (e) => this.setState({email: e.target.value}) }
               />
               <TextField
                  value={ this.state.username }
                  fullWidth={ true }
                  floatingLabelText='Username'
                  onChange={ (e) => this.setState({username: e.target.value}) }

               />
               <TextField
                  value={ this.state.password }
                  fullWidth={ true }
                  floatingLabelText='Password'
                  onChange={ (e) => this.setState({password: e.target.value}) }
               />
               <TextField
                  value={ this.state.number }
                  fullWidth={ true }
                  floatingLabelText='number'
                  onChange={ (e) => this.setState({number: e.target.value}) }
               />

            </MaterialModal>
         </Fragment>

      );
   }
}

export default withTracker((props) => {

   // Meteor.subscribe('agents1.available', Meteor.userId(), 0);

   // let x = Meteor.users.find({ 'profile.role': ROLES.AGENT }).fetch();
   let userRole = '';

   let isReady = Accounts.loginServicesConfigured();
   (isReady) ? userRole = Meteor.user().profile.role : null

   let x = Meteor.users.find({}).fetch();
   let agents = [];

   x.map((agent) => {
      let obj = {
         name: agent.profile.name,
         number: agent.profile.number,
         business: agent.profile.business,
         department: agent.profile.department,
         status: agent.profile.status,
         actions: <RaisedButton
            label='View'
            onClick={ () => {
               alert(agent._id)
            } }
         />
      };
      agents.push(obj);
   });

   console.log(agents);

   return {
      agents,
      user: Meteor.user(),
      x,
      userRole
   };

})(InfiniteScrollingAgentsTable)


