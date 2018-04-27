import React, { Component } from 'react';

import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';


export default class MaterialModal extends Component {

   constructor(props) {
      super(props);
   }

   render() {
      const modalActions = [
         <FlatButton
            label="Cancel"
            onClick={ this.props.closeModal }
         />,
         <FlatButton
            label="Submit"
            primary={ true }
            keyboardFocused={ true }
            onClick={ this.props.submit }
         />,
      ];

      return (
         <div>
            <Dialog
               title={ this.props.title }
               actions={ modalActions }
               open={ this.props.open }
            >
               { this.props.children }
            </Dialog>
         </div>
      );
   }
}


