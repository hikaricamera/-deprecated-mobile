import React, {Component} from "react";
import {Image, StyleSheet, View} from "react-native";
import {ICONS} from "../../../assets/Path";
import ImageButton from "../../components/ImageButton";
import {capturePictureOn} from "../../actions/CameraActionCreaters";
import {connect} from "react-redux";
import {ScreenNames} from "../AppNavigatorConstants";
import {Scale} from "../../components/Motions";
import {
   completeCBTScreenScalingAnimation,
   initCBTScreenScalingAnimation
} from "../../actions/CameraScreenActionCreaters";


const NUMBER_OF_SCALING_ANIMS = 3;

class CameraScreenBottomTools extends Component {

   constructor(props) {
      super(props);

      // noinspection JSIgnoredPromiseFromCall
      this._preloadImages();
      this.props.initScalingAnimation();

      this.state = {
         imagesLoaded: false,

         // indicate whether the scale animation completes
         scalingCompletedCnt: 0,
         scalingAllCompleted: false,

         // disable buttons when capturing images
         buttonsDisabled: false,
      };
   }

   async _preloadImages() {
      await Image.prefetch(ICONS.RING_ICON);
      await Image.prefetch(ICONS.PUZZLE_WHITE);
      await Image.prefetch(ICONS.SETTING_WHITE);

      this.setState({imagesLoaded: true});
   }

   componentDidUpdate(prevProps, prevState, snapshot) {
      if (!this.props.captureOn && this.state.buttonsDisabled) {
         this.setState({buttonsDisabled: false});
      }
   }

   _navigateToSettings() {
      this.props.navigation.push(ScreenNames.SETTING_ROOT.SETTING_SCREEN);
   }

   _navigateToWorkshop() {
      this.props.navigation.push(ScreenNames.WORKSHOP);
   }

   _startCapturing() {
      this.setState({buttonsDisabled: true});
      this.props.startCapturing();
   }

   _completeScaling() {
      const { scalingCompletedCnt } = this.state;
      this.setState({scalingCompletedCnt: scalingCompletedCnt + 1});
      if (scalingCompletedCnt + 1 === NUMBER_OF_SCALING_ANIMS) {
         this.setState({scalingAllCompleted: true});
         this.props.completeScalingAnimation();
      }
   }

   render() {
      if (!this.state.imagesLoaded) {
         return <View/>;
      }

      // buttons are disabled when
      // 1. the scaling animations are running
      // 2. the buttons are required to be disabled (i.e. capturing photos)
      const buttonsDisabled =
         this.state.buttonsDisabled || !this.state.scalingAllCompleted;

      return (
         <View style={styles.ctr}>
            <Scale
               value={1}
               duration={1500}
               onShowFinish={() => this._completeScaling()}>
               <ImageButton
                  disabled={buttonsDisabled}
                  iconUri={ICONS.PUZZLE_WHITE}
                  onPress={() => this._navigateToWorkshop()}
                  debounced={true}
                  marginLeft={25}
               />
            </Scale>

            <Scale
               value={1}
               duration={1500}
               onShowFinish={() => this._completeScaling()}>
               <ImageButton
                  disabled={buttonsDisabled}
                  iconUri={ICONS.RING_ICON}
                  onPress={() => this._startCapturing()}
                  debounced={true}
                  width={65}
                  height={65}
               />
            </Scale>

            <Scale
               value={1}
               duration={1500}
               onShowFinish={() => this._completeScaling()}>
               <ImageButton
                  disabled={buttonsDisabled}
                  iconUri={ICONS.SETTING_WHITE}
                  onPress={() => this._navigateToSettings()}
                  debounced={true}
                  marginRight={25}
               />
            </Scale>
         </View>
      );
   }
}

const styles = StyleSheet.create({
   ctr: {
      flex: 0.8,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 10,
      minHeight: 20,
   },
   scale: {},
});


function mapStateToProps(state) {
   return {
      captureOn: state.cameraInteractionReducer.captureOn
   };
}

function mapDispatchToProps(dispatch) {
   return {
      startCapturing: () => dispatch(capturePictureOn()),
      initScalingAnimation: () => dispatch(initCBTScreenScalingAnimation()),
      completeScalingAnimation: () => dispatch(completeCBTScreenScalingAnimation()),
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(CameraScreenBottomTools);
