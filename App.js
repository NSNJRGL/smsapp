import React, { Component } from 'react';
import {
  View,
  Button,
  PermissionsAndroid,
  Text,
  TouchableOpacity,
} from 'react-native';

import axios from 'axios';

import {NativeModules} from 'react-native';

var DirectSms = NativeModules.DirectSms;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { lists: {}};
  }

  async componentDidMount() {
    try {
      const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.SEND_SMS,
          {
              title: 'YourProject App Sms Permission',
              message:
              'YourProject App needs access to your inbox ' +
              'so you can send messages in background.',
              buttonNeutral: 'Ask Me Later',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
          },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        const lists = await axios.get("http://10.0.2.2:3001/lists");

        this.interval = setInterval(() => 
          this.setState({ lists: lists.data }, function() {
            DirectSms.sendDirectSmsJava(this.state.lists.number, this.state.lists.message )
          }),
        10000);
        return Promise.resolve();
      } else {
        console.warn("Permission denied");
      }
    } catch (err) {
        console.warn(err);
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    console.log(this.state.lists);
    return (
      <View>
        <Text>Hello sms app</Text>
      </View>
      );
  }
};

export default App;
