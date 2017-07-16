import React, { Component } from 'react';
import {
  Text,
  ScrollView,
  View,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
  StatusBar
} from 'react-native';
import NewsItem from './components/NewsItem';
import { Router } from '../main';
import { Icon } from 'react-native-elements';
import Weather from './components/Weather';
import NewsList from './components/NewsList';
import EventsList from './components/EventsList';
import Icons from './components/Icons';
import Calendar from 'react-native-calendar';
import common from '../constants/common'


export default class HomeScreen extends Component {
  
  static route = {
    navigationBar: {
      title: 'Tornio Atlas',
    },
  }

    _goToScreen = (name, option) => () => {
    this.props.navigator.push(Router.getRoute(name, { option }));
  }

 
  
  render() {
    
    return (
      <ScrollView>
              <StatusBar
     barStyle="dark-content"
        />
        <Weather />
        <Text style={common.headers}>Discover Locations</Text>
        <Icons />
        <Text style={common.headers}>Promotions</Text>
        <NewsList />
        <Text style={common.headers}>Events</Text>
        <EventsList />
        
      </ScrollView>
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
  iconsContainer: {
    marginTop: -250,
  },
  placeIcon: {
    width: 80,
    height: 80,
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 6,
    shadowColor: "rgba(0,0,0,0.15)",
    shadowOpacity: 0,
    shadowRadius: 3,
    shadowOffset: {
      height: 3,
      width: 0
    }
  },
  //weather
  lowerText: {
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignSelf: 'center',
    fontSize: 25,  
  },
  iconText: {
    justifyContent: 'center',
    alignSelf: 'center',
    fontSize: 14,
    marginVertical: 10,
    backgroundColor: 'transparent',
  },
  
});


