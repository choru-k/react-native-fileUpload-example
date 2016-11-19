
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform
} from 'react-native';

import CameraRollPicker from 'react-native-camera-roll-picker';

import futch from '../api';

export default class RNCameraRollPicker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      num: 0,
      selected: [],
      progress: 0,
    };
    this.sendServer = this.sendServer.bind(this);
  }

  getSelectedImages(images, current) {
    var num = images.length;

    this.setState({
      num: num,
      selected: images,
    });
  }
  sendServer() {
    console.log(this.state.selected)
    const photos = this.state.selected;
    const data = new FormData();
    data.append('name', 'testName');
    photos.forEach((photo, index) => {
      data.append('photos', {
        uri: photo.uri,
        type: 'image/jpeg',
        name: 'image'+index
      });
    })
    console.log(data)
    const url = Platform.OS === 'android' ? 'http://10.0.3.2:3000' : 'http://localhost:3000'; // genymotion's localhost is 10.0.3.2
    futch(url + '/array', {
      method: 'post',
      body: data
    }, (e) => {
      const progress = e.loaded / e.total;
      console.log(progress);
      this.setState({
        progress: progress
      });
    }).then((res) => console.log(res), (e) => console.log(e))
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.sendServer}>
          <View style={styles.content}>
            <Text style={styles.text}>
              <Text style={styles.bold}> {this.state.num}  {this.state.progress} </Text> images has been selected
            </Text>
          </View>
        </TouchableOpacity>
        <CameraRollPicker
          scrollRenderAheadDistance={500}
          initialListSize={1}
          pageSize={3}
          removeClippedSubviews={false}
          groupTypes='SavedPhotos'
          batchSize={5}
          maximum={10}
          selected={this.state.selected}
          assetType='Photos'
          imagesPerRow={3}
          imageMargin={5}
          callback={this.getSelectedImages.bind(this)} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6AE2D',
  },
  content: {
    marginTop: 15,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  text: {
    fontSize: 16,
    alignItems: 'center',
    color: '#fff',
  },
  bold: {
    fontWeight: 'bold',
  },
  info: {
    fontSize: 12,
  },
});
