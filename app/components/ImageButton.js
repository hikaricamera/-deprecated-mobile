import React, {Component} from "react";
import {Image, StyleSheet, TouchableOpacity} from "react-native";
import * as PropTypes from 'prop-types'
import {debounce} from "underscore";
import {chooseNonNullInOrder} from "../utilities/ObjectUtils";

const DEFAULT_DEBOUNCE_WAIT_TIME = 1000;

const DEFAULT_ICON_WIDTH = 25;
const DEFAULT_ICON_HEIGHT = 25;

export default class ImageButton extends Component {

   constructor(props) {
      super(props);

      const {
         debounced,
         width,
         height,
         onPress,
      } = this.props;

      this.buttonWidth = chooseNonNullInOrder([
         width, DEFAULT_ICON_WIDTH
      ]);

      this.buttonHeight = chooseNonNullInOrder([
         height, DEFAULT_ICON_HEIGHT,
      ]);

      if (debounced) {
         this.handlePress = debounce(onPress, DEFAULT_DEBOUNCE_WAIT_TIME, true);
      } else {
         this.handlePress = onPress;
      }

   }

   render() {
      const {
         iconUri,
         disabled,
         pressRange,
         marginLeft,
         marginRight,
         marginTop,
         marginBottom
      } = this.props;

      return (
         <TouchableOpacity
            disabled={disabled}
            style={styles.touchableCtr}
            onPress={() => this.handlePress()}>

            {
               !this.props.hide &&
               <Image
                  source={{uri: iconUri}}
                  style={{
                     width: this.buttonWidth,
                     height: this.buttonHeight,
                     marginLeft: marginLeft,
                     marginRight: marginRight,
                     marginTop: marginTop,
                     marginBottom: marginBottom,
                     padding: pressRange,
                  }}
               />
            }
         </TouchableOpacity>
      );
   }
}

const styles = StyleSheet.create({
   touchableCtr: {
      alignSelf: 'center',
      marginLeft: 2,
      marginRight: 2,
   },
});

ImageButton.propTypes = {
   iconUri: PropTypes.string.isRequired,

   hide: PropTypes.bool,
   disabled: PropTypes.bool,
   debounced: PropTypes.bool,
   onPress: PropTypes.func,
   pressRange: PropTypes.number,

   width: PropTypes.number,
   height: PropTypes.number,
   marginLeft: PropTypes.number,
   marginRight: PropTypes.number,
   marginTop: PropTypes.number,
   marginBottom: PropTypes.number,
};

ImageButton.defaultProps = {
   hide: false,
   disabled: false,
   debounced: false,
   onPress: () => {
   },
   pressRange: 4,
};
