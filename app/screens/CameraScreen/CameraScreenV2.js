import React, {Component} from "react";
import {StatusBar, StyleSheet, View} from "react-native";
import {RNCamera} from "react-native-camera";
import CameraPendingView from "./CameraPendingView";
import CameraViewBottom from "./CameraViewBottom";
import CameraView from "./CameraView";
import {connect} from "react-redux";
import {capturePictureOff} from "../../actions/CameraActionCreaters";
import * as ImageProcessingUtils from "../../utilities/ImageProcessingUtils";
import {PhotoModel} from "../../utilities/schema/PhotoSchema";
import {now} from "../../utilities/DateUtils";
import * as PhotoUtils from "../../utilities/PhotoUtils";
import {ScreenNames} from "../AppNavigatorConstants";

class CameraScreenV2 extends Component {
   // noinspection JSUnusedGlobalSymbols
   static navigationOptions = () => ({
      header: null,
   });

   constructor(props) {
      super(props);
      this.camera = React.createRef();
   }

   async _capture() {
      if (!this.camera) {
         return;
      }
      const options = {
         width: 1920,
         height: 1080,
         fixOrientation: false,
         quality: 1,
         skipProcessing: true,
      };

      // TODO: move all cache files to permanent storage
      // capture the image
      const imageData = await this.camera.takePictureAsync(options);

      // thumbnailBase64
      const thumbnailData =
         await ImageProcessingUtils.thumbnailify(imageData.uri, 140, 140);

      // save the photo and thumbnail
      const photoModel = new PhotoModel({
         base64: imageData.uri,
         width: 1920,   // TODO: measure the width and height
         height: 1080,
         thumbnailBase64: thumbnailData.path,
         name: 'UNKNOWN',
         creationDate: now(),
      });
      await PhotoUtils.addOnePhoto(photoModel);

      // tell the global store that the image has been captured
      this.props.turnOffCaptureMode();

      this.props.navigation.push(ScreenNames.EDIT_ROOT.EDIT_SCREEN, {
         photoPath: imageData.uri
      });
   }

   componentDidUpdate(prevProps, prevState, snapshot) {
      if (this.props.captureOn) {
         // noinspection JSIgnoredPromiseFromCall
         this._capture();
      }
   }

   _getCameraType() {
      return this.props.selfieOn ? RNCamera.Constants.Type.front :
         RNCamera.Constants.Type.back;
   }

   _getFlashMode() {
      return this.props.flashMode ? RNCamera.Constants.FlashMode.on :
         RNCamera.Constants.FlashMode.off;
   }

   _renderCameraInnerView = (camera, status) => (
      status === 'READY' ?
         <CameraView navigation={this.props.navigation}/> : <CameraPendingView/>
   );

   render = () => (
      <View style={styles.container}>
         <StatusBar hidden={true}/>
         <RNCamera ref={ref => this.camera = ref}
                   style={styles.camera}
                   flashMode={this._getFlashMode()}
                   type={this._getCameraType()}>
            {
               ({camera, status}) => (
                  this._renderCameraInnerView(camera, status)
               )
            }
         </RNCamera>
         <CameraViewBottom navigation={this.props.navigation}/>
      </View>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
   },
   camera: {
      flex: 3
   },
});

const mapStateToProps = (state) => ({
   selfieOn: state.cameraSettingsReducer.selfieOn,
   flashMode: state.cameraSettingsReducer.flashMode,
   captureOn: state.cameraInteractionReducer.captureOn
});

const mapDispatchToProps = (dispatch) => ({
   turnOffCaptureMode: () => dispatch(capturePictureOff())
});


export default connect(mapStateToProps, mapDispatchToProps)(CameraScreenV2);
