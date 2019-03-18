import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import * as RealmUtils from './app/utilities/RealmUtils'
import * as Theme from "./app/configs/themes/Bootstrap";

// open database
RealmUtils.initialize();

// initialize theme
Theme.bootstrap();

AppRegistry.registerComponent(appName, () => App);
