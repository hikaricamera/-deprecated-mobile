import {createAppContainer, createStackNavigator, createSwitchNavigator} from "react-navigation";
import {OnboardScreen} from "./OnboardScreen";
import {ReferralCodeSettingScreen, SettingScreen} from "./SettingScreen";
import EditScreen from "./EditScreen/EditScreen";
import {ScreenNames} from "./AppNavigatorConstants";
import React from "react";
import CameraScreenV2 from "./CameraScreen";
import WorkshopMainView from "./workshop/WorkshopMainView";


const AppCameraNavigator = createStackNavigator({
   [ScreenNames.CAMERA_ROOT.CAMERA_SCREEN]: {
      screen: CameraScreenV2,
   },
   [ScreenNames.EDIT_ROOT.EDIT_SCREEN]: {
      screen: EditScreen,
   },
   [ScreenNames.WORKSHOP]: {
      screen: WorkshopMainView,
   },
   [ScreenNames.SETTING_ROOT.SETTING_SCREEN]: {
      screen: SettingScreen
   },
   [ScreenNames.SETTING_ROOT.REFERRAL_CODE_SETTING_SCREEN]: {
      screen: ReferralCodeSettingScreen
   }
}, {
   initialRouteName: ScreenNames.CAMERA_ROOT.CAMERA_SCREEN
});

const AppNavigator = createSwitchNavigator({
   [ScreenNames.ONBOARD_SCREEN]: {
      screen: OnboardScreen
   },
   [ScreenNames.APP]: {
      screen: AppCameraNavigator
   },
   [ScreenNames.WORKSHOP]: {
      screen: WorkshopMainView,
   },
}, {
   initialRouteName: ScreenNames.WORKSHOP
});

export default createAppContainer(AppNavigator);

