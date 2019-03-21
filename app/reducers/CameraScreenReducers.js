import {
   REPORT_CAMERA_SCREEN_LAYOUT
} from "../actions/CameraScreenActionCreaters";

const cameraScreenLayoutInitialStates = {
   cameraWidth: null,
   cameraHeight: null,
};

export function cameraScreenLayoutReducer(state = cameraScreenLayoutInitialStates, action) {
   console.debug(`cameraScreenLayoutReducer:${action.type}`);
   switch (action.type) {
      case REPORT_CAMERA_SCREEN_LAYOUT:
         return {
            ...state,
            cameraWidth: action.payload.width,
            cameraHeight: action.payload.height
         };
      default:
         return state;
   }
}




