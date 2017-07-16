import Expo from 'expo';
import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import DrawerNavigationExample from './pages/DrawerNavigationExample';
import HomeScreen from './pages/HomeScreen';
import TimetableScreen from './pages/TimetableScreen';
import MapScreen from './pages/MapScreen';
import EventList from './pages/components/EventsList'

import {
  createRouter,
  NavigationProvider,
} from '@expo/ex-navigation';

const assets = [

];
/**
  * This is where we map route names to route components. Any React
  * component can be a route, it only needs to have a static `route`
  * property defined on it, as in HomeScreen below
  */
export const Router = createRouter(() => ({
  home: () => HomeScreen,
  timetable: () => TimetableScreen,
  map: () => MapScreen,
  EventList: () => EventListScreen,
  
}));

class App extends Component {

  state = {
    bootstrapped: false,
  };

  componentDidMount() {
    this._bootstrap();
  }

  _bootstrap = async () => {
    const promises = assets.map(module => Asset.fromModule(module).downloadAsync());
    await Promise.all(promises);
    this.setState({
      bootstrapped: true,
    });
  };

  render() {
    if (!this.state.bootstrapped) {
      return (<Expo.AppLoading />);
    }

    
    return (
      <NavigationProvider router={Router}>
        <StatusBar barStyle="light-content" />
        <DrawerNavigationExample />
      </NavigationProvider>
    );
  }
}

Expo.registerRootComponent(App);