const port = 8081;
const server_addr = `http://localhost:${port}`;

const assets_folder = `${server_addr}/assets`;
const icons_folder = `${assets_folder}/icons`;
const images_folder = `${assets_folder}/images`;

export const RED_LOGO_BGIMAGE = `${images_folder}/logo_red.png?${Math.random()}`;
export const BLUE_LOGO_BGIMAGE = `${images_folder}/logo_blue.png?${Math.random()}`;
export const BLUE_BGIMAGE = `${images_folder}/blue.jpg?${Math.random()}`;


export const ICONS = {
    HOME_ICON: `${icons_folder}/home.png`,
    BADGE_ICON: `${icons_folder}/badge.png?${Math.random()}`,
    MOON_ICON: `${icons_folder}/moon.png`,
    FEEDBACK_ICON: `${icons_folder}/feedback.png`,
    CONNECT_ICON: `${icons_folder}/connect.png`,
    COIN_ICON: `${icons_folder}/coins.png`,
    LANGUAGE_ICON: `${icons_folder}/language.png`,
    LEN_ICON: `${icons_folder}/len.png`,
    GUIDE_ICON: `${icons_folder}/guide.png`,
    PEN_ICON: `${icons_folder}/pen.png`,
    CHEVRON_ICON: `${icons_folder}/chevron.png`,

    CIRCLE_ICON: `${icons_folder}/circle.png`,
    CIRCLE_FILLED_ICON: `${icons_folder}/circle_filled.png`,

    BACK_FILLED_CHEVRON_ICON: `${icons_folder}/backto.png`,
    FILLED_CHEVRON_ICON: `${icons_folder}/nextpage.png`,

    PUZZLE_WHITE: `${icons_folder}/puzzle-black-white.png`,
    SETTING_WHITE: `${icons_folder}/setting-black-white.png`,

   FLASH_WHITE: `${icons_folder}/flash-white.png`,
   FLASH_YELLOW: `${icons_folder}/flash-yellow.png?${Math.random()}`,

   SELFIE_WHITE: `${icons_folder}/selfie-white.png?${Math.random()}`,
   SELFIE_YELLOW: `${icons_folder}/selfie-yellow.png`,
};
