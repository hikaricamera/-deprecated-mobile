import * as ObjectUtils from "../utilities/ObjectUtils";
import {
   COMPLETE_CBTSCREEN_SCALING_ANIMATION,
   INIT_CBTSCREEN_SCALING_ANIMATION
} from "../actions/CameraScreenActionCreaters";

const cbtScreenInitialStates = {
   scalingCompleted: false
};

export function cbtScreenReducer(state = cbtScreenInitialStates, action) {
   console.debug(`cbtScreenReducer:${action.type}`);
   switch (action.type) {
      case INIT_CBTSCREEN_SCALING_ANIMATION:
         return ObjectUtils.updateField(state, 'scalingCompleted', false);
      case COMPLETE_CBTSCREEN_SCALING_ANIMATION:
         return ObjectUtils.updateField(state, 'scalingCompleted', true);
      default:
         return state;
   }
}
