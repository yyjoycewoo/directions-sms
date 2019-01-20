import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Linking,Platform  } from "react-native";
import { AppRegistry, TextInput, KeyboardAvoidingView, Image, ImageBackground } from 'react-native';
import { Button } from 'react-native-elements';
import { material, systemWeights } from 'react-native-typography';
import { Icon } from 'react-native-elements'

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = { 
      text: '',
      latitude: null,
      longitude: null,
      error: null,
      invalidText: ''
    };
  }
  focusTextInput = () => {
    // Explicitly focus the text input using the raw DOM API
    // Note: we're accessing "current" to get the DOM node
    this.textInput.current.focus();
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
    if (this.state.text === '') {
      this.setState({invalidText: "You didn't enter anything!"})
    } else {
      const location = this.getLocation()
      console.log(location)

      async function waitForPromise() {
        await location
      }

      waitForPromise()
      body = this.state.text
      if (body.toLowerCase().includes("weather") || body.toLowerCase().includes("time")){
        //just add long and lat
        body = body + ` ${this.state.latitude}, ${this.state.longitude}`
      }
      else {
        //input is asking for directions, so add "getting you to" to indicate 
        body = `Getting you to ${body} from ${this.state.latitude}, ${this.state.longitude}`
      }
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
  }

  
  render() {
    return (

      <ImageBackground source={require('./bg.jpg')} style={styles.container} >
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled> 
        <Image source = {{uri: 'http://www.mobileswall.com/wp-content/uploads/2013/09/640-Abstract-Textures-l.jpg'}}/>
        {/* top section */}
        <View style = {styles.titleBar}>
          <Text style= {styles.lightTitle}>
            SMS{"\n"}ASSISTANT
          </Text>
        </View>
        {/* bottom section */}
        <View style = {{flex: 3}}>
          <Text style = {{marginLeft: 20, marginRight: 20, color: 'red'}}>
            {this.state.invalidText} 
          </Text>
          {/* question bar */}
          <View style = {{backgroundColor: 'rgba(0,0,0,0.3)', height: 50, justifyContent: 'center', paddingLeft: 20, marginBottom: 10,}}>

            <Text style = {styles.barText}> What can I help with? </Text>
          </View>
          {/* search bar + button */}

          <View style={styles.inputBar}>
              <TextInput
                
                style = {styles.textbox}
                placeholder="TYPE HERE"
                onChangeText={(text) => this.setState({text})}
                value={this.state.text}
                onSubmitEditing={this.createMessage}
              />
          
              <Button
                buttonStyle = {{height: 70, width: 70, backgroundColor: 'black'}}
                icon={
                  <Icon
                    name='search'
                    size={45}
                    color='white'
                  />
                }
                title = ""
              />
              {/* bottom border bar */}
              <View style={styles.bottomBorder}></View>
            </View>
        </View>
      </KeyboardAvoidingView>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textbox: {
    textAlign: "left",
    width: 300, 
    height: 70,
    margin: 5,
    paddingLeft: 20,
    fontSize: 18,
    borderColor: 'grey',
    //borderWidth: 2,
    color: 'white',
  },
  titleBar:{
    flex: 2, 
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'flex-start',
    //borderWidth: 2,
    borderColor: 'red' 
  },
  lightTitle: {
    ...material.titleObject,
    ...systemWeights.light,
    fontSize: 41,
    textAlign: 'left',
    paddingTop: 16,
    marginTop:10,
    marginLeft: 20,
    color: 'white',
  },
  barText: {
    ...material.titleObject,
    ...systemWeights.light,
    fontSize: 18,
    color: 'white',
  },
  inputBar: {
    flex: 1, 
    flexDirection: 'row',
    borderWidth: 2,
    alignSelf: 'stretch',
    borderColor: 'rgba(0,0,0,0.3)',
  },
  bottomBorder: {
    borderWidth: 2,
    alignSelf: 'stretch',
    //borderColor: 'rgba(0,0,0,0.3)',
    borderColor: 'red',
    height:50
  }

});
