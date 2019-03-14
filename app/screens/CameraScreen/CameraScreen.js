import React, {Component} from "react";
import {StatusBar, StyleSheet, View} from "react-native";
import CameraScreenTopTools from "./CameraScreenTopTools";
import CameraScreenCameraContainer from "./CameraScreenCameraContainer";
import CameraScreenBottomTools from "./CameraScreenBottomTools";


class CameraScreen extends Component {

   render() {
      return (
         <View style={styles.root}>
            <View style={styles.ctr}>
               <StatusBar hidden={true}/>
               <CameraScreenTopTools/>
               <CameraScreenCameraContainer
                  navigation={this.props.navigation}/>
               <CameraScreenBottomTools
                  navigation={this.props.navigation}/>
            </View>
         </View>
      );
   }
}

const styles = StyleSheet.create({
   root: {
      flex: 1,
      backgroundColor: 'black',
   },

   ctr: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: 'black',
      marginLeft: 7,
      marginRight: 7,
      marginBottom: 5,
      marginTop: 20,
   }
});


export default CameraScreen;
