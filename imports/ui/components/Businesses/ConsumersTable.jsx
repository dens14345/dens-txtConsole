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


class ConsumersTable extends Component {

   constructor(props) {
      super(props);
      this.state = {
         open: false,
         consumerName: '',
         consumerNumber: '',
         consumerAddress: ''
      }
   }

   openModal() {
      this.setState({ open: true })
   }

   closeModal() {
      this.setState({ open: false })
   }

   clearStates(){
      this.setState({
         consumerName: '',
         consumerNumber: '',
         consumerAddress: ''
      })
   }

   addConsumer() {

      Meteor.call('consumer.insert', {
         name: this.state.consumerName,
         number: this.state.consumerNumber,
         address: this.state.consumerAddress,
         businessId: this.props.businessId
      }, (err, succ) => {
         console.log(err);
         console.log(succ);
         (succ)? this.clearStates(): console.log(err)
      });


   }

   handleInputNameChange(e){
      this.setState({consumerName: e.target.value})
   }
   handleInputNumberChange(e){
      this.setState({consumerNumber: e.target.value})
   }
   handleInputAddressChange(e){
      this.setState({consumerAddress: e.target.value})
   }

   render() {
      return (
         <Card>
            <CardTitle title="Consumers"/>
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
                        <TableHeaderColumn>Name</TableHeaderColumn>
                        <TableHeaderColumn>Number</TableHeaderColumn>
                        <TableHeaderColumn>Address</TableHeaderColumn>
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
                        this.props.consumers.map((consumer, index) => (
                           <TableRow key={ index }>
                              <TableRowColumn>{ consumer.name }</TableRowColumn>
                              <TableRowColumn> { consumer.number }</TableRowColumn>
                              <TableRowColumn>
                                 <RaisedButton
                                    label="Edit"
                                    primary={ true }
                                 />
                                 <RaisedButton
                                    label="Remove"
                                 />
                              </TableRowColumn>
                           </TableRow>
                        ))
                     }
                  </TableBody>
               </Table>
               <MaterialModal
                  title='Add new Consumer'
                  open={ this.state.open }
                  closeModal={ this.closeModal.bind(this) }
                  submit={ this.addConsumer.bind(this) }
               >
                  <TextField
                     value={ this.state.consumerName }
                     fullWidth={ true }
                     floatingLabelText='Consumer Name'
                     onChange={ this.handleInputNameChange.bind(this) }
                  />
                  <TextField
                     value={ this.state.consumerNumber }
                     fullWidth={ true }
                     floatingLabelText='Number'
                     onChange={ this.handleInputNumberChange.bind(this) }
                  />
                  <TextField
                     value={ this.state.consumerAddress }
                     fullWidth={ true }
                     floatingLabelText='Address'
                     onChange={ this.handleInputAddressChange.bind(this) }
                  />

               </MaterialModal>
            </CardText>

         </Card>

      );
   }
}

export default withTracker((props) => {
   console.log(props)


   return {

   }

})(ConsumersTable)



