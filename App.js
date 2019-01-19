import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Linking,Platform  } from "react-native";
import { Button } from 'react-native';

export default class App extends React.Component {
  someFunction() {
    const url = (Platform.OS === 'android')
    ? 'sms:16473763108?body=your message'
    : 'sms:16473763108'
    Linking.canOpenURL(url).then(supported => {
      if (!supported) {
        console.log('Unsupported url: ' + url)
      } else {
        return Linking.openURL(url)
      }
    }).catch(err => console.error('An error occurred', err))
  }

  render() {
    return (
      <Button
        onPress={someFunction()}
        title="Learn More"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
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
