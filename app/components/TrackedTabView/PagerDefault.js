import React from "react";
import {Platform} from "react-native";
import PagerAndroid from "./PagerAndroid";

let pagerDefault = null;

switch (Platform.OS) {
    case 'ios':
        // TODO: currently not supported
        break;
    case 'android':
        pagerDefault = PagerAndroid;
        break;
    default:
        // TODO: currently not supported
        break;
}

export default pagerDefault;
