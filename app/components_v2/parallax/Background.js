import React, {Component} from 'react';
import {Image} from 'react-native';
import * as PropTypes from "prop-types"

export default class Background extends Component {

   render = () => (
      <Image
         source={{uri: this.props.uri}}
         style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
         }}
      />
   );
}

Background.propTypes = {
   uri: PropTypes.string.isRequired
};
