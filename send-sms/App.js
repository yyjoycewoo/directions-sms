import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Linking,Platform  } from "react-native";
import { AppRegistry, TextInput, KeyboardAvoidingView } from 'react-native';
import Button from 'apsl-react-native-button'

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      text: '',
      latitude: null,
      longitude: null,
      error: null
    };
  }

  getLocation = async() => {
  
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: 'success',
        });
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }

  createMessage = () => {
    const location = this.getLocation()
    console.log(location)

    async function waitForPromise() {
      await location
    }

    waitForPromise()
    
    const body = `Getting you to ${this.state.text} from ${this.state.longitude}, ${this.state.latitude}`
    const url = (Platform.OS === 'android')
    ? `sms:17053006844?body=${body}`
    : `sms:17053006844&body=${body}`
    Linking.canOpenURL(url).then(supported => {
      if (!supported) {
        console.log('Unsupported url: ' + url)
      } else {
        return Linking.openURL(url)
      }
    }).catch(err => console.error('An error occurred', err))

    console.log(this.state)
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled> 
        <View style = {{flex: 1, justifyContent: 'center'}}>

          <Text style= {{fontSize: 28}}>
            DIRECTIONS SMS
          </Text>
        </View>
        <View style = {{flex: 1}}>
        <TextInput
          style={styles.textbox}
          placeholder="Where are you going?"
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}
          onSubmitEditing= { this.createMessage}
        />
        
        <Button
          style={{backgroundColor: '#1daee2', margin: 10}} 
          textStyle={{color: 'white'}}
          onPress={this.createMessage}
          //color="#841584"
          accessibilityLabel="Get me directions!"
        > Take me there!</Button>
      </View>
      </KeyboardAvoidingView>
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
  textbox: {
    height: 40, 
    width: 300, 
    borderColor: 'gray', 
    borderWidth: 1, 
    margin: 10, 
    textAlign: "center"
  }
});
