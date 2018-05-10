import React, { Component } from 'react';


export default class MyChip extends Component {

   constructor(props) {
      super(props);
   }

   render() {


      return (
         <div className='my-chip' style={{backgroundColor: this.props.bgColor, float: this.props.position}}>

            { this.props.children }

         </div>
      );
   }
}


