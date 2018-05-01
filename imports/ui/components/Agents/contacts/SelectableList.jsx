import React, { Component } from "react";
import { List, ListItem, makeSelectable } from 'material-ui/List';


export default class SelectableList extends Component {

   componentWillMount() {
      this.setState({
         selectedIndex: this.props.defaultValue,
      });
   }

   handleRequestChange = (event, index) => {
      this.setState({
         selectedIndex: index,
      });
   };

   render() {
      return (
         <ComposedComponent
            value={ this.state.selectedIndex }
            onChange={ this.handleRequestChange }
         >
            { this.props.children }
         </ComposedComponent>
      );
   }
}
