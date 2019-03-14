import React, {Component} from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import * as PropTypes from 'prop-types'

const DEFAULT_COLOR = 'white';

export default class EclipticButton extends Component {

   constructor(props) {
      super(props);

      this.setTextCtrStyle();
      this.setTextStyle();
   }

   setTextCtrStyle() {
      this.textCtrStyle = {
         backgroundColor: this.props.backgroundColor
      };

      if (this.props.noBorder) {
         this.textCtrStyle = {
            ...this.textCtrStyle,
            ...styles.unBorderedTextCtr,
         }
      } else {
         this.textCtrStyle = {
            ...this.textCtrStyle,
            ...styles.borderedTextCtr
         }
      }

   }

   setTextStyle() {
      this.textStyle = {
         color: this.props.textColor ? this.props.textColor : DEFAULT_COLOR,
      }
   }

   render() {
      return (
         <TouchableOpacity
            style={[styles.ctr]}
            onPress={() => this.props.onPress()}
            disabled={this.props.disabled}>
            {
               !this.props.hide &&
               <View style={this.textCtrStyle}>
                  <Text style={this.textStyle}>
                     {this.props.title}
                  </Text>
               </View>
            }
         </TouchableOpacity>
      );
   }
}

const styles = StyleSheet.create({
   ctr: {
      flex: 1,
      flexDirection: 'row',
      margin: 9,
   },

   borderedTextCtr: {
      flex: 0.6,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 25,
   },

   unBorderedTextCtr: {
      flex: 0.6,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
   },
});

EclipticButton.propTypes = {
   title: PropTypes.string,
   backgroundColor: PropTypes.string,
   textColor: PropTypes.string,

   onPress: PropTypes.func,

   disabled: PropTypes.bool,
   hide: PropTypes.bool,
   noBorder: PropTypes.bool,
};

EclipticButton.defaultProps = {

   onPress: () => {},

   disabled: false,
   hide: false,
   noBorder: false,
};
