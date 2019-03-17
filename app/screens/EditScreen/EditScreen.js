import React, {Component} from "react";
import {Image, StatusBar, StyleSheet, View} from "react-native";
import {HorizontalImageSlider, NavBar} from "../../components_v2";
import {ICONS} from "../../../assets/Path";

export default class EditScreen extends Component {
   // noinspection JSUnusedGlobalSymbols
   static navigationOptions = ({navigation}) => ({
      header: () => (
         <NavBar navigation={navigation}
                 title='EDIT'
                 layoutStyle={styles.navBarLayout}
                 renderCustomRightItem={() => {}}/>
      ),
   });

   constructor(props) {
      super(props);
      this._imagePath = this.props.navigation.getParam('photoPath');
   }


   render() {
      const data = [
         {
            uri: ICONS.SELFIE_WHITE,
            description: 'A1',
            cardStyle: styles.firstCard,
         },
         {
            uri: ICONS.SELFIE_WHITE,
            description: 'A2'
         },
         {
            uri: ICONS.SELFIE_WHITE,
            description: 'A3'
         },
         {
            uri: ICONS.SELFIE_WHITE,
            description: 'A4'
         },
         {
            uri: ICONS.SELFIE_WHITE,
            description: 'A5',
            cardStyle: styles.lastCard,
         },
      ];

      return (
         <View style={styles.container}>
            <StatusBar hidden={true}/>
            <Image
               source={{uri: this._imagePath}}
               style={{width: '80%', height: '80%'}}/>
            <HorizontalImageSlider
               data={data}
               style={styles.imageSlider}
               cardStyle={styles.card}
               imageStyle={styles.cardImage}
            />
         </View>
      );
   }
}

const styles = StyleSheet.create({
   navBarLayout: {
      paddingTop: 0,
      borderBottomWidth: 0,
      height: 36,
      backgroundColor: '#DADADA',
   },

   container: {
      paddingTop: 10,
      backgroundColor: '#DADADA',

      flex: 1,
      flexDirection: 'column',
      alignItems: 'center'
   },
   imageSlider: {
      backgroundColor: '#F1F1F1',
   },
   card: {
      alignSelf: 'center',
      width: 75,
      borderWidth: 0,
      marginTop: 10,
   },
   firstCard: {
      marginLeft: 20,
   },
   lastCard: {
      marginRight: 20,
   },
   cardImage: {
      width: 70,
      height: 70,
      resizeMode: 'contain'
   }
});
