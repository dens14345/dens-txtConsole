import { Meteor } from "meteor/meteor";
import React, { Component, Fragment } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import faker from 'faker';
import { AGENT_STATUS, ROLES } from '../../../../../api/Classes/Const';

import AppBar from 'material-ui/AppBar';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import MaterialModal from '../../../../extras/Modal/MaterialModal';
import Divider from 'material-ui/Divider';
import {
   Table,
   TableBody,
   TableHeader,
   TableHeaderColumn,
   TableRow,
   TableRowColumn,
} from 'material-ui/Table';

import DataTables from 'material-ui-datatables';

import AgentsCollection from '../../../../../api/agents/agents';
import Datatable from './Datatable';

const TABLE_COLUMNS = [
   {
      key: 'name',
      label: 'Name',
   }, {
      key: 'number',
      label: 'Number',
   }, {
      key: 'business',
      label: 'Business',
   }, {
      key: 'department',
      label: 'Department',
   }, {
      key: 'status',
      label: 'Status',
   }, {
      key: 'actions',
      label: 'Actions',
   }
];

const TABLE_DATA = [

];

const TABLE_DATA_NEXT = [
   {
      name: 'Marshmallow',
      number: '159',
      business: '6.0',
      department: '24',
      status: '4.0',
      actions: '87'
   },
];

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
         agentLimit: 10,
         // data: TABLE_DATA,
         data: props.agents,
         page: 1,
         limit: 20,
         skip: 0
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

   incrementAgentsSubscription() {
      this.setState({ agentLimit: this.state.agentLimit + 10 });
      console.log(this.state.agentLimit);
      Meteor.subscribe('agents1.available', Meteor.userId(), 20);
   }

   handlePreviousPageClick() {
      console.log('handlePreviousPageClick');
      this.setState({
         data: TABLE_DATA_NEXT,
         page: 1,
      });
   }

   handleNextPageClick() {
      console.log('handleNextPageClick');
      console.log(`skip: `, this.state.skip);
      Meteor.subscribe('agents1.available', Meteor.userId(), this.state.skip);

      Session.set('skipLimit', this.state.skip);

      this.setState({
         limit: this.state.limit + 5,
         skip: this.state.skip + 5
      });

      // let users = Meteor.users.find({},{skip: this.state.skip}).fetch();
      // console.log(users);
      // Meteor.subscribe('agents.all', this.state.skip);

      this.setState({
         data: this.props.agents,
         page: this.state.page + 1,
      });
   }
   deleteAfterUser(){
      Meteor.subscribe('agents1.available', Meteor.userId(), 60);
   }

   render() {

      return (
         <Fragment>
            <AppBar
               title='Agents'
               showMenuIconButton={ false }
            />

            <Divider/>
            <Card>
               <CardText>
                  {console.log(this.props.agents)}
                  {/*{console.log(this.props.x)}*/}

                  <button onClick={this.handleNextPageClick.bind(this)}>
                     new subscripbtion
                  </button>
                  <button onClick={this.deleteAfterUser.bind(this)}>
                     delete after use
                  </button>

                  <DataTables
                     height={'auto'}
                     selectable={false}
                     showRowHover={true}
                     columns={TABLE_COLUMNS}
                     // data={this.state.data}
                     data={this.props.agents}
                     page={this.state.page}
                     multiSelectable={false}
                     onNextPageClick={this.handleNextPageClick.bind(this)}
                     onPreviousPageClick={this.handlePreviousPageClick.bind(this)}
                     showCheckboxes={false}
                     enableSelectAll={false}
                     count={5000}
                  />
               </CardText>

            </Card>
         </Fragment>
      );
   }
}

export default withTracker((props) => {

   // Meteor.subscribe('agents1.available', Meteor.userId(), 0);

   // let x = Meteor.users.find({ 'profile.role': ROLES.AGENT }).fetch();
   let skipLimit = Session.get('skipLimit');
   let x = Meteor.users.find({}, { skip: skipLimit }).fetch();
   let agents = [];

   // x.observe
   //    added

   x.map((agent) => {
      let obj = {
         name: agent.profile.name,
         number: agent.profile.number,
         business: agent.profile.business,
         department: agent.profile.department,
         status: agent.profile.status,
         actions: <RaisedButton
                     label='View'
                     onClick={() => {alert(agent._id)}}
                  />
      };
      agents.push(obj);
   });


   return {
      agents,
      user: Meteor.user(),
      x
   };

})(AgentsTable)


