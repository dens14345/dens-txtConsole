import React, { Component, Fragment } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import faker from 'faker';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

import { Card, CardTitle, CardText } from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton'
import Paper from 'material-ui/Paper';
import FloatingActionButton from 'material-ui/FloatingActionButton'
import SearchIcon from 'material-ui/svg-icons/action/search'
import {
   Table,
   TableBody,
   TableHeader,
   TableHeaderColumn,
   TableRow,
   TableRowColumn,
} from 'material-ui/Table';


import { ConsumersCollection } from '../../../../../api/consumers/consumers';
import MaterialModal from '../../../../extras/Modal/MaterialModal';
import { ROLES } from "../../../../../api/Classes/Const";
import { Meteor } from "meteor/meteor";


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
         selectedRowSize: 20,
         consumerLimit: 10
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
         consumerAddress: '',
         nameSearch: ''
      });
   }
   //
   // onChange(event, index, selectedRowSize) {
   //    this.setState({ selectedRowSize });
   // };

   addConsumer() {
      Meteor.call('consumer.insert', {
         name: this.state.consumerName,
         number: this.state.consumerNumber,
         address: this.state.consumerAddress,
         businessId: this.props.businessId
      }, (err, succ) => {
         console.log(err);
         console.log(succ);
         if (succ) {
            this.clearStates();
            Bert.alert('Consumer Added', 'success', 'growl-top-right');
         }

      });
   }

   addConsumerUsingFaker() {
      Bert.alert('Inserting consumer..', 'info', 'growl-top-right');

      let consumers = [];
      for (let i = 0; i < 10000; i++) {
         let add = faker.address;

         let name = faker.name.findName();
         let number = faker.phone.phoneNumber();
         let address = `${add.country()} ${add.city()} ${add.streetAddress()} ${add.streetName()}`;
         let businessId = this.props.businessId;


         consumers.push({ name, number, address, businessId });
      }
      Meteor.call('consumer.insertBulk', consumers, (err, succ) => {
         console.log(err);

         if (succ) {
            Bert.alert('10k consumer inserted', 'success', 'growl-top-right');
         }
      });
   }

   searchConsumer(){
      // console.log(this.state.nameSearch);
      let name = this.state.nameSearch;
      Meteor.call('consumer.search', name, (err, succ) => {
         console.log(err);
         console.log(succ);
      });
   }

   handleInputNameChange(e) {
      this.setState({ consumerName: e.target.value });
   }

   handleInputNumberChange(e) {
      this.setState({ consumerNumber: e.target.value });
   }

   handleInputAddressChange(e) {
      this.setState({ consumerAddress: e.target.value });
   }

   incrementConsumersSubscription() {
      this.setState({ consumerLimit: 10 + this.state.consumerLimit });

      Meteor.subscribe('consumers.business.limit', this.props.businessId, this.state.consumerLimit);

   }

   renderNewConsumerButton() {
      return (
         <Fragment>
            <RaisedButton
               label='New'
               primary={ true }
               onClick={ this.openModal.bind(this) }
            />
            <RaisedButton
               label='Insert 10k consumers'
               primary={ true }
               onClick={ this.addConsumerUsingFaker.bind(this) }
            />
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
         </Fragment>
      )
   }

   render() {
      let paperStyle = {
         transitionDuration: '0.3s',
         height: 550,
         padding: '15px 0px 0px 15px',
      };
      return (
         <Paper style={paperStyle}>
            <div className="row">
               <div className="col-md">
                  <h3 className='inline-element'>{ `Consumers ` }</h3>
                  <span className='text-details'>( {`${this.props.loadedConsumersCount} / ${this.props.consumersCount}`}  )</span>
                  <br/>
                  {
                     (this.props.user.profile.role === ROLES.B_OWNER) ?
                        (this.renderNewConsumerButton()) : null
                  }
               </div>
               <div className="col-md">
                  <TextField
                     floatingLabelText='Search'
                     value={this.state.nameSearch}
                     onChange={(e) => this.setState({nameSearch: e.target.value})}
                  />
                  <FloatingActionButton
                     onClick={this.searchConsumer.bind(this)}
                     children={<SearchIcon/>} />

               </div>
            </div>

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
                                 <TableRowColumn> { consumer.address }</TableRowColumn>
                                 <TableRowColumn>
                                    <RaisedButton
                                       label="Edit"
                                       primary={ true }
                                       disabled={ !this.props.isBusinessOwner }
                                    />
                                    <RaisedButton
                                       label="Remove"
                                       disabled={ !this.props.isBusinessOwner }
                                    />
                                 </TableRowColumn>
                              </TableRow>
                           ))
                        }
                     </TableBody>
                  </Table>
                  <Divider/>

            </Paper>
            <FlatButton
               label='Load More'
               primary={ true }
               onClick={ this.incrementConsumersSubscription.bind(this) }
            />
         </Paper>
      );
   }
}

export default withTracker((props) => {
   let businessId = props.businessId;

   Meteor.subscribe('consumers.business.limit', businessId, 10);
   Meteor.subscribe('consumers.business.limit.count', businessId);

   let checkRole = () => Meteor.user().profile.role === ROLES.B_OWNER;
   // console.log(checkRole());

   return {
      consumers: ConsumersCollection.find().fetch(),
      user: Meteor.user(),
      isBusinessOwner: checkRole(),
      businessId,
      loadedConsumersCount: ConsumersCollection.find().count(),
      consumersCount: Counts.get('consumers.business.limit.count')
   };

})(ConsumersTable)



