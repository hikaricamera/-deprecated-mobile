import {combineReducers} from "redux";
import {cameraInteractionReducer, cameraSettingsReducer} from "./CameraReducers";
import {cameraScreenLayoutReducer} from "./CameraScreenReducers";


export default combineReducers({
    // camera reducers
    cameraSettingsReducer,
    cameraInteractionReducer,

    // camera screen reducers
    cameraScreenLayoutReducer,
});
