import {RkComponent, RkText} from "react-native-ui-kitten";
import React from "react";
import {TouchableOpacity, StyleSheet} from "react-native";
import * as PropTypes from "prop-types"

export default class DropdownMenuOption extends RkComponent {

   _handlePress() {
      // after pressing the menu option, the menu should disappear
      console.log(this.props.toggleDroppedState)
      this.props.toggleDroppedState();

   }

   _renderChild = () => (
      this.props.children ? this.props.children :
         (
            <RkText rkType={this.props.textRkType || 'regular p1 inverseColor'}
                    style={[this.props.textStyle, styles.text]}>
               {this.props.option}
            </RkText>
         )
   );

   render = () => (
      <TouchableOpacity onPress={() => this._handlePress()}
                        hitSlop={{top: 3, left: 3, right: 3, bottom: 3}}
                        style={[this.props.style, styles.rowContainer]}>
         {this._renderChild()}
      </TouchableOpacity>
   )
}

const styles = StyleSheet.create({
   rowContainer: {
      width: 100,
      justifyContent: 'center',
      alignItems: 'center',
   },

   text: {
      marginTop: 10,
      marginBottom: 10,
   },
});

DropdownMenuOption.propTypes |= {
   option: PropTypes.string,
   onPress: PropTypes.func,

   style: PropTypes.object,
   textStyle: PropTypes.object,
   textRkType: PropTypes.string,
};
