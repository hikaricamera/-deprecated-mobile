import {RkTheme} from "react-native-ui-kitten";
import {DefaultTheme} from "./DefaultTheme";
import {scale} from "./Scale";

export function bootstrap() {
   RkTheme.setTheme(DefaultTheme);

   /*
   */

   RkTheme.setType('RkText', 'basic', {
      fontFamily: theme => theme.fonts.family.bold,
      backgroundColor: 'transparent',
   });

   RkTheme.setType('RkText', 'regular', {
      fontFamily: theme => theme.fonts.family.regular,
   });

   RkTheme.setType('RkText', 'light', {
      fontFamily: theme => theme.fonts.family.light,
   });

   RkTheme.setType('RkText', 'logo', {
      fontFamily: theme => theme.fonts.family.logo,
   });


   RkTheme.setType('RkText', 'awesome', {
      fontFamily: 'fontawesome',
   });

   RkTheme.setType('RkText', 'hero', {
      fontSize: scale(33),
   });

   RkTheme.setType('RkText', 'menuIcon', {
      fontSize: 44,
   });

   // all font sizes
   Object.keys(RkTheme.current.fonts.sizes).forEach(key => {
      RkTheme.setType('RkText', key, {
         fontSize: theme => theme.fonts.sizes[key],
      });
   });

   // all text colors
   Object.keys(RkTheme.current.colors.text).forEach(key => {
      RkTheme.setType('RkText', `${key}Color`, {
         color: theme => theme.colors.text[key],
      });
   });

   // all text line heights
   Object.keys(RkTheme.current.fonts.lineHeights).forEach(key => {
      RkTheme.setType('RkText', `${key}Line`, {
         text: { lineHeight: theme => theme.fonts.lineHeights[key] },
      });
   });

   // theme text styles
   RkTheme.setType('RkText', 'header1', {
      fontSize: theme => theme.fonts.sizes.h1,
      fontFamily: theme => theme.fonts.family.bold,
   });
   RkTheme.setType('RkText', 'header2', {
      fontSize: theme => theme.fonts.sizes.h2,
      fontFamily: theme => theme.fonts.family.bold,
   });
   RkTheme.setType('RkText', 'header3', {
      fontSize: theme => theme.fonts.sizes.h3,
      fontFamily: theme => theme.fonts.family.bold,
   });
   RkTheme.setType('RkText', 'header4', {
      fontSize: theme => theme.fonts.sizes.h4,
      fontFamily: theme => theme.fonts.family.bold,
   });
   RkTheme.setType('RkText', 'header5', {
      fontSize: theme => theme.fonts.sizes.h5,
      fontFamily: theme => theme.fonts.family.bold,
   });
   RkTheme.setType('RkText', 'header6', {
      fontSize: theme => theme.fonts.sizes.h6,
      fontFamily: theme => theme.fonts.family.bold,
   });
   RkTheme.setType('RkText', 'secondary1', {
      fontSize: theme => theme.fonts.sizes.s1,
      fontFamily: theme => theme.fonts.family.light,
   });
   RkTheme.setType('RkText', 'secondary2', {
      fontSize: theme => theme.fonts.sizes.s2,
      fontFamily: theme => theme.fonts.family.light,
   });
   RkTheme.setType('RkText', 'secondary3', {
      fontSize: theme => theme.fonts.sizes.s3,
      fontFamily: theme => theme.fonts.family.regular,
   });
   RkTheme.setType('RkText', 'secondary4', {
      fontSize: theme => theme.fonts.sizes.s4,
      fontFamily: theme => theme.fonts.family.regular,
   });
   RkTheme.setType('RkText', 'secondary5', {
      fontSize: theme => theme.fonts.sizes.s5,
      fontFamily: theme => theme.fonts.family.light,
   });
   RkTheme.setType('RkText', 'secondary6', {
      fontSize: theme => theme.fonts.sizes.s6,
      fontFamily: theme => theme.fonts.family.light,
   });
   RkTheme.setType('RkText', 'secondary7', {
      fontSize: theme => theme.fonts.sizes.s7,
      fontFamily: theme => theme.fonts.family.regular,
   });
   RkTheme.setType('RkText', 'primary1', {
      fontSize: theme => theme.fonts.sizes.p1,
      fontFamily: theme => theme.fonts.family.light,
   });
   RkTheme.setType('RkText', 'primary2', {
      fontSize: theme => theme.fonts.sizes.p2,
      fontFamily: theme => theme.fonts.family.regular,
   });
   RkTheme.setType('RkText', 'primary3', {
      fontSize: theme => theme.fonts.sizes.p3,
      fontFamily: theme => theme.fonts.family.light,
   });
   RkTheme.setType('RkText', 'primary4', {
      fontSize: theme => theme.fonts.sizes.p4,
      fontFamily: theme => theme.fonts.family.regular,
   });

   RkTheme.setType('RkText', 'center', {
      text: {
         textAlign: 'center',
      },
   });

}
