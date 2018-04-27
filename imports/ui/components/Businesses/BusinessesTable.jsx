import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom';

import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
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


import { BusinessesCollection } from "../../../api/businesses/businesses";

class BusinessesTable extends Component {

   constructor(props) {
      super(props);
   }


   render() {
      return (
         <Card>
            <CardText>
               <Table
                  fixedHeader={ true }
                  fixedFooter={ true }
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

                     </TableRow>
                     <TableRow>
                        <TableHeaderColumn>Business</TableHeaderColumn>
                        <TableHeaderColumn>Action</TableHeaderColumn>
                     </TableRow>
                  </TableHeader>

                  <TableBody
                     displayRowCheckbox={ false }
                     deselectOnClickaway={ true }
                     showRowHover={ true }
                  >
                     {
                        this.props.businesses.map((business, index) => (
                           <TableRow key={ index }>
                              <TableRowColumn>{ business.name }</TableRowColumn>
                              <TableRowColumn>
                                 {/*{console.log(this.props.businesses)}*/}
                                 <Link to={{pathname: `${window.location.pathname}/${business._id}`}}>
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

export default withTracker(() => {
   Meteor.subscribe('businesses.owner', Meteor.userId());
   return {
      businesses: BusinessesCollection.find().fetch()
   }

})(BusinessesTable)



