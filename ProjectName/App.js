/*This is an Example of Sending Text SMS in React Native*/
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import SendSMS from 'react-native-sms';
// import SmsAndroid from 'react-native-sms-android';

export default class App extends React.Component {
  someFunction() {
    var SmsAndroid = require('react-native-sms-android');

    SmsAndroid.sms(
      '6473763108', // phone number to send sms to
      'This is the sms text', // sms body
      'sendDirect', // sendDirect or sendIndirect
      (err, message) => {
        if (err){
          console.log("error");
        } else {
          console.log(message); // callback message
        }
      }
    );
  }
  render() {
    return (
      <View style={styles.MainContainer}>
        <TouchableOpacity onPress={this.someFunction.bind(this)}>
        <View>
          <Image
            //We are showing the Image from online
            source={{
              uri:
                'https://aboutreact.com/wp-content/uploads/2018/09/sms.png',
            }}
            //You can also show the image from you project directory like below
            //source={require('./Images/sms.png')}
            style={styles.ImageStyle}
          />
          <Text style={styles.text}>Send SMS</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#000',
  },
  text: {
    color: 'black',
    textAlign:'center',
    fontSize: 25,
    marginTop:16,
  },
  ImageStyle: {
    height: 150,
    width: 150,
    resizeMode: 'stretch',
  },
});