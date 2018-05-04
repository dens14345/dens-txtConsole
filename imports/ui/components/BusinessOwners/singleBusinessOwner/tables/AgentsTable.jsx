import React, { Component, Fragment } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom';

import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import AppBar from 'material-ui/AppBar';

import {
   Table,
   TableBody,
   TableFooter,
   TableHeader,
   TableHeaderColumn,
   TableRow,
   TableRowColumn,
} from 'material-ui/Table';


class AgentsTable extends Component {

   constructor(props) {
      super(props);

   }


   render() {
      return (
         <Fragment>
            {/* <AppBar
               title='Businesses'
               showMenuIconButton={false}
            />*/}
            <Card>
               <CardTitle title='Agents'/>
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
                           this.props.agents.map((agent) => (
                              <TableRow key={ agent._id }>
                                 <TableRowColumn>{ agent.profile.name }</TableRowColumn>
                                 <TableRowColumn> { agent.profile.number }</TableRowColumn>
                                 <TableRowColumn> { agent.profile.status }</TableRowColumn>
                                 <TableRowColumn>
                                    <RaisedButton
                                       label='View'
                                       primary={true}
                                    />
                                 </TableRowColumn>
                              </TableRow>
                           ))
                        }



                     </TableBody>
                  </Table>
               </CardText>

            </Card>
         </Fragment>
      );
   }
}

export default withTracker((props) => {

   return {
      agents: Meteor.users.find({ 'profile.role': 'agent' }, { limit: 20 }).fetch()
   };
})(AgentsTable)



