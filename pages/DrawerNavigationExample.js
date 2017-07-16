import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  StatusBar
} from 'react-native';
import {
  StackNavigation,
  DrawerNavigation,
  DrawerNavigationItem,
} from '@expo/ex-navigation';
import { Ionicons } from '@expo/vector-icons';
import { Router } from '../main';

export default class DrawerNavigationExample extends Component {

  _renderHeader = () => {
    return (
      <View style={{height: 180, width: 300}}>
        <Image source={require('../assets/sparkles.jpg')} style={styles.header} />
      </View>
    );
  };

  _renderTitle = (text: string, isSelected: bool) => {
    return (
      <Text style={[styles.buttonTitleText, isSelected ? styles.selectedText : null]}>
        {text}
      </Text>
    );
  };

  _renderIcon = (name: string, isSelected: bool) => {
    let extraStyle = {marginTop: 2};
    if (name === 'md-alert') {
      extraStyle = {...extraStyle, marginLeft: -3};
    }
    return (
      <Ionicons
        style={[styles.icon, isSelected ? styles.selectedText : null, extraStyle]}
        name={name}
        size={24}
      />
    );
  };

  render() {
    return (
      <DrawerNavigation
        drawerPosition="left"
        renderHeader={this._renderHeader}
        drawerWidth={300}
        initialItem="home">
        <DrawerNavigationItem
          id="home"
          selectedStyle={styles.selectedItemStyle}
          renderTitle={isSelected => this._renderTitle('Home', isSelected)}>
          <StackNavigation
            id="root"
            defaultRouteConfig={{
              navigationBar: {
                backgroundColor: '#FFF',
                tintColor: '#000',
              },
            }}
            initialRoute={Router.getRoute('home')}
          />
        </DrawerNavigationItem>
        <DrawerNavigationItem
          id="map"
          selectedStyle={styles.selectedItemStyle}
          renderTitle={isSelected => this._renderTitle('Map', isSelected)}>
          <StackNavigation
            id="root"
            defaultRouteConfig={{
              navigationBar: {
                backgroundColor: '#FFF',
                tintColor: '#000',
              },
            }}
            initialRoute={Router.getRoute('map')}
          />
        </DrawerNavigationItem>
        <DrawerNavigationItem
          id="timetable"
          selectedStyle={styles.selectedItemStyle}
          renderTitle={isSelected => this._renderTitle('Timetable', isSelected)}>
          <StackNavigation
            id="timetable"
            defaultRouteConfig={{
              navigationBar: {
                backgroundColor: '#FFF',
                tintColor: '#000',
              },
            }}
            initialRoute={Router.getRoute('timetable')}
          />
        </DrawerNavigationItem>
      </DrawerNavigation>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
    height: 180,
    width: null,
    resizeMode: 'cover',
  },
  buttonTitleText: {
    color: '#222',
    fontWeight: 'bold',
    marginLeft: 18,
  },
  icon: {
    color: '#999',
  },
  selectedText: {
    color: '#0084FF',
  },
  selectedItemStyle: {
    backgroundColor: "#E8E8E8",
  },
});
