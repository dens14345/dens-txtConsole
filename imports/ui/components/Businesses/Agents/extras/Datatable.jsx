import { Meteor } from "meteor/meteor";
import React, { Component, Fragment } from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import AppBar from 'material-ui/AppBar';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';

import DataTables from 'material-ui-datatables';

const TABLE_COLUMNS = [
   {
      key: 'name',
      label: 'Dessert (100g serving)',
   }, {
      key: 'calories',
      label: 'Calories',
   }, {
      key: 'fat',
      label: 'Fat (g)',
   }, {
      key: 'carbs',
      label: 'Carbs (g)',
   }, {
      key: 'protein',
      label: 'Protein (g)',
   }, {
      key: 'sodium',
      label: 'Sodium (mg)',
   }, {
      key: 'calcium',
      label: 'Calcium (%)',
   }, {
      key: 'iron',
      label: 'Iron (%)',
   },
];

const TABLE_DATA = [
   {
      name: 'Frozen yogurt',
      calories: '159',
      fat: '6.0',
      carbs: '24',
      protein: '4.0',
      sodium: '87',
      calcium: '14%',
      iron: '1%',
   }, {
      name: 'Ice cream sandwich',
      calories: '159',
      fat: '6.0',
      carbs: '24',
      protein: '4.0',
      sodium: '87',
      calcium: '14%',
      iron: '1%',
   }, {
      name: 'Eclair',
      calories: '159',
      fat: '6.0',
      carbs: '24',
      protein: '4.0',
      sodium: '87',
      calcium: '14%',
      iron: '1%',
   }, {
      name: 'Cupcake',
      calories: '159',
      fat: '6.0',
      carbs: '24',
      protein: '4.0',
      sodium: '87',
      calcium: '14%',
      iron: '1%',
   }, {
      name: 'Gingerbread',
      calories: '159',
      fat: '6.0',
      carbs: '24',
      protein: '4.0',
      sodium: '87',
      calcium: '14%',
      iron: '1%',
   }, {
      name: 'Jelly bean',
      calories: '159',
      fat: '6.0',
      carbs: '24',
      protein: '4.0',
      sodium: '87',
      calcium: '14%',
      iron: '1%',
   }, {
      name: 'Lollipop',
      calories: '159',
      fat: '6.0',
      carbs: '24',
      protein: '4.0',
      sodium: '87',
      calcium: '14%',
      iron: '1%',
   }, {
      name: 'Honeycomb',
      calories: '159',
      fat: '6.0',
      carbs: '24',
      protein: '4.0',
      sodium: '87',
      calcium: '14%',
      iron: '1%',
   }, {
      name: 'Donut',
      calories: '159',
      fat: '6.0',
      carbs: '24',
      protein: '4.0',
      sodium: '87',
      calcium: '14%',
      iron: '1%',
   }, {
      name: 'KitKat',
      calories: '159',
      fat: '6.0',
      carbs: '24',
      protein: '4.0',
      sodium: '87',
      calcium: '14%',
      iron: '1%',
   },
];

const TABLE_DATA_NEXT = [
   {
      name: 'Marshmallow',
      calories: '159',
      fat: '6.0',
      carbs: '24',
      protein: '4.0',
      sodium: '87',
      calcium: '14%',
      iron: '1%',
   },
];

class Datatable extends Component {

   constructor(props) {
      super(props);
      this.state = {
         open: false,
         name: '',
         email: '',
         username: '',
         password: '',
         number: '',
         agentLimit: 10,
         data: TABLE_DATA,
         page: 1
      }
   }


   handleFilterValueChange = (value) => {
      console.log(value);
   };

   handleSortOrderChange = (key, order) => {
      console.log(key);
      console.log(order);
   };
   handlePreviousPageClick() {
      console.log('handlePreviousPageClick');
      this.setState({
         data: TABLE_DATA,
         page: 1,
      });
   }
   handleNextPageClick() {
      console.log('handleNextPageClick');
      this.setState({
         data: TABLE_DATA_NEXT,
         page: 2,
      });
   }
   render() {

      return (
         <Fragment>
            <AppBar
               title='Agents'
               showMenuIconButton={ false }
            />


            <Card>
               <CardText>
                  <DataTables
                     height={'auto'}
                     selectable={false}
                     showRowHover={true}
                     columns={TABLE_COLUMNS}
                     data={this.state.data}
                     page={this.state.page}
                     multiSelectable={false}
                     onNextPageClick={this.handleNextPageClick.bind(this)}
                     onPreviousPageClick={this.handlePreviousPageClick.bind(this)}
                     showCheckboxes={false}
                     enableSelectAll={false}
                     count={100}
                  />

               </CardText>

            </Card>
         </Fragment>

      );
   }
}

export default withTracker((props) => {

   return {
   };

})(Datatable)


