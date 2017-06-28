import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Image
} from 'react-native';
import { Button, Text, Icon, Grid } from 'native-base';
import Camera from 'react-native-camera';

export default class NH extends Component {

  constructor = () => {
    super();
    this.state = {
      isCapturing: true,
      photoURI: ''
    }
  }

  _capture = () => {
    const options = {
      target: Camera.constants.CaptureTarget.disk,
      jpegQuality: 100,
    };

    this.camera.capture({options})
    .then((data) => {
      this.setState({photoURI: data.path, isCapturing: false});
    }).catch(err => console.error(err));
  }

  _closeResult = () => {
    this.setState({isCapturing: true});
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.isCapturing ?
          {/* show camera control*/}
          <View style={styles.container}>
            <View style={styles.container}>
              <Camera
                ref={(cam) => {
                  this.camera = cam;
                }}
                style={styles.preview}
                aspect={Camera.constants.Aspect.fill}>
              </Camera>
            </View>
            <Button full onPress={() => this._capture()}><Icon name='camera' /></Button>
          </View>
        : {/* show result */}
          <View style={styles.container}>
            <Image source={{uri: this.state.photoURI}} style={{flex: 1}} />
            <Button full onPress={() => this._closeResult()}><Text>No Hotdog</Text></Button>
          </View>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  }
});

AppRegistry.registerComponent('NH', () => NH);
