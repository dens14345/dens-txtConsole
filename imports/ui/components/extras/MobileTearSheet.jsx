import React, {Component} from 'react';
import PropTypes from 'prop-types';

class MobileTearSheet extends Component {

  /* static propTypes = {
      children: PropTypes.node,
      height: PropTypes.number.isRequired,
   };*/

   static defaultProps = {
      height: 500,
   };



   render() {


      const styles = {
         root: {
            marginBottom: 24,
            marginRight: 24,
            maxWidth: 280,
            // width: '60%',
         },
         container: {
            border: 'solid 1px #d9d9d9',

            height: this.props.height,
            overflowY: 'scroll',
         },

      };

      return (
         <div style={(styles.root)}>
            <div style={(styles.container)}>
               {this.props.children}
            </div>
            {/*<img style={prepareStyles(styles.bottomTear)} src="images/bottom-tear.svg" />*/}
         </div>
      );
   }
}

export default MobileTearSheet;