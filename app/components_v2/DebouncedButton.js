import React, {Component} from "react";
import {Image, View} from "react-native";
import * as PropTypes from 'prop-types'
import {debounce} from "underscore";
import {RkButton, RkText} from "react-native-ui-kitten";

const DEFAULT_DEBOUNCE_WAIT_TIME = 1000;

export default class DebouncedButton extends Component {

   constructor(props) {
      super(props);

      const {
         debounced,
         onPress,
      } = this.props;

      if (debounced) {
         this.handlePress = debounce(onPress, DEFAULT_DEBOUNCE_WAIT_TIME, true);
      } else {
         this.handlePress = onPress;
      }
   }

   _renderTextTitle = () => (
      <RkText rkType={this.props.textRkType} style={this.props.textStyle}>
         {this.props.title}
      </RkText>
   );

   _renderImage = () => (
      <Image source={{uri: this.props.imageUri}} style={this.props.imageStyle}/>
   );

   _renderButton() {
      const touchableProps = {
         disabled: this.props.disabled
      };
      return (
         <RkButton
            rkType='clear'
            onPress={() => this.handlePress()}
            style={this.props.style}
            {...touchableProps}>
            {
               this.props.renderTitle ?
                  this.props.renderTitle() : (
                     this.props.imageUri ?
                        this._renderImage() : this._renderTextTitle()
                  )
            }
         </RkButton>
      );
   }

   render() {
      return this.props.hide ? <View/> : this._renderButton();
   }
}

DebouncedButton.propTypes = {
   title: PropTypes.string,
   renderTitle: PropTypes.func,

   imageUri: PropTypes.string,

   style: PropTypes.object, // applied to the top RkButton container
   imageStyle: PropTypes.object,  // applicable when image is displayed
   textStyle: PropTypes.object, // applicable when text title is displayed
   textRkType: PropTypes.string,  // applicable when text title is displayed

   hide: PropTypes.bool,
   disabled: PropTypes.bool,
   debounced: PropTypes.bool,
   onPress: PropTypes.func,
};

DebouncedButton.defaultProps = {
   hide: false,
   disabled: false,
   debounced: true,
   onPress: () => {},
   textRkType: 'awesome',
};
