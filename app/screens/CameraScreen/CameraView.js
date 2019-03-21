import React, {Component} from "react";
import {StyleSheet, View} from "react-native";
import {DebouncedButton} from "../../components_v2";
import {ICONS} from "../../../assets/Path";
import {toggleFlashMode, toggleSelfieMode} from "../../actions/CameraActionCreaters";
import {connect} from "react-redux";

class CameraView extends Component {

   constructor(props) {
      super(props);

      this.state = {
         // disable buttons when capturing images
         buttonsDisabled: false,
      };
   }

   componentDidUpdate(prevProps, prevState, snapshot) {
      if (!this.props.captureOn && this.state.buttonsDisabled) {
         this.setState({
            buttonsDisabled: false
         });
      } else if (this.props.captureOn && !this.state.buttonDisabled) {
         this.setState({
            buttonsDisabled: true
         });
      }
   }

   _getIconUriForFlashlightBtn = () => (
      this.props.flashMode ? ICONS.FLASH_YELLOW : ICONS.FLASH_WHITE
   );

   _getIconUriForSelfieBtn = () => (
      this.props.selfieOn ? ICONS.SELFIE_YELLOW : ICONS.SELFIE_WHITE
   );

   _renderCameraContainerTop = () => (
      <View style={[styles.topContainer]}>
         <View style={[styles.topLeftGroup]}>
            <DebouncedButton imageUri={this._getIconUriForFlashlightBtn()}
                             onPress={() => this.props.toggleFlashMode()}
                             disabled={this.state.buttonsDisabled}
                             style={styles.buttonLeftmost}
                             imageStyle={styles.buttonImage}
                             textRkType='awesome inverseColor h1'/>
         </View>
         <View style={[styles.topRightGroup]}>
            <DebouncedButton imageUri={this._getIconUriForSelfieBtn()}
                             onPress={() => this.props.toggleSelfieMode()}
                             disabled={this.state.buttonsDisabled}
                             style={styles.buttonRightMost}
                             imageStyle={styles.buttonImage}
                             textRkType='awesome inverseColor h1'/>
         </View>
      </View>
   );

   _renderCameraContainerBottom = () => (
      <View style={[styles.bottomBlurred]}/>
   );

   render = () => (
      <View style={styles.container}>
         {this._renderCameraContainerTop()}
         {this._renderCameraContainerBottom()}
      </View>
   )

}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-between',
   },

   // top container & group containers
   topContainer: {
      height: 60,
      backgroundColor: 'rgba(10, 10, 10, 0.5)',
      flexDirection: 'row',
      justifyContent: 'space-between'
   },
   topLeftGroup: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'flex-start',
   },
   topRightGroup: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'flex-end',
   },

   // top container style
   buttonLeftmost: {
      marginLeft: 20,
      marginRight: 8,
   },
   buttonRegular: {
      marginLeft: 8,
      marginRight: 8
   },
   buttonRightMost: {
      marginRight: 20,
      marginLeft: 8,
   },
   buttonImage: {
      width: 30,
      height: 30,
      opacity: 0.4,
   },

   // bottom blurred view
   bottomBlurred: {
      height: 60,
      backgroundColor: 'rgba(10, 10, 10, 0.5)'
   }

});

const mapStateToProps = (state) => ({
   selfieOn: state.cameraSettingsReducer.selfieOn,
   flashMode: state.cameraSettingsReducer.flashMode,
});

const mapDispatchToProps = (dispatch) => ({
   toggleFlashMode: () => dispatch(toggleFlashMode()),
   toggleSelfieMode: () => dispatch(toggleSelfieMode())
});

export default connect(mapStateToProps, mapDispatchToProps)(CameraView);
