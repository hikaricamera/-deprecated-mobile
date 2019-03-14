import React, {Component} from "react";
import {StyleSheet, View} from "react-native";
import {RNCamera} from 'react-native-camera';
import {connect} from "react-redux";
import {capturePictureOff} from "../../actions/CameraActionCreaters";
import * as PhotoUtils from "../../utilities/PhotoUtils";
import {PhotoModel} from "../../utilities/schema/PhotoSchema";
import * as ImageProcessingUtils from "../../utilities/ImageProcessingUtils";
import {now} from "../../utilities/DateUtils";
import {ScreenNames} from "../AppNavigatorConstants";

class CameraScreenCameraContainer extends Component {

   constructor(props) {
      super(props);
      this.camera = React.createRef();
   }

   getCameraType() {
      return this.props.selfieOn ? RNCamera.Constants.Type.front :
         RNCamera.Constants.Type.back;
   }

   getFlashMode() {
      return this.props.flashMode ? RNCamera.Constants.FlashMode.on :
         RNCamera.Constants.FlashMode.off;
   }

   async capture() {
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

      // turn off capture
      this.props.turnOffCapture();

      this.props.navigation.push(ScreenNames.EDIT_ROOT.EDIT_SCREEN, {
         photoPath: imageData.uri
      });
   }

   componentDidUpdate(prevProps, prevState, snapshot) {
      // handle capturing logic
      if (this.props.captureOn) {
         // not await capture()
         // while photo is being captured, render process proceeds
         // noinspection JSIgnoredPromiseFromCall
         this.capture();
      }
   }

   render() {
      return (
         <View style={styles.ctr}>
            <RNCamera
               ref={ref => this.camera = ref}
               style={styles.preview}
               type={this.getCameraType()}
               flashMode={this.getFlashMode()}
            />
         </View>
      );
   }
}

const styles = StyleSheet.create({
   ctr: {
      flex: 9,
      marginTop: 5,
      backgroundColor: 'black'
   },

   preview: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center',
      borderWidth: 1,
      borderRadius: 15,
      borderColor: 'black',
      overflow: 'hidden'  // see react-native-camera/issues/941
   },
});

function mapStateToProps(state) {
   return {
      selfieOn: state.cameraSettingsReducer.selfieOn,
      flashMode: state.cameraSettingsReducer.flashMode,
      captureOn: state.cameraInteractionReducer.captureOn
   }
}

function mapDispatchToProps(dispatch) {
   return {
      turnOffCapture: () => dispatch(capturePictureOff())
   };
}

export default connect(mapStateToProps, mapDispatchToProps)
(CameraScreenCameraContainer);
