import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  WebView,
  Linking,
  ListView
} from 'react-native';

import CalendarStrip from 'react-native-calendar-strip';
import moment from 'moment';
import { List, ListItem} from 'react-native-elements';
import SininenLinja from '../data/kaupunkilinja';
import Filters from './components/Filters';
import LinjaCard from './components/LinjaCard';

var _ = require('lodash');

const filterItems = (filter, SininenLinja) => {
    return SininenLinja.filter((item) => {
        if (filter == "ALL") return true;
        if (filter == "Vihrea") return item.linja === "Vihrea";
        if (filter == "Sininen") return item.linja === "Sininen";
        if (filter == "Punainen") return item.linja === "Punainen";
    })
}

export default class TimetableScreen extends Component {


componentDidMount() {
  this.setState({
          dataSource: this.state.dataSource.cloneWithRows(SininenLinja),
        });
  this.timeToDecimal(this.state.currentTime);
  this.timeout = setTimeout(() => this.findNearest(this.state.timeinNumber), 100) ;
  this.interval = setInterval(() => this.timeToDecimal(this.state.currentTime) &
  this.setState({
         currentTime: moment().format('HH:mm'),
        }), 5000);
}
componentWillUnmount() {
  
  clearInterval(this.interval);
}

  static route = {
    navigationBar: {
      title: 'Timetable',
    },
  }

  constructor(props){
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      filter: 'ALL',
      currentDay: moment().format('dddd'),
      currentTime: moment().format('HH:mm'),
      timeinNumber: '',
      lastStop: '',
      dataSource: ds.cloneWithRows([]),
    }
    this.timeToDecimal = this.timeToDecimal.bind(this);
    this.findNearest = this.findNearest.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
    this.setSource = this.setSource.bind(this);
  }

timeToDecimal(currentTime) {
    var arr = currentTime.split(':');
    var dec = parseInt((arr[1])*10, 10);
    this.setState({
        timeinNumber: parseFloat(parseInt(arr[0], 10) + '.' + (dec<10?'0':'') + dec),
      });
    var timeNow = this.state.timeinNumber;
}

handleFilter(filter) {
  this.setSource(SininenLinja, filterItems(filter, SininenLinja), { filter });
}

setSource(SininenLinja, itemsDatasource, otherState = {}){
    this.setState({
      SininenLinja,
      dataSource: this.state.dataSource.cloneWithRows(itemsDatasource),
      ... otherState
    })
  }

showOnMap = () => {
  const url = "http://v3.kiho.fi/public/mymap?map=953744"
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log('Don\'t know how to open URI: ' + url);
      }
    });
  };


findNearest = (timeinNumber) => {
  var compareTimes = SininenLinja.filter((stop) => {
    return (stop.time <= timeinNumber)
  });
  var findNextStop = SininenLinja.filter((stop) => {
    return (stop.time > timeinNumber)
  });
  let displayStop = _.last(compareTimes)
  let displaynextStop = _.first(findNextStop)
  this.setState({
        lastStopName: displayStop.name,
        lastStopLinja: displayStop.linja,
        lastStopTime: displayStop.time.toFixed(2).toString().replace('.', ':'),
        nextStopName: displaynextStop.name,
        nextStopTime: displaynextStop.time.toFixed(2).toString().replace('.', ':')
      });
  console.log(displayStop.time);
};

 

  render() {
    return (
   <ScrollView>
      <StatusBar barStyle="dark-content"/>
                <CalendarStrip
                    daySelectionAnimation={{type: 'border', duration: 300, borderWidth: 2, borderHighlightColor: '#0F64F7', highlightColor: '', zIndex: 10}}
                    style={{paddingTop: 20, paddingBottom: 20, borderWidth: 0.5, borderColor: '#CDCDCD'}}
                    calendarHeaderStyle={{color: 'black'}}
                    calendarColor={'#FFFFFF'}
                    dateNumberStyle={{color: 'black', fontSize: 15}}
                    dateNameStyle={{color: 'black'}}
                    highlightDateNumberStyle={{color: '#000', fontSize: 15}}
                    highlightDateNameStyle={{color: '#000'}}
                    iconContainer={{flex: 0.1}}
                    styleWeekend={false}
                    onDateSelected={(i) => this.setState({ currentDay: i.format('dddd') })}
                    
                />
                  <LinjaCard
                  prevStop={this.state.lastStopName}
                  prevStopTime={this.state.lastStopTime}
                  nextStop={this.state.nextStopName}
                  nextStopTime={this.state.nextStopTime}
                  lastLinja={this.state.lastStopLinja}
                  onPress={this.showOnMap}
                  />
                  <Filters
                    onFilter={this.handleFilter}
                    filter={this.state.filter}/>  
                <List>
                  <ListView
                  enableEmptySections={true}
                  dataSource={this.state.dataSource}
                  renderRow={(item, i) => {
                    var stoptime = item.time.toFixed(2);
              if (item.linja == "Vihrea") {
                return (
              <ListItem
                      hideChevron={true}
                      rightTitle={stoptime.toString().replace('.', ':')}
                      key={i}
                      title={item.name}
                      leftIcon={{name: "directions-bus", color: '#8cd211'}}
                      rightTitleContainerStyle={{flex: 0.2}}
                      rightTitleStyle={styles.timeOfStop}
                      titleStyle={styles.nameOfStop}
                  />);}
                  else if (item.linja == "Sininen") {
                  return (
                  <ListItem
                      leftIcon={{name: "directions-bus", color: '#4178bc'}}
                      key={i}
                      title={item.name}
                      hideChevron={true}
                      rightTitle={stoptime.toString().replace('.', ':')}
                      rightTitleContainerStyle={{flex: 0.2}}
                      rightTitleStyle={styles.timeOfStop}
                      titleStyle={styles.nameOfStop}
                />);}
                else if (item.linja == "Punainen") {
                  return (
                  <ListItem
                      leftIcon={{name: "directions-bus", color: '#ff5050'}}
                      key={i}
                      title={item.name}
                      hideChevron={true}
                      rightTitle={stoptime.toString().replace('.', ':')}
                      rightTitleContainerStyle={{flex: 0.2}}
                      rightTitleStyle={styles.timeOfStop}
                      titleStyle={styles.nameOfStop}
                />);}
              }}
                  />
                </List>

              <Text style={styles.testDay} 
              onTimeFormat={this.timeToDecimal}>{this.state.currentDay} {this.state.currentTime}</Text>
            </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn: {
    backgroundColor: "red",
    marginTop: 100,
    alignSelf: 'center',
    width: 100,
    height: 100,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 32,
    margin: 8,
  },
  version: {
    fontSize: 18,
  },
  testDay: {
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    fontSize: 20,
  },
  timeOfStop: {
    fontWeight: "500",
    fontSize: 18,
    lineHeight: 18,
    color: "#000"
  },
  nameOfStop: {
    fontWeight: "500",
    fontSize: 14,
    lineHeight: 14,
    color: "#000"
  }
});
