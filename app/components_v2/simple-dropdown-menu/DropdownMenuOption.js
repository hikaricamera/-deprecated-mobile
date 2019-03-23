import {RkComponent, RkText} from "react-native-ui-kitten";
import React from "react";
import {TouchableOpacity} from "react-native";
import * as PropTypes from "prop-types"

export default class DropdownMenuOption extends RkComponent {

   _renderChild = () => (
      this.props.children ? this.props.children :
         (
            <RkText rkType={this.props.textRkType} style={this.props.textStyle}>
               {this.props.option}
            </RkText>
         )
   );

   render = () => (
      <TouchableOpacity onPress={() => this.props.onPress()} style={this.props.style}>
         {this._renderChild()}
      </TouchableOpacity>
   )
}

DropdownMenuOption.propTypes |= {
   option: PropTypes.string,
   onPress: PropTypes.func,

   style: PropTypes.object,
   textStyle: PropTypes.object,
   textRkType: PropTypes.string,
};
