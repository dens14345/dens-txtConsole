import React, { Component, Fragment } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';

import {
   Table,
   TableBody,
   TableHeader,
   TableHeaderColumn,
   TableRow,
   TableRowColumn,
} from 'material-ui/Table';

class FilteredConsumersTable extends Component {

   constructor(props) {
      super(props);
      this.state = {
         cons: ''
      };

   }


   render() {
      console.log(this.props.consumers);
      if(!this.props.consumers){
         return(<div>loading</div>)
      }

      // console.log(Session.get('filteredAgents'))
      // if(!Session.get('filteredAgents')){
      //    return(<h4>loading</h4>)
      // }

      return (
         <Fragment>
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
                        Session.get('filteredConsumers').map((consumer, index) => (
                           <TableRow key={ index }>
                              <TableRowColumn>{ consumer.name }</TableRowColumn>
                              <TableRowColumn> { consumer.number }</TableRowColumn>
                              <TableRowColumn> { consumer.address }</TableRowColumn>
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
            </Paper>
         </Fragment>

      );
   }
}

export default withTracker((props) => {
   console.log(props);
   // let consumers = '';

   Meteor.call('consumer.search', props.nameSearch, (err, succ) => {
      // console.log(err);
      // console.log(succ);
      Session.set('filteredConsumers', succ);
   });
   // Meteor.subscribe('consumers.filteredByName', props.nameSearch);

   return {
      consumers: Session.get('filteredConsumers')
   };

})(FilteredConsumersTable)



