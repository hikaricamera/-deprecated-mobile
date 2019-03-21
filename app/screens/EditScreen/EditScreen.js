import React, {Component} from "react";
import {Image, StatusBar, StyleSheet, View} from "react-native";
import {HorizontalImageSlider, NavBar} from "../../components_v2";
import {RkButton, RkTabView, RkText} from "react-native-ui-kitten";
import {BLUE_BGIMAGE} from "../../../assets/Path";


export default class EditScreen extends Component {
   // noinspection JSUnusedGlobalSymbols
   static navigationOptions = () => ({
      header: null,
   });

   constructor(props) {
      super(props);
      this._imagePath = this.props.navigation.getParam('photoPath');
   }

   _renderNavBarRightItem = () => (
      <View style={[styles.navBarRightItem]}>
         <RkButton
            rkType='clear'
            style={styles.menu}
            onPress={this.onNavigationLeftBackButtonPressed}>
            <RkText rkType='secondary1'>Save</RkText>
         </RkButton>
      </View>
   );

   _renderNavBar = () => (
      <NavBar navigation={this.props.navigation}
              title='EDIT'
              layoutStyle={styles.navBarLayout}
              renderCustomRightItem={() => this._renderNavBarRightItem()}/>
   );

   _generateFilterCards = () => [
      {
         uri: BLUE_BGIMAGE,
         description: 'dessert',
         showInfoText: true
      },
      {
         uri: BLUE_BGIMAGE,
         description: 'dessert',
         showInfoText: true
      },
      {
         uri: BLUE_BGIMAGE,
         description: 'dessert',
         showInfoText: true
      },
      {
         uri: BLUE_BGIMAGE,
         description: 'dessert',
         showInfoText: true
      },
      {
         uri: BLUE_BGIMAGE,
         description: 'dessert',
         showInfoText: true
      },
      {
         uri: BLUE_BGIMAGE,
         description: 'dessert',
         showInfoText: true
      },
   ];

   _renderFilters = () => (
      <HorizontalImageSlider
         data={this._generateFilterCards()}
         style={styles.filterSlider}
         cardStyle={styles.card}
         imageStyle={styles.cardImage}/>
   );

   _renderTabLabel = (selected, title) => (
      <View style={styles.btmTab}>
         <RkText rkType='secondary1' style={styles.btmTabInner}>
            {title}
         </RkText>
      </View>
   );

   _renderBottomTabBar = () => (
      <RkTabView
         rkType='light'
         tabsUnderContent={true}
         headerContainerStyle={styles.btmTabHeader}>
         <RkTabView.Tab
            title={(selected) => this._renderTabLabel(selected, 'Filters')}>
            {this._renderFilters()}
         </RkTabView.Tab>
         <RkTabView.Tab
            title={(selected) => this._renderTabLabel(selected, 'Neurons')}>
            {this._renderFilters()}
         </RkTabView.Tab>
         <RkTabView.Tab
            title={(selected) => this._renderTabLabel(selected, 'Customs')}>
            {this._renderFilters()}
         </RkTabView.Tab>
      </RkTabView>
   );

   render = () => (
      <View style={styles.container}>
         <StatusBar hidden={true}/>
         {this._renderNavBar()}
         <View style={styles.editedImageContainer}>
            <Image source={{uri: this._imagePath}} style={styles.editedImage}/>
         </View>
         {this._renderBottomTabBar()}
      </View>
   )
}

const styles = StyleSheet.create({
   container: {
      backgroundColor: '#FAFAFA',
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center'
   },

   // navigation bar
   navBarLayout: {
      alignSelf: 'stretch',
      // following override default styles
      paddingTop: 0,
      borderBottomWidth: 0,
      backgroundColor: '#FAFAFA',
   },

   navBarRightItem: {
      position: 'absolute',
      right: 17,
      top: 0,
      bottom: 0,
      justifyContent: 'center'
   },

   // images
   editedImageContainer: {
      height: 400,
      width: 300,
   },

   editedImage: {
      width: '100%',
      height: '100%'
   },

   // bottom tab bar
   btmTabHeader: {
      height: 45,
   },
   btmTab: {
      height: 45,
      justifyContent: 'center',
      alignItems: 'center',
   },
   btmTabInner: {
      color: 'white',
   },

   // filters
   filterSlider: {
      backgroundColor: '#FAFAFA',
      height: 100,
   },
   card: {
      alignSelf: 'center',
      borderWidth: 0,
      maxWidth: 70,
      marginTop: 10,
   },
   firstCard: {
      marginLeft: 20,
   },
   lastCard: {
      marginRight: 20,
   },
   cardImage: {
      width: 60,
      height: 60,
   },
});
