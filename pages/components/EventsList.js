import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity, WebView, Linking, ListView, ScrollView, Keyboard } from "react-native";
import { Card, ListItem, Button } from 'react-native-elements'
import { Router } from '../../main';
import moment from 'moment';
import Layout from '../../constants/Layout';
import { withNavigation } from '@expo/ex-navigation';
var _ = require('lodash');

@withNavigation
class EventsList extends Component {

  constructor(props) {
    super(props);
    this._goToScreen = this._goToScreen.bind(this);
    this.state = {
      events: [],
       dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    }
}


   static route = {
    navigationBar: {
      title: 'Events', 
    },
  }

  static propTypes = {
    url: React.PropTypes.string,
  };

    _goToScreen = (name, option, lati, longi, venueName, venueAbout) => () => {
    this.props.navigator.push(Router.getRoute(name, { 
      option: option,
      lati: lati,
      longi: longi,
      venueName: venueName,
      venueAbout: venueAbout   }));
    console.log(lati);
    console.log(longi)
  }


  componentWillMount() {
    fetch('http://www.json.pub/kegs/1f947ee5ad3b/tap.json')
      .then((response) => response.json())
      .then((responseData) => {
        var results = _.uniqBy(responseData.events, 'id');
        this.setState({
          events: results,
        });
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(this.state.events),
        });
      })
      .done();
      };

  render() {
    return (
        <ScrollView>
           <ListView
        
        horizontal={false}
        enableEmptySections 
        dataSource={this.state.dataSource}
        onScroll={() => Keyboard.dismiss()}
        renderRow={(event) => {
            handleClick = () => {
            const url = "https://www.facebook.com/events/"+event.id+"/"
            Linking.canOpenURL(url).then(supported => {
             if (supported) {
            Linking.openURL(url);
            } else {
          console.log('Don\'t know how to open URI: ' + url);
           }
          });
          };

            return (
              <Card
                containerStyle={styles.container}
                image={{uri: event.coverPicture}}
                title={event.name}
                titleStyle={{fontWeight: 'bold', fontSize: 24, padding: 6, marginBottom: 0}}>
                <Text style={styles.day}>{moment(event.startTime).format('DD-MM-YY')} in {event.venue.name}</Text>
              <Text 
                numberOfLines={8}
                style={{fontSize: 16, lineHeight: 25, fontWeight: '300', padding: 6}}
                >{event.description}</Text>
              <TouchableOpacity  onPress={handleClick}>
                <Text style={styles.day}>Read More</Text>
              </TouchableOpacity>
              <View style={styles.separator} />
              <TouchableOpacity  onPress={this._goToScreen('map', "event", 
              event.venue.location.latitude, 
              event.venue.location.longitude, 
              event.venue.name, 
              event.venue.about)}>
                <Text style={styles.mapButton}>Show On Map</Text>
              </TouchableOpacity>
              </Card>
            )
        }}
        />


      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  date: {
    backgroundColor: '#FED500',
    opacity: 1,
    borderRadius: 10,
    width: 60,
    height: 60,
    shadowColor: "#000000",
    shadowOpacity: 0.5,
    shadowRadius: 3,
    shadowOffset: {
      height: 1,
      width: 0
    },
    marginTop: -60,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#FFFFFF',
    borderWidth: 0,
    borderRadius: 5,
    width: Layout.window.width*0.9,
    minHeight: 100,
    marginHorizontal: 15,
    shadowColor: "#000000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: {
      height: 3,
      width: 0
    },
    marginVertical: 15,
  },
  day: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#120F2B',
    opacity: 0.50,
    marginTop: -8,
    marginBottom: 8,
    padding: 6,
  },
  separator: {
    backgroundColor: '#E7E7E7',
    alignSelf: 'stretch',
    height: 1,
    marginBottom: 8,
  },
  mapButton: {
    fontSize: 16,
    color: '#0F64F7',
    alignSelf: 'flex-end',
    fontWeight: '500'
  }
});

export default EventsList;

