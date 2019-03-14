import React, {Component} from "react";
import {Image, StyleSheet, View} from "react-native";
import {RED_LOGO_BGIMAGE, BLUE_LOGO_BGIMAGE} from "../../../assets/Path";
import EclipticButton from "../../components/EclipticButton";
import TranslateYAndOpacity from "../../components/Motions/TranslateYAndOpacity";
import {Shake, TranslateX} from "../../components/Motions";
import {ScreenNames} from "../AppNavigatorConstants";


class OnboardScreen extends Component {

   constructor(props) {
      super(props);

      this.state = {
         // indicate whether the images are preloaded
         imageLoaded: false,

         // indicate whether the logos are positioned
         logosPositioned: false,

         // indicate whether logos shake animations complete
         logosShaken: false,

         // indicate whether the user pressed the skip button
         pressedSkip: false,
      };

      // noinspection JSIgnoredPromiseFromCall
      this._preloadImage();
   }

   async _preloadImage() {
      // preload the images before the animations occur
      await Image.prefetch(RED_LOGO_BGIMAGE);
      await Image.prefetch(BLUE_LOGO_BGIMAGE);
      this.setState({imageLoaded: true});
   }

   _pressSkipButton() {
      this.setState({pressedSkip: true});
   }

   _renderButtonsOnEnter() {
      /* Note that:
       * 1. Buttons move upward
       * 2. Buttons are disabled until logos finish animation
       * */

      return (
         <View style={styles.btnCtr1}>
            <View style={[styles.btnGroup1]}>
               <TranslateYAndOpacity
                  style={styles.translateYAndOpacity}
                  translateYMin={80}
                  duration={700}>
                  <EclipticButton
                     title='Sign Up'
                     backgroundColor={buttonStyles.sevenCharacterCodeBtn.color}
                     textColor={buttonStyles.sevenCharacterCodeBtn.textColor}
                     noBorder={false}
                     disabled={!this.state.logosShaken}
                     onPress={() => {}}
                  />
               </TranslateYAndOpacity>

               <TranslateYAndOpacity
                  style={styles.translateYAndOpacity}
                  translateYMin={70}
                  duration={700}>
                  <EclipticButton
                     title='Sign In'
                     backgroundColor={buttonStyles.redeemCodeBtn.color}
                     textColor={buttonStyles.redeemCodeBtn.textColor}
                     noBorder={false}
                     disabled={!this.state.logosShaken}
                     onPress={() => {}}
                  />
               </TranslateYAndOpacity>
            </View>

            <View style={[styles.btnGroup2]}>
               <TranslateYAndOpacity
                  style={styles.translateYAndOpacity}
                  translateYMin={60}
                  duration={700}>
                  <EclipticButton
                     title='Skip'
                     backgroundColor={buttonStyles.skipBtn.color}
                     textColor={buttonStyles.skipBtn.textColor}
                     noBorder={false}
                     disabled={!this.state.logosShaken}
                     onPress={() => this._pressSkipButton()}
                  />
               </TranslateYAndOpacity>
            </View>
         </View>
      );
   }

   _renderButtonsOnExit() {
      return (
         <View style={styles.btnCtr1}>
            <View style={[styles.btnGroup1]}>
               <TranslateX
                  style={styles.translateX}
                  isHidden={true}
                  translateXMin={-400}
                  duration={500}>
                  <EclipticButton
                     title='Sign Up'
                     backgroundColor={buttonStyles.sevenCharacterCodeBtn.color}
                     textColor={buttonStyles.sevenCharacterCodeBtn.textColor}
                     noBorder={false}
                     onPress={() => {}}
                  />
               </TranslateX>

               <TranslateX
                  style={styles.translateX}
                  isHidden={true}
                  translateXMin={-400}
                  delay={200}
                  duration={500}>
                  <EclipticButton
                     title='Sign In'
                     backgroundColor={buttonStyles.redeemCodeBtn.color}
                     textColor={buttonStyles.redeemCodeBtn.textColor}
                     noBorder={false}
                     onPress={() => {}}
                  />
               </TranslateX>
            </View>

            <View style={[styles.btnGroup2]}>
               <TranslateX
                  style={styles.translateX}
                  isHidden={true}
                  translateXMin={-400}
                  delay={400}
                  duration={500}>
                  <EclipticButton
                     title='Skip'
                     backgroundColor={buttonStyles.skipBtn.color}
                     textColor={buttonStyles.skipBtn.textColor}
                     noBorder={false}
                     onPress={() => {}}
                  />
               </TranslateX>
            </View>
         </View>
      );
   }

   _renderButtons() {
      const hide = this.state.pressedSkip;
      if (hide) {
         return this._renderButtonsOnExit();
      } else {
         return this._renderButtonsOnEnter();
      }
   }

   _renderLogos() {
      const hide = this.state.pressedSkip;
      // delay 1000ms when hiding
      // delay 700ms when showing
      const delay = hide ? 1200 : 700;

      return (
         <TranslateYAndOpacity
            style={styles.translateYAndOpacity}
            isHidden={hide}
            translateYMin={-200}
            opacityMin={0}
            duration={800}
            delay={delay}
            onHideFinished={() => {
               this.props.navigation.navigate(ScreenNames.APP);
            }}
            onShowFinished={() => {
               this.setState({logosPositioned: true});
            }}>
            <View style={styles.logoCtr}>
               <Shake
                  duration={500}
                  extraData={this.state.logosPositioned}
                  onShowFinished={() => {
                     this.setState({logosShaken: true});
                  }}>
                  <Image
                     source={{uri: RED_LOGO_BGIMAGE}}
                     style={{width: 170, height: 170, resizeMode: 'contain'}}
                  />
               </Shake>
               <Image
                  source={{uri: BLUE_LOGO_BGIMAGE}}
                  style={{width: 80, height: 80, resizeMode: 'contain'}}
               />
            </View>
         </TranslateYAndOpacity>
      );
   }

   render() {
      if (!this.state.imageLoaded) {
         return <View/>;
      }
      return (
         <View style={styles.bgImageCtr}>
            <View style={[styles.logo]}>
               {this._renderLogos()}
            </View>
            <View style={{flex: 0.14}}/>
            {this._renderButtons()}
         </View>
      );
   }

}

const buttonStyles = {
   sevenCharacterCodeBtn: {
      color: '#FEFEFE',
      textColor: 'black'
   },
   redeemCodeBtn: {
      color: '#FEFEFE',
      textColor: 'black'
   },
   skipBtn: {
      color: '#77B3D6',
      textColor: '#FEFEFE'
   }
};

const styles = StyleSheet.create({
   bgImageCtr: {
      flex: 1,
      justifyContent: 'flex-end',
      backgroundColor: '#377EB4'
   },

   logoCtr: {
      flex: 0.7,
      justifyContent: 'space-around',
      alignItems: 'center'
   },

   logo: {
      flex: 0.33,
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'center',
   },

   translateYAndOpacity: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
   },

   translateX: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
   },

   btnCtr1: {
      flex: 0.35,
      flexDirection: 'column',
      alignItems: 'center',
      marginBottom: 50,
   },

   btnGroup1: {
      flex: 2,
      flexDirection: 'column',
      alignItems: 'center',
      marginBottom: 20
   },

   btnGroup2: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
   }

});

export default OnboardScreen;

