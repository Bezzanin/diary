import React, { Component } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from "react-native";

import { Icon } from 'react-native-elements';
import { withNavigation } from '@expo/ex-navigation';
import { Router } from '../../main';

@withNavigation
class Icons extends Component {

    constructor(props) {
    super(props);
    this._goToScreen=this._goToScreen.bind(this);
   }
static route = {
    navigationBar: {
      title: 'Examples',
    },
  }
_goToScreen = (name, option) => () => {
    this.props.navigator.push(Router.getRoute(name, { option }));
}

  render() {
    return (
      <ScrollView horizontal style={styles.iconsContainer} showsHorizontalScrollIndicator={false}>
          <TouchableOpacity onPress={this._goToScreen('map', "restaurant")}>
            <View>
              <View style={styles.placeIcon}>
                  <Image style={{width: 80, height: 80}}
                  resizeMode={'contain'}
                    source={require('../../assets/restaurant.png')} 
                  />
              </View>
                <Text style={styles.iconText} >Restaurants</Text>                 
            </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={this._goToScreen('map', 'hotel')}>
            <View>
              <View style={styles.placeIcon}>
                  <Image style={{width: 80, height: 80}}
                  resizeMode={'contain'}
                    source={require('../../assets/hotel.png')} 
                  />
              </View>
                <Text style={styles.iconText} >Hotels</Text>                 
            </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={this._goToScreen('map', 'activity')}>
            <View>
              <View style={styles.placeIcon}>
                  <Image style={{width: 80, height: 80}}
                  resizeMode={'contain'}
                    source={require('../../assets/activity.png')} 
                  />
              </View>
                <Text style={styles.iconText} >Activity</Text>                 
            </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={this._goToScreen('map', 'shop')}>
            <View>
              <View style={styles.placeIcon}>
                 <Image style={{width: 80, height: 80}}
                    resizeMode={'contain'}
                    source={require('../../assets/shop.png')} 
                  />
              </View>
                <Text style={styles.iconText} >Shops</Text>                 
            </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={this._goToScreen('map', 'wi-fi-zone')}>
            <View>
              <View style={styles.placeIcon}>
                  <Image style={{width: 80, height: 80}}
                  resizeMode={'contain'}
                  source={require('../../assets/wifi.png')} 
                  />
              </View>
                <Text style={styles.iconText} >Wifi</Text>                 
            </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={this._goToScreen('map', 'route')}>
            <View>
              <View style={styles.placeIcon}>
                  <Image style={{width: 80, height: 80}}
                  resizeMode={'contain'}
                    source={require('../../assets/monument.png')} 
                  />
              </View>
                <Text style={styles.iconText} >Routes</Text>                 
            </View>
            </TouchableOpacity>
        </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  placeIcon: {
    width: 82,
    height: 82,
    marginHorizontal: 4,
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
    },
    
  },
  iconText: {
    justifyContent: 'center',
    alignSelf: 'center',
    fontSize: 14,
    letterSpacing: 0.047,
    color: '#000000',
    backgroundColor: 'transparent',
  },
  iconsContainer: {
    paddingLeft: 12,
    zIndex: 11
  }
  
});

export default Icons;


