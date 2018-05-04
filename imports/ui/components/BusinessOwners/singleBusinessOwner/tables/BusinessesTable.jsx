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


class BusinessesTable extends Component {

   constructor(props) {
      super(props);

   }


   singleBusiness(businessId){
      this.props.history.push(`/businesses/${businessId}`);

   }

   render() {
      let businesses = this.props.businesses
      return (
         <Fragment>

            <Card>
               <CardTitle title='Businesses'/>
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
                           <TableHeaderColumn>Action</TableHeaderColumn>
                        </TableRow>
                     </TableHeader>

                     <TableBody
                        displayRowCheckbox={ false }
                        showRowHover={ true }
                     >
                        {
                           businesses.map((business) => (
                              <TableRow key={ business._id }>
                                 <TableRowColumn>{ business.name }</TableRowColumn>
                                 <TableRowColumn>
                                    <RaisedButton
                                       label='view'
                                       primary={true}
                                       onClick={this.singleBusiness.bind(this, business._id)}
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
   return {}
})(BusinessesTable)



