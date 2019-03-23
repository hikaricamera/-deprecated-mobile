import React from "react";
import {StyleSheet, View} from "react-native";
import {RkComponent} from "react-native-ui-kitten";
import * as PropTypes from "prop-types"
import DebouncedButton from "../core/DebouncedButton";
import DropdownMenuOption from "./DropdownMenuOption";

export default class DropdownMenuButton extends RkComponent {

   static Option = DropdownMenuOption;

   constructor(props) {
      super(props);

      this.state = {
         dropped: false,
      };
   }

   _toggleDroppedState() {
      this.setState({dropped: !(this.state.dropped)});
   }

   _renderDropdownMenu = () => (
      <DebouncedButton textRkType='awesome inverseColor h2'
                       title={this.props.icon}
                       onPress={() => this._toggleDroppedState()}/>
   );

   _renderMenu = () => (
      <View style={styles.menuOptionsContainer}>
         {this.props.children}
      </View>
   );

   render = () => (
      <View style={[this.props.style]}>
         {this._renderDropdownMenu()}
         {this.state.dropped && this._renderMenu()}
      </View>
   )

}

const styles = StyleSheet.create({
   menuOptionsContainer: {
      flexDirection: 'column',
      top: 30,
      right: 30,
   },
});

DropdownMenuButton.propTypes |= {
   icon: PropTypes.string,

   style: PropTypes.object, // style applied to the top container

};
