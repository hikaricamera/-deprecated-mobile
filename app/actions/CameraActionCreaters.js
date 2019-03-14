
// camera settings
export const TOGGLE_FLASH_MODE_ACTION = 'TOGGLE_FLASH_MODE_ACTION';
export const TOGGLE_SELFIE_ACTION = 'TOGGLE_SELFIE_ACTION';

// camera interactions
export const CAPTURE_PICTURE_ACTION = 'CAPTURE_PICTURE_ACTION';
export const TURN_OFF_CAPTURE_PICTURE_ACTION = 'TURN_OFF_CAPTURE_PICTURE_ACTION';


//
// camera settings actions
//
export function toggleFlashMode() {
    return {
        type: TOGGLE_FLASH_MODE_ACTION,
    };
}

export function toggleSelfieMode() {
    return {
        type: TOGGLE_SELFIE_ACTION
    };
}

//
// camera interaction actions
//
export function capturePictureOn() {
    return {
        type: CAPTURE_PICTURE_ACTION
    };
}

export function capturePictureOff() {
    return {
        type: TURN_OFF_CAPTURE_PICTURE_ACTION
    };
}
