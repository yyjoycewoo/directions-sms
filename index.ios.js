'use strict';

import React from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';

// either import the whole module and call as Communications.method()
import Communications from 'react-native-communications';

// or can now import single methods and call straight via the method name
// import { web, phonecall } from 'react-native-communications';
// e.g. onPress={() => { web('http://www.github.com') }}

const RNCommunications = React.createClass({

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => Communications.phonecall('0123456789', true)}>
          <View style={styles.holder}>
            <Text style={styles.text}>Make phonecall</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Communications.email(['emailAddress1', 'emailAddress2'],null,null,'My Subject','My body text')}>
          <View style={styles.holder}>
            <Text style={styles.text}>Send an email</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Communications.text('0123456789')}>
          <View style={styles.holder}>
            <Text style={styles.text}>Send a text/iMessage</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Communications.web('https://github.com/facebook/react-native')}>
          <View style={styles.holder}>
            <Text style={styles.text}>Open react-native repo on Github</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'rgb(253,253,253)',
  },
  holder: {
    flex: 0.25,
    justifyContent: 'center',
  },
  text: {
    fontSize: 32,
  },
});

AppRegistry.registerComponent('RNCommunications', () => RNCommunications);