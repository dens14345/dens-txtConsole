
import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

export default Test = () => (
   <Card>
      <CardMedia
         overlay={<CardTitle title='Overlay title' subtitle='Overlay subtitle' />}
      >
         <img src='https://superdevresources.com/wp-content/uploads/2016/02/5-backgrounds.jpg' alt='' />

      </CardMedia>
   </Card>
);