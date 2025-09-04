/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './src/App'; // This line is changed to point to your App.tsx in the src folder
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);
