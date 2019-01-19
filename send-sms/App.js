import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Linking,Platform  } from "react-native";
import { Button, AppRegistry, TextInput } from 'react-native';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      text: 'Where do you want to go?',
      latitude: null,
      longitude: null,
      error: null
    };
  }

  createMessage = () => {
    // console.log(this.state.text)
    const url = (Platform.OS === 'android')
    ? `sms:16473763108?body=${this.state.text}`
    : `sms:16473763108&body=${this.state.text}`
    Linking.canOpenURL(url).then(supported => {
      if (!supported) {
        console.log('Unsupported url: ' + url)
      } else {
        return Linking.openURL(url)
      }
    }).catch(err => console.error('An error occurred', err))

    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: 'success',
        });
      },
      (error) => this.setState({ error: 'errored'/*error.message*/ }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );

    console.log(this.state)
  }

  render() {
    return (
      <React.Fragment>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}
        />
        
        <Button
          onPress={this.createMessage}
          title="Get me directions!"
          color="#841584"
          accessibilityLabel="Get me directions!"
        />
      </React.Fragment>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
