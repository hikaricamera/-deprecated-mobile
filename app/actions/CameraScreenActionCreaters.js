
export const REPORT_CAMERA_SCREEN_LAYOUT = 'REPORT_CAMERA_SCREEN_LAYOUT';

export function reportCameraLayout(width, height) {
   return {
      type: REPORT_CAMERA_SCREEN_LAYOUT,
      payload: {
         width: width,
         height: height
      },
   }
}
