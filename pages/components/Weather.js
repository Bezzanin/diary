import React, { Component } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
const APIKEY = '72b1147fa88e38fbbaae0586c19823d5';

class Weather extends Component {

constructor(props) {
    super(props);
    this.state = {
      temperature: null,
      humidity: null,
      windSpeed: null,
      icon: null,
      summary: '',
    }
   
 }
  componentWillMount() {
    fetch('https://api.forecast.io/forecast/' + APIKEY + '/65.8444,24.1449?units=si&lang=fi')
      .then(res => res.json())
      //this.setState is our method of telling react that we changed something and it needs to re-render our application and figure out what changed
      .then(resJson => this.setState({
        temperature: resJson.currently.temperature,
        humidity: resJson.currently.humidity,
        windSpeed: resJson.currently.windSpeed,
        icon: resJson.currently.icon,
        summary: resJson.currently.summary,
       
      }))
      };

  render() {
    return (
       <Image source={require('../../assets/hero.png')} 
         style={styles.header}>
       	 <View style={styles.center}>
            <Text style={styles.lowerText1}>Tornio</Text>
            <Text style={styles.lowerText}> Temperature: {Math.round(this.state.temperature) + "°C"} </Text>
            <Text style={styles.lowerText}> Humidity: {this.state.humidity} </Text>
  				  <Text style={styles.lowerText}> {this.state.summary} </Text>
  				</View>

        </Image>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  center: {
    marginTop: 20,
  },
  lowerText: {
    color: '#FFFFFF',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignSelf: 'center',
    fontSize: 20,
  },
  lowerText1: {
    color: '#FFFFFF',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 25,
  },
  header: {
    flex: 1,
    alignSelf: 'stretch',
    width: null,
    height: 200,
  }
  
});

export default Weather;