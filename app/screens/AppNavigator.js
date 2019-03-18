import {createAppContainer, createStackNavigator, createSwitchNavigator} from "react-navigation";
import {OnboardScreen} from "./OnboardScreen";
import CameraScreen from "./CameraScreen";
import {ReferralCodeSettingScreen, SettingScreen} from "./SettingScreen";
import EditScreen from "./EditScreen/EditScreen";
import WorkshopLensScreen from "./WorkshopScreen/WorkshopLensScreen";
import {WorkshopTimelineScreen} from "./WorkshopScreen/WorkshopTimelineScreen";
import {ScreenNames} from "./AppNavigatorConstants";
import {createTrackedTabNavigator} from "../components/TrackedTabView";
import React from "react";

const WorkShopNavigator = createTrackedTabNavigator({
    [ScreenNames.WORKSHOP_ROOT.TIMELINE_SCREEN]: {
        screen: WorkshopTimelineScreen
    },
    [ScreenNames.WORKSHOP_ROOT.LENS_SCREEN]: {
        screen: WorkshopLensScreen
    },
}, {
    initialRouteName: ScreenNames.WORKSHOP_ROOT.TIMELINE_SCREEN,
    routeNameToDisplayText: {
        [ScreenNames.WORKSHOP_ROOT.TIMELINE_SCREEN]: 'Timeline',
        [ScreenNames.WORKSHOP_ROOT.LENS_SCREEN]: 'Len',
    },
});

const AppCameraNavigator = createStackNavigator({
    [ScreenNames.CAMERA_ROOT.CAMERA_SCREEN]: {
        screen: CameraScreen,
        navigationOptions: {
            header: null,
        }
    },
    [ScreenNames.EDIT_ROOT.EDIT_SCREEN]: {
        screen: EditScreen,
    },
    [ScreenNames.WORKSHOP]: {
        screen: WorkShopNavigator,
        navigationOptions: {
            header: null,
        }
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
}, {
    initialRouteName: ScreenNames.ONBOARD_SCREEN
});

export default createAppContainer(AppNavigator);

