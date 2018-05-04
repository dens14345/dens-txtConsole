import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import faker from 'faker';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { ConsumersCollection } from '../../../../api/consumers/consumers';

// import Pagination from 'materialui-pagination';
import Pagination from 'material-ui-pagination-react';
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


class ConsumersTable extends Component {

   constructor(props) {
      super(props);
      this.state = {
         open: false,
         consumerName: '',
         consumerNumber: '',
         consumerAddress: '',
         rowsPerPage: [5, 10, 15],
         rows: [],
         numberOfRows: 5,
         page: 1,
         total: undefined,
         selectedRowSize: 20
      }
   }

   openModal() {
      this.setState({ open: true })
   }

   closeModal() {
      this.setState({ open: false })
   }

   clearStates() {
      this.setState({
         consumerName: '',
         consumerNumber: '',
         consumerAddress: ''
      })
   }

   updateRows(state) {
      /*RowApi.getRows(state)
         .then((updatedState) => {
            this.setState(updatedState);
         });*/
   }

   onChange(event, index, selectedRowSize) {
      this.setState({ selectedRowSize });
   };

   addConsumer() {
      Meteor.call('consumer.insert', {
         name: this.state.consumerName,
         number: this.state.consumerNumber,
         address: this.state.consumerAddress,
         businessId: this.props.businessId
      }, (err, succ) => {
         console.log(err);
         console.log(succ);
         (succ) ? this.clearStates() : console.log(err)
      });
   }

   addConsumerUsingFaker(callback) {
      for (let i = 0; i < 10000; i++) {
         let add = faker.address;

         let name = faker.name.findName();
         let number = faker.phone.phoneNumber();
         let address = `${add.country} ${add.city} ${add.streetAddress} ${add.streetName}`;
         let businessId = this.props.businessId;

         Meteor.call('consumer.insert', {
            name,
            number,
            address,
            businessId
         }, (err, succ) => {
            (succ) ? console.log(`${succ} inserted`) : console.log(err)
         });
      }
      console.log('testing');

      callback();
   }

   addConsumerUsingFaker1() {
      let consumers = [];
      for (let i = 0; i < 10000; i++) {
         let add = faker.address;

         let name = faker.name.findName();
         let number = faker.phone.phoneNumber();
         let address = `${add.country()} ${add.city()} ${add.streetAddress()} ${add.streetName()}`;
         let businessId = this.props.businessId;


         consumers.push({ name, number, address, businessId });
      }

      // console.log(consumers[1].address);
      Meteor.call('consumer.insertBulk', consumers, (err, succ) => {
         (succ) ? console.log(`random consumer inserted`) :
            console.log(err)
      });
   }

   handleInputNameChange(e) {
      this.setState({ consumerName: e.target.value })
   }

   handleInputNumberChange(e) {
      this.setState({ consumerNumber: e.target.value })
   }

   handleInputAddressChange(e) {
      this.setState({ consumerAddress: e.target.value })
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
            <RaisedButton
               label='Insert with Faker'
               primary={ true }
               onClick={ this.addConsumerUsingFaker.bind(this, () => {
                  console.log('finished')
               }) }
            />
            <RaisedButton
               label='Bulk insert'
               primary={ true }
               onClick={ this.addConsumerUsingFaker1.bind(this) }
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
                  >
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
               { /*<Pagination
                  total={ this.state.total }
                  rowsPerPage={ this.state.rowsPerPage }
                  page={ this.state.page }
                  numberOfRows={ this.state.numberOfRows }
                  updateRows={ this.updateRows.bind(this) }
               />*/ }
               <Divider/>
               {/*<Pagination
                  rows={ 10 }
                  rowSizeWidthStyle="10%"
                  selectedRowSize={ this.state.selectedRowSize }
                  rowSize={ [10, 20, 30] }
                  handleRowSizeChange={ this.onChange.bind(this) }
               />*/}

            </CardText>
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
         </Card>


      );
   }
}

export default withTracker((props) => {

   Meteor.subscribe('consumers.business.limit', props.businessId, 50);

   return {
      consumers: ConsumersCollection.find().fetch()
   }

})(ConsumersTable)


