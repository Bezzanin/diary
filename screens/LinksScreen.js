import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { ExpoLinksView } from '@expo/samples';

import CalendarStrip from 'react-native-calendar-strip';
import moment from 'moment';

export default class LinksScreen extends React.Component {
  static route = {
    navigationBar: {
      title: 'Links',
    },
  };

  constructor(props){
    super(props);
    this.state = {
    currentDay: [],
    javaDate: 'None',
      currentTime: moment().format('HH:mm'),
    }
  }

  onDateChange = (i) => {
    console.log(i);
    var jsDate = Date.now();
    console.log(jsDate);
    this.setState({ 
      currentDay: i.format('dddd'),
      javaDate: moment.unix('2017-05-05'),
    })
  }

  render() {
    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={this.props.route.getContentContainerStyle()}>
                 <CalendarStrip
                    calendarAnimation={{type: 'sequence', duration: 30}}
                    daySelectionAnimation={{type: 'background', duration: 300, highlightColor: 'white'}}
                    style={{paddingTop: 20, paddingBottom: 20}}
                    calendarHeaderStyle={{color: 'white'}}
                    calendarColor={'#00BAF7'}
                    dateNumberStyle={{color: 'white'}}
                    dateNameStyle={{color: 'white'}}
                    iconContainer={{flex: 0.1}}
                    onDateSelected={(i) => this.onDateChange(i)}
                    
                />
                 <Text 
              onTimeFormat={this.timeToDecimal}>{this.state.javaDate} + {this.state.currentDay} + {this.state.currentTime}</Text>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
  },
  testDay: {
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    fontSize: 20,
  },
});
