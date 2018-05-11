import React, { Fragment, Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';
import TextField from 'material-ui/TextField';

class ReactEmail extends Component {

   constructor(props) {
      super(props);
      this.state = { text: '' }; // You can also pass a Quill Delta here
      this.handleChange = this.handleChange.bind(this)
   }

   handleChange(value) {
      this.setState({ text: value })
      console.log(this.state.text);
   }

   render() {

      return (
         <ReactQuill
            theme='snow'
            value={ this.props.emailBody }
            onChange={ this.handleChange }
            style={{height: 180}}/>
      );
   }
}

export default withTracker((props) => {
   return {}
})(ReactEmail)

