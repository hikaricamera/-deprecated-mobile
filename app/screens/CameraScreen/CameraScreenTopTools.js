import React, {Component} from "react";
import {StyleSheet, View, Image} from "react-native";
import {ICONS} from "../../../assets/Path";
import ImageButton from "../../components/ImageButton";
import {connect} from "react-redux";
import {toggleFlashMode, toggleSelfieMode} from "../../actions/CameraActionCreaters";


class CameraScreenTopTools extends Component {

   constructor(props) {
      super(props);

      // noinspection JSIgnoredPromiseFromCall
      this._preloadImages();

      this.state = {
         imagesLoaded: false,
      };
   }

   async _preloadImages() {
      await Image.prefetch(ICONS.FLASH_YELLOW);
      await Image.prefetch(ICONS.FLASHOFF_WHITE);
      await Image.prefetch(ICONS.SELFIE_YELLOW);
      await Image.prefetch(ICONS.SELFIE_WHITE);
      this.setState({ imagesLoaded: true });
   }

   _getIconUriForFlashlightBtn() {
      return this.props.flashMode ? ICONS.FLASH_YELLOW : ICONS.FLASHOFF_WHITE;
   }

   _getIconUriForSelfieBtn() {
      return this.props.selfieOn ? ICONS.SELFIE_YELLOW : ICONS.SELFIE_WHITE;
   }

   render() {
      if (!this.state.imagesLoaded) {
         return <View/>;
      }

      const hideButtons = !this.props.cbtScalingCompleted;

      return (
         <View style={styles.ctr}>
            <View style={styles.iconCtr}>
               <ImageButton
                  iconUri={this._getIconUriForFlashlightBtn()}
                  hide={hideButtons}
                  debounced={false}
                  pressRange={4}
                  onPress={this.props.toggleFlashMode}/>
            </View>
            <View style={styles.iconCtrReverse}>
               <ImageButton
                  iconUri={this._getIconUriForSelfieBtn()}
                  hide={hideButtons}
                  onPress={this.props.toggleSelfieMode}/>
            </View>
         </View>
      )
   }
}

const styles = StyleSheet.create({
   ctr: {
      flex: 0.1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 10
   },

   iconCtr: {
      flex: 1,
      flexDirection: 'row',
   },

   iconCtrReverse: {
      flex: 1,
      flexDirection: 'row-reverse'
   },

});

function mapStateToProps(state) {
   return {
      selfieOn: state.cameraSettingsReducer.selfieOn,
      flashMode: state.cameraSettingsReducer.flashMode,

      cbtScalingCompleted: state.cbtScreenReducer.scalingCompleted,
   }
}

function mapDispatchToProps(dispatch) {
   return {
      toggleFlashMode: () => dispatch(toggleFlashMode()),
      toggleSelfieMode: () => dispatch(toggleSelfieMode())
   };
}

export default connect(
   mapStateToProps,
   mapDispatchToProps
)(CameraScreenTopTools)
