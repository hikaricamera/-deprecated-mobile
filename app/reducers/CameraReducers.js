import {
    CAPTURE_PICTURE_ACTION,
    TOGGLE_FLASH_MODE_ACTION,
    TOGGLE_SELFIE_ACTION,
    TURN_OFF_CAPTURE_PICTURE_ACTION
} from "../actions/CameraActionCreaters";
import * as ObjectUtils from "../utilities/ObjectUtils";

const cameraSettingsInitialState = {
    flashMode: false,
    selfieOn: false,
};

export function cameraSettingsReducer(state = cameraSettingsInitialState, action) {
    console.debug(`cameraSettingsReducer:${action.type}`);
    switch (action.type) {
        case TOGGLE_FLASH_MODE_ACTION:
            const prevFlashMode = state.flashMode;
            return ObjectUtils.updateField(state, 'flashMode',
                !prevFlashMode);

        case TOGGLE_SELFIE_ACTION:
            const prevSelfieOn = state.selfieOn;
            return ObjectUtils.updateField(state, 'selfieOn',
                !prevSelfieOn);

        default:
            return state;
    }
}

const cameraInteractionInitialState = {
    captureOn: false,
};

export function cameraInteractionReducer(state = cameraInteractionInitialState, action) {
    console.debug(`cameraInteractionReducer: ${action.type}`);
    switch (action.type) {
        case CAPTURE_PICTURE_ACTION:
            // called when user is ready to capture an image
            return ObjectUtils.updateField(state, 'captureOn', true);
        case TURN_OFF_CAPTURE_PICTURE_ACTION:
            // called when user finishes capturing an image
            return ObjectUtils.updateField(state, 'captureOn', false);
        default:
            return state;
    }
}
