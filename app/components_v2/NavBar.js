import React, {Component} from 'react';
import {StyleSheet, View,} from 'react-native';
import {RkButton, RkStyleSheet, RkText} from 'react-native-ui-kitten';
import * as Screen from "../configs/themes/Screen";
import {FontAwesomeIcons} from "../../assets/Icons";
import * as PropTypes from "prop-types"

class NavBar extends Component {

   onNavigationLeftBackButtonPressed = () => {
      this.props.navigation.goBack();
   };

   renderNavigationTitleItem = () => (
      <View style={styles.title}>
         <RkText rkType='header3'>{this.props.title}</RkText>
      </View>
   );

   renderNavigationLeftItem = () => (
      <View style={styles.left}>
         <RkButton
            rkType='clear'
            style={styles.menu}
            onPress={this.onNavigationLeftBackButtonPressed}>
            <RkText rkType='awesome hero'>{FontAwesomeIcons.angleLeft}</RkText>
         </RkButton>
      </View>
   );

   renderNavigationRightItem = () => undefined;

   renderLeftItem = () => (
      this.props.renderCustomLeftItem ?
         this.props.renderCustomLeftItem() : this.renderNavigationLeftItem()
   );

   renderTitle = () => (
      this.props.renderCustomTitleItem ?
         this.props.renderCustomTitleItem() : this.renderNavigationTitleItem()
   );

   renderRightItem = () => (
      this.props.renderCustomRightItem ?
         this.props.renderCustomRightItem() : this.renderNavigationRightItem()
   );

   render = () => (
      <View style={[styles.layout, this.props.layoutStyle]}>
         <View style={[styles.container, this.props.containerStyle]}>
            {this.renderTitle()}
            {this.renderLeftItem()}
            {this.renderRightItem()}
         </View>
      </View>
   );

}

const styles = RkStyleSheet.create(theme => ({
   layout: {
      backgroundColor: theme.colors.screen.base,
      borderBottomWidth: StyleSheet.hairlineWidth,
      paddingTop: Screen.STATUSBAR_HEIGHT,
      borderBottomColor: theme.colors.border.base,
   },
   container: {
      flexDirection: 'row',
      height: Screen.APPBAR_HEIGHT,
   },
   left: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      justifyContent: 'center',
   },
   title: {
      ...StyleSheet.absoluteFillObject,
      justifyContent: 'center',
      alignItems: 'center',
   },
   menu: {
      width: 40,
   },
}));

NavBar.propTypes = {
   navigation: PropTypes.object.isRequired,
   title: PropTypes.string,

   layoutStyle: PropTypes.object,
   containerStyle: PropTypes.object,

   renderCustomLeftItem: PropTypes.func,
   renderCustomTitleItem: PropTypes.func,
   renderCustomRightItem: PropTypes.func,
};

export default NavBar;
