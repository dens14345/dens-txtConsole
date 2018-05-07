import React, { Component, Fragment } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom';

import { Card, CardTitle, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import {
   Table,
   TableBody,
   TableHeader,
   TableHeaderColumn,
   TableRow,
   TableRowColumn,
} from 'material-ui/Table';

import MaterialModal from '../../../../extras/Modal/MaterialModal';
import { ROLES } from "../../../../../api/Classes/Const";


class DeparmentsTable extends Component {

   constructor(props) {
      super(props);
      this.state = {
         open: false,
         departmentName: ''
      }
   }

   openModal() {
      this.setState({ open: true })
   }

   closeModal() {
      this.setState({ open: false })
   }

   addDepartment() {
     Meteor.call('departments.insert', this.state.departmentName, this.props.businessId, (err, succ) => {
        console.log(err);
        console.log(succ);
        (succ) ? this.setState({ departmentName: '' }) : console.log(err) ;
     })
   }

   handleInputChange(e){
      this.setState({departmentName: e.target.value})
   }

   renderDepartmentsButton(){
      return(
         <Fragment>
            <RaisedButton
               label='New'
               primary={ true }
               onClick={ this.openModal.bind(this) }
            />
            <MaterialModal
               title='Create new Department'
               open={ this.state.open }
               closeModal={ this.closeModal.bind(this) }
               submit={ this.addDepartment.bind(this) }
            >
               <TextField
                  value={ this.state.departmentName }
                  fullWidth={ true }
                  floatingLabelText='Department Name'
                  onChange={ this.handleInputChange.bind(this) }
               />

            </MaterialModal>
         </Fragment>
      )
   }

   render() {
      return (
         <Card>
            <CardTitle title="Departments"/>
            {
               (this.props.user.profile.role === ROLES.B_OWNER) ?
                  this.renderDepartmentsButton.bind(this): null

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
                        <TableHeaderColumn>Department</TableHeaderColumn>
                        <TableHeaderColumn>Agents</TableHeaderColumn>
                        <TableHeaderColumn>Action</TableHeaderColumn>
                     </TableRow>
                  </TableHeader>

                  <TableBody
                     displayRowCheckbox={ false }
                     deselectOnClickaway={ true }
                     showRowHover={ true }
                  >
                     {
                        this.props.departments.map((department, index) => (
                           <TableRow key={ index }>
                              <TableRowColumn>{ department.name }</TableRowColumn>
                              <TableRowColumn> 92</TableRowColumn>
                              <TableRowColumn>
                                 <Link to={ { pathname: `${window.location.pathname}/${department._id}` } }>
                                    <RaisedButton
                                       label="View"
                                       primary={ true }
                                    />
                                 </Link>
                              </TableRowColumn>
                           </TableRow>
                        ))
                     }
                  </TableBody>
               </Table>

            </CardText>

         </Card>

      );
   }
}

export default withTracker((props) => {

   return {
      user: Meteor.user()
   }


})(DeparmentsTable)



