
export const INIT_CBTSCREEN_SCALING_ANIMATION = 'INIT_CBTSCREEN_SCALING_ANIMATION';
export const COMPLETE_CBTSCREEN_SCALING_ANIMATION = 'COMPLETE_CBTSCREEN_SCALING_ANIMATION';

//
// camera bottom tools screen actions
//
export function initCBTScreenScalingAnimation() {
   return {
      type: INIT_CBTSCREEN_SCALING_ANIMATION
   };
}

export function completeCBTScreenScalingAnimation() {
   return {
      type: COMPLETE_CBTSCREEN_SCALING_ANIMATION
   }
}

