import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';

import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import {Progress }from '../../extras/Progress';


import {
   Table,
   TableBody,
   TableFooter,
   TableHeader,
   TableHeaderColumn,
   TableRow,
   TableRowColumn,
} from 'material-ui/Table';

import MaterialModal from '../../extras/Modal/MaterialModal';
import { ROLES } from '../../../../api/Classes/Const';


class StaffsTable extends Component {

   constructor(props) {
      super(props);
      this.state = {
         open: false,
         name: '',
         email: '',
         username: '',
         password: ''
      }
   }

   toggleModal() {
      this.setState({
         open: !this.state.open
      })
   }

   addStaff() {

      Meteor.call('staff.insert', {
         name: this.state.name,
         email: this.state.email,
         username: this.state.username,
         status: 'active',
         password: this.state.password
      }, (err, succ) => {
         if (succ) {
            this.setState({
               name: '',
               email: '',
               username: '',
               password: ''
            });
            console.log('staff inserted');
         } else
            console.log(err)

      })
      //'staff.insert'({name, email, username, password, status}){

   }

   render() {
      if (!this.props.staffs) {
         return (
            <div className='my-container'>
               <Progress/>
            </div>
         )
      }

      return (
         <Card>
            <CardText>
               <RaisedButton
                  label='New'
                  primary={ true }
                  onClick={ this.toggleModal.bind(this) }
               />
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
                        <TableHeaderColumn>Username</TableHeaderColumn>
                        <TableHeaderColumn>Email</TableHeaderColumn>
                        <TableHeaderColumn>Name</TableHeaderColumn>
                        <TableHeaderColumn>Status</TableHeaderColumn>
                        <TableHeaderColumn>Date Updated</TableHeaderColumn>
                        <TableHeaderColumn>Actions</TableHeaderColumn>
                     </TableRow>
                  </TableHeader>

                  <TableBody
                     displayRowCheckbox={ false }
                     showRowHover={ true }
                  >
                     {console.log(this.props.staffs)}

                     {
                        this.props.staffs.map((staff) => (
                           <TableRow key={ staff._id }>
                              <TableRowColumn>{ staff.username }</TableRowColumn>
                              <TableRowColumn> { staff.emails[0].address }</TableRowColumn>
                              <TableRowColumn> { staff.profile.name }</TableRowColumn>
                              <TableRowColumn> { staff.profile.status }</TableRowColumn>
                              <TableRowColumn> Date </TableRowColumn>
                              {/*<TableRowColumn> { staff.profile.dateModified }</TableRowColumn>*/}
                              <TableRowColumn>
                                 <RaisedButton
                                    label='test'
                                 />
                              </TableRowColumn>
                           </TableRow>
                        ))
                     }


                  </TableBody>
               </Table>
            </CardText>

            <MaterialModal
               title='Add new Staff'
               open={ this.state.open }
               closeModal={ () => this.setState({ open: false }) }
               submit={ this.addStaff.bind(this) }
            >
               <TextField
                  floatingLabelText='Name'
                  value={ this.state.name }
                  fullWidth={ true }
                  onChange={ (e) => this.setState({ name: e.target.value }) }
               />
               <TextField
                  floatingLabelText='Email'
                  value={ this.state.email }
                  fullWidth={ true }
                  onChange={ (e) => this.setState({ email: e.target.value }) }
               />
               <TextField
                  floatingLabelText='Username'
                  value={ this.state.username }
                  fullWidth={ true }
                  onChange={ (e) => this.setState({ username: e.target.value }) }
               />
               <TextField
                  floatingLabelText='Password'
                  value={ this.state.password }
                  fullWidth={ true }
                  onChange={ (e) => this.setState({ password: e.target.value }) }
               />
            </MaterialModal>
         </Card>

      );
   }
}

export default withTracker((props) => {
   Meteor.subscribe('staffs');

   return {
      staffs: Meteor.users.find({'profile.role': ROLES.STAFF}).fetch()
   }
})(StaffsTable)

