import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
} from 'react-native';

import { Components } from 'expo';
import WalkRoutes from '../data/walkroutes';
import { restaurantMarkers, routeMarkers } from '../data/markers';
import Filters from './components/Filters';
import Layout from '../constants/Layout';
import Icons from './components/Icons';
import MarkersList from './components/MarkersList';
import ModalDropdown from 'react-native-modal-dropdown';
import MapDropDown from './components/MapDropDown';

import Geocoder from 'react-native-geocoding';



export default class MapScreen extends Component {

  

  static route = {
    navigationBar: {
      title: 'Map',
    },
  }

  constructor() {
  super();
  this.state = {
    AllMarkers: [],
    CategoryMarkers: [],
    option: '',
    slug: '',
    initialPosition: 'unknown',
    lastPosition: 'unknown',
    longi: '',
    lati: '',
    venueName: '',
    venueAbout: ''
  };
  this.findMarkers = this.findMarkers.bind(this);
  this.handleClick = this.handleClick.bind(this);
  this.findLat = this.findLat.bind(this);
  this.findLng = this.findLng.bind(this);
}

  componentWillMount() {
    const { option } = this.props.route.params;
    const { lati } = this.props.route.params;
    const { longi } = this.props.route.params;
    const { venueName } = this.props.route.params;
    const { venueAbout } = this.props.route.params;

      this.setState({
           option,
           lati,
           longi,
           venueName,
           venueAbout
        });


    fetch('http://test.madeinyaba.com/api/get_posts/?post_type=markers')
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
           AllMarkers: responseData.posts,
        });
      })
      .done();

    };
  componentDidMount() {
  
   this.timeout = setTimeout(() =>  {this.findMarkers(this.state.option)}, 1000);

   navigator.geolocation.getCurrentPosition(
      (position) => {
        var initialPosition = JSON.stringify(position);
        this.setState({initialPosition});
      },
      (error) => alert(JSON.stringify(error)),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
    this.watchID = navigator.geolocation.watchPosition((position) => {
      var lastPosition = JSON.stringify(position);
      this.setState({lastPosition});
    });
  
}
componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

findMarkers = (option) => {
  console.log(option);
  console.log(this.props.route.params.option)
  console.log(this.props.route.params.lati);
  if (typeof option === 'undefined' || option === 'all') {
    this.setState({
      CategoryMarkers: this.state.AllMarkers,
    });
  } else {
  var newMarkers = this.state.AllMarkers.filter((marker) => {
    //console.log('This is slug' + marker.categories[0].slug)
    return (marker.categories[0].slug === option);
    
  });
  this.setState({
      CategoryMarkers: newMarkers,
    });
}

}

findLat = (address) => {
    let lat = 65.8461049;
    Geocoder.setApiKey('AIzaSyDeysWARAoiSW9iahymB-PMW8raOptcm-s');
    Geocoder.getFromLocation(address).then(
      json => {
        var location = json.results[0].geometry.location;
        lat = location.lat;
      },
      error => {
        console.log('Error');
        alert(error);
      }
    )
    console.log(lat)
    return lat; 
    
   
}

findLng = (address) => {
    let long = 24.1473903;
     Geocoder.setApiKey('AIzaSyDeysWARAoiSW9iahymB-PMW8raOptcm-s'); // use a valid API key
     Geocoder.getFromLocation(address).then(
      json => {
        var location = json.results[0].geometry.location;
        long = location.lng;
      },
      error => {
        alert(error);
      }
    );
    console.log(long)
return long;
}

handleClick(idx, value) {
    this.setState({
           option: value,
        }, ()=>{
          this.findMarkers(this.state.option)
        });
    
    console.log(this.state.initialPosition);
    console.log(this.state.lastPosition);
  }

  render() {
        if (this.state.option === 'route') {
          return(
            <View style={styles.container}>
              <StatusBar barStyle="dark-content"/>
                <Components.MapView
                    style={styles.map}
                    initialRegion={{
                    latitude: 65.8444,
                    longitude: 24.1449,
                    latitudeDelta: 0.0222,
                    longitudeDelta: 0.0121,
                    }}
                  showUserLocation={true}
                  followUserLocation={true}
              >
                <Components.MapView.Polyline
              coordinates={WalkRoutes}
              strokeColor="#5392FF"
              fillColor="rgba(255,0,0,0.5)"
              strokeWidth={1}
            />
            {WalkRoutes.map((marker, i) => (
          <Components.MapView.Marker
            key={i}
            coordinate = {{
                latitude: marker.latitude,
                longitude: marker.longitude
            }}
          />
          ))}
              </Components.MapView>
              <MarkersList 
          markers={this.state.CategoryMarkers}
         />
         <MapDropDown 
         option={this.state.option}
         handleClick = {this.handleClick} />
          </View>
          )
        } else if (this.state.option === 'event') {
            return(
               <View style={styles.container}>
                 <StatusBar barStyle="dark-content"/>
                <Components.MapView
                    style={styles.map}
                    initialRegion={{
                    latitude: parseFloat(this.state.lati),
                    longitude: parseFloat(this.state.longi),
                    latitudeDelta: 0.0222,
                    longitudeDelta: 0.0121,
                    }}
                  showUserLocation={true}
                  followUserLocation={true}
              >
          <Components.MapView.Marker
            coordinate = {{
                latitude: parseFloat(this.state.lati),
                longitude: parseFloat(this.state.longi)
            }}
            title={this.state.venueName}
            description={this.state.venueAbout}
          />
              </Components.MapView>
              <MarkersList 
          markers={this.state.CategoryMarkers}
         />
         <MapDropDown 
         option={this.state.option}
         handleClick = {this.handleClick} />
          </View>
            )
          }
          else {

        return(
          <View style={styles.container}>
            <StatusBar barStyle="dark-content"/>
          <Components.MapView
          style={styles.map}
          initialRegion={{
            latitude: 65.8444,
            longitude: 24.1449,
            latitudeDelta: 0.0222,
            longitudeDelta: 0.0121,
          }}
          showUserLocation={true}
          followUserLocation={true}
          >
          {this.state.CategoryMarkers.map((marker, i) => (
            
          <Components.MapView.Marker
            key={i}
            coordinate = {{
                latitude: parseFloat(marker.taxonomy_latitude[0].title),
                longitude: parseFloat(marker.taxonomy_longitude[0].title)
            }}
            title={marker.title}
            description={marker.content.replace(/(<([^>]+)>)/ig,"")}
          />
          
          ))}
         </Components.MapView>
         <MarkersList 
          markers={this.state.CategoryMarkers}
         />
         <MapDropDown 
         option={this.state.option}
         handleClick = {this.handleClick} />
          </View>
        )}
    
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative'
  },
  map: {
    width: Layout.window.width,
    height: Layout.window.height
  },
  title: {
    fontWeight: 'bold',
    fontSize: 32,
    margin: 8,
  },
  version: {
    fontSize: 18,
  },
});