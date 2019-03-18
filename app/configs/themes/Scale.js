import {GUIDELINE_BASE_HEIGHT, GUIDELINE_BASE_WIDTH, SCREEN_WDITH} from "./Screen";

const scale = size => (SCREEN_WDITH / GUIDELINE_BASE_WIDTH) * size;
const scaleVertical = size => (height / GUIDELINE_BASE_HEIGHT) * size;
const scaleModerate = (size, factor = 0.5) => size + ((scale(size) - size) * factor);

export { scale, scaleVertical, scaleModerate };
