import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';


import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import Divider from 'material-ui/Divider';


class ContactInfo extends Component {

   constructor(props) {
      super(props);
   }

   render() {

      let consumer = this.props.consumer;
      console.log(consumer);
      if(!this.props.consumer){
         return(
            <div>Select a consumer</div>
         )
      }

      return (

         <Card>
            <CardTitle title={consumer.name}/>
            <CardText>
               <Divider/>
               {/*<h4>Name: </h4>*/}
               <h4>Address: {consumer.address}</h4>
               <h4>Contact: {consumer.number}</h4>
            </CardText>
         </Card>

      );

   }
}

export default withTracker((props) => {
   let consumerId = props.url.match.params.consumerId;

   let consumer = props.consumers.filter((consumer) => {
      return consumer._id === consumerId
   });
   return {
      consumer: consumer[0]
   }
})(ContactInfo)



