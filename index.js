/** @format */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import * as RealmUtils from './app/utilities/RealmUtils'

// open database
RealmUtils.initialize();

AppRegistry.registerComponent(appName, () => App);
