import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom';
import { Meteor } from "meteor/meteor";

import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';

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



class StaffsTable extends Component {

   constructor(props) {
      super(props);

   }

   render() {
      return (
         <Card>
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
                        <TableHeaderColumn>Username</TableHeaderColumn>
                        <TableHeaderColumn>Email</TableHeaderColumn>
                        <TableHeaderColumn>Name</TableHeaderColumn>
                        <TableHeaderColumn>Status</TableHeaderColumn>
                        <TableHeaderColumn>Date Created</TableHeaderColumn>
                        <TableHeaderColumn>Actions</TableHeaderColumn>
                     </TableRow>
                  </TableHeader>

                  <TableBody
                     displayRowCheckbox={ false }
                     showRowHover={ true }
                  >
                     {/*{
                        this.props.agents.map((agent, index) => (
                           <TableRow key={ index }>
                              <TableRowColumn>{ agent.profile.name }</TableRowColumn>
                              <TableRowColumn> { agent.profile.number }</TableRowColumn>
                              <TableRowColumn> { agent.profile.status }</TableRowColumn>
                              <TableRowColumn>
                                 <RaisedButton
                                    label='Remove'
                                    onClick={this.cantThinkOfAfunctionName.bind(this, agent)}
                                 />
                              </TableRowColumn>
                           </TableRow>
                        ))
                     }*/}


                  </TableBody>
               </Table>
            </CardText>

         </Card>

      );
   }
}

export default withTracker((props) => {

   return {

   }
})(StaffsTable)



