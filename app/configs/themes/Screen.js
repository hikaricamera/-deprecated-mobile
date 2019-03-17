import {Dimensions, StatusBar} from "react-native";
import {Platform} from "react-native";

export const SCREEN_WDITH = Dimensions.get("window").width;
export const SCREEN_HEIGHT = Dimensions.get("window").height;

export const STATUSBAR_HEIGHT = StatusBar.currentHeight;
export const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 46;

// Guideline sizes are based on standard ~5" screen mobile device
export const GUIDELINE_BASE_WIDTH = 350;
export const GUIDELINE_BASE_HEIGHT = 680;
