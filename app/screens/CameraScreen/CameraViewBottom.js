import React, {Component} from "react";
import {StyleSheet, View} from "react-native";
import {DebouncedButton} from "../../components_v2";
import {FontAwesomeIcons} from "../../../assets/Icons";
import {RkText} from "react-native-ui-kitten";
import {capturePictureOn} from "../../actions/CameraActionCreaters";
import {connect} from "react-redux";
import {ScreenNames} from "../AppNavigatorConstants";

class CameraViewBottom extends Component {

   constructor(props) {
      super(props);

      this.state = {
         // disable buttons when capturing images
         buttonsDisabled: false,
      };
   }

   componentDidUpdate(prevProps, prevState, snapshot) {
      if (!this.props.captureOn && this.state.buttonsDisabled) {
         this.setState({buttonsDisabled: false});
      }
   }

   _goToWorkShopScreen() {
      this.props.navigation.push(ScreenNames.WORKSHOP);
   }

   _goToSettingScreen() {
      this.props.navigation.push(ScreenNames.SETTING_ROOT.SETTING_SCREEN);
   }

   _startCapturing() {
      this.setState({buttonsDisabled: true});
      this.props.startCapturing();
   }

   _renderCaptureButton = () => (
      <View style={[styles.captureContainer]}>
         <RkText rkType='awesome inverseColor' style={styles.innerCircle}>
            {FontAwesomeIcons.circle}
         </RkText>
         <RkText rkType='awesome inverseColor' style={styles.outerCircle}>
            {FontAwesomeIcons.circleThin}
         </RkText>
      </View>
   );

   render = () => (
      <View style={[styles.container]}>
         <DebouncedButton title={FontAwesomeIcons.picture}
                          onPress={() => this._goToWorkShopScreen()}
                          disabled={this.state.buttonsDisabled}
                          textRkType='awesome inverseColor h1'/>
         <DebouncedButton renderTitle={() => this._renderCaptureButton()}
                          disabled={this.state.buttonsDisabled}
                          onPress={() => this._startCapturing()}/>
         <DebouncedButton title={FontAwesomeIcons.gear}
                          onPress={() => this._goToSettingScreen()}
                          disabled={this.state.buttonsDisabled}
                          textRkType='awesome inverseColor h1'/>
      </View>
   )
}


const styles = StyleSheet.create({
   container: {
      flex: 1,
      paddingLeft: 30,
      paddingRight: 30,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: 'black'
   },
   captureContainer: {
      width: 100,
      height: 100,
   },
   outerCircle: {
      fontSize: 96,
      position: 'absolute',
      top: 10,
      left: 10,
   },
   innerCircle: {
      fontSize: 75,
      position: 'absolute',
      top: 20.5,
      left: 19
   },

});

const mapStateToProps = (state) => ({
   captureOn: state.cameraInteractionReducer.captureOn
});

const mapDispatchToProps = (dispatch) => ({
   startCapturing: () => dispatch(capturePictureOn()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CameraViewBottom);
