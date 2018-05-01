import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom';

import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
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

   render() {
      return (
         <Card>
            <CardTitle title="Departments"/>
            <RaisedButton
               label='New'
               primary={ true }
               onClick={ this.openModal.bind(this) }
            />
            <CardText>
               <Table
                  fixedHeader={ true }
                  fixedFooter={ true }
                  selectable={ false }
                  multiSelectable={ false }
               >
                  <TableHeader
                     displaySelectAll={ true }
                     adjustForCheckbox={ true }
                     displayRowCheckbox={ false }
                     enableSelectAll={ true }
                  >
                     <TableRow>
                        <TableHeaderColumn colSpan="3" tooltip="Super Header" style={ { textAlign: 'center' } }>
                        </TableHeaderColumn>
                     </TableRow>
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
                                 { /*{console.log(this.props.businesses)}*/ }
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
            </CardText>

         </Card>

      );
   }
}

export default withTracker((props) => {
   console.log(props)
   /*let businessId = props.url.match.params.businessId
   Meteor.subscribe('departments.business', businessId);*/

   return {
      // departments: DepartmentsCollection.find().fetch()
   }

})(DeparmentsTable)



