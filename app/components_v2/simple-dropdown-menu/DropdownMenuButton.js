import React from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {RkComponent} from "react-native-ui-kitten";
import * as PropTypes from "prop-types"
import DebouncedButton from "../core/DebouncedButton";
import DropdownMenuOption from "./DropdownMenuOption";

export default class DropdownMenuButton extends RkComponent {

   static Option = DropdownMenuOption;

   _injectMethodsToOptionRefs() {
      return React.Children.map(
         this.props.children,
         child => {
            return React.cloneElement(child, {
               toggleDroppedState: () => console.log(123)
            });
         }
      );
   }

   constructor(props) {
      super(props);

      this._children = this._injectMethodsToOptionRefs();

      this.state = {
         dropped: false,
      };
   }

   _toggleDroppedState() {
      console.log('toggled');
      this.setState({
         dropped: !(this.state.dropped)
      });
   }

   _renderButton = () => (
      <DebouncedButton textRkType='awesome inverseColor h2'
                       title={this.props.icon}
                       debounceTime={100}
                       onPress={() => this._toggleDroppedState()}/>
   );

   _renderMenu = () => (
      <View style={[styles.menuOptionsContainer, this.props.menuOptionsStyle]}>
         {this._children}
      </View>
   );
   /*
      <View style={{backgroundColor: 'transparent',
         position: 'absolute',
         top: 0,
         left: 0,
         paddingTop: 0,
         borderBottomWidth: 0,
         height: 40,
         width: 400}}>
      <View style={ {
         position: 'absolute',
         flexDirection: 'column',
         top: 121,
         right: 200,
         backgroundColor: 'blue',
      }}>
      <TouchableOpacity style={{
         width: 50, height: 40
      }}>
      <Text>All Photos</Text>
      </TouchableOpacity>
      </View>
      </View>
   */
   render = () => (
      <View style={[this.props.style]}>
         {this._renderButton()}
         {this._renderMenu()}
      </View>
   )

}

const styles = StyleSheet.create({
   menuOptionsContainer: {
      position: 'absolute',
      flexDirection: 'column',
      top: 121,
      right: 110,
      backgroundColor: 'blue',
   },
});

DropdownMenuButton.propTypes |= {
   icon: PropTypes.string,

   style: PropTypes.object, // style applied to the top container
   menuOptionsStyle: PropTypes.object, // style applied to the menu options
};
