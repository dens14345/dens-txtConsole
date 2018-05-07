import React, { Component, Fragment } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom';

import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import MaterialModal from '../../../../extras/Modal/MaterialModal';

import {
   Table,
   TableBody,
   TableFooter,
   TableHeader,
   TableHeaderColumn,
   TableRow,
   TableRowColumn,
} from 'material-ui/Table';


import { BusinessesCollection } from "../../../../../api/businesses/businesses";
import { ROLES } from "../../../../../api/Classes/Const";

class BusinessesTable extends Component {

   constructor(props) {
      super(props);
      this.state = {
         open: false,
         businessName: ''
      }
   }

   openModal() {
      this.setState({ open: true })
   }

   closeModal() {
      this.setState({ open: false })
   }
   handleInputChange(e) {
      this.setState({
         businessName: e.target.value
      });
   }

   addBusiness() {
      let businessName = this.state.businessName;
      Meteor.call('businesses.insert', businessName, (error, success) => {
         if (success) {
            this.setState({ businessName: '' })
         }
         console.log(error)
         console.log(success)
      });
   }

   renderNewBusinessButton(){
      return(
         <Fragment>
            <RaisedButton
               label='New'
               primary={ true }
               onClick={ this.openModal.bind(this) }
            />

            <MaterialModal
               title='Create new Business'
               open={ this.state.open }
               closeModal={ this.closeModal.bind(this) }
               submit={ this.addBusiness.bind(this) }
            >
               <TextField
                  value={ this.state.businessName }
                  fullWidth={ true }
                  floatingLabelText='Business Name'
                  onChange={ this.handleInputChange.bind(this) }
               />

            </MaterialModal>
         </Fragment>
      )
   }

   render() {
      return (
         <Card>
            <CardTitle>

               {
                  (this.props.user.profile.role === ROLES.B_OWNER)?
                     this.renderNewBusinessButton.bind(this): null
               }


            </CardTitle>
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
                                 <Link to={ { pathname: `${window.location.pathname}/${business._id}` } }>
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
   return {
      businesses: BusinessesCollection.find().fetch(),
      user: Meteor.user()
   }

})(BusinessesTable)



