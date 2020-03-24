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

    this.state = { lists: []};
  }

  updateList(data) {
    axios({
      method: 'put',
      url: 'http://192.168.1.6:3001/lists/' + data.id,
      data: {
        id: data.id,
        status: 1
      },
      params: {
        id: data.id
      },
    }).then(function (response) {
      console.log(response.status);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  async getList() {
    const lists = await axios.get("http://192.168.1.6:3001/lists");

    console.log(lists.data)

    lists.data.map((data) => {
      if(data.status === 0 ) {
        this.updateList(data);
        DirectSms.sendDirectSmsJava(this.state.lists.number, this.state.lists.message )
      }
    })

    return Promise.resolve();
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
        this.interval = setInterval(this.getList, 10000);
        this.getList();
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
