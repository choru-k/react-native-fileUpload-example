/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import RNImagePicker from './src/RNImagePicker';
import RNCameraRollPicker from './src/RNCameraRollPicker';

export default class photoUploadTest extends Component {
  render() {
    const UploadScreen = RNCameraRollPicker;
    return (
      <UploadScreen />
    );
  }
}

AppRegistry.registerComponent('photoUploadTest', () => photoUploadTest);
