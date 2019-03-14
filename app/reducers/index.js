import {combineReducers} from "redux";
import {cameraInteractionReducer, cameraSettingsReducer} from "./CameraReducers";
import {cbtScreenReducer} from "./CameraScreenReducers";


export default combineReducers({
    // camera reducers
    cameraSettingsReducer,
    cameraInteractionReducer,

    // camera screen reducers
    cbtScreenReducer,
});
