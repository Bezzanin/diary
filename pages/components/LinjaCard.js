import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  View
} from 'react-native';

import moment from 'moment';
import {Grid, Col, Row} from 'react-native-elements';
import Layout from '../../constants/Layout';

export default function LinjaCard({ prevStop, prevStopTime, nextStop, nextStopTime, onPress}) {
  return (
    <View style={styles.container} >
      <Text style={styles.title}>Kaupunkilinja</Text>
      <Grid>
          <Col style={{marginHorizontal: 16}}>
            <Row><Text adjustsFontSizeToFit={false}
            style={styles.h2}
            >Last stop</Text></Row>
            <Row><Text style={styles.stopName}>{prevStop}</Text></Row>
            <Row><Text style={styles.prevTime}>{prevStopTime}</Text></Row>
          </Col>
          <Col style={{marginHorizontal: 16}}>
            <Row><Text adjustsFontSizeToFit={false} 
            style={styles.h2}
            >Next stop</Text></Row>
            <Row><Text style={styles.stopName}>{nextStop}</Text></Row>
            <Row><Text style={styles.nextTime}>{nextStopTime}</Text></Row>
          </Col>
        </Grid>
      <TouchableOpacity onPress={onPress} style={styles.buttonCont}>
          <Text style={styles.button}>Show On Map</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#FFF',
    borderWidth: 0,
    borderRadius: 5,
    paddingHorizontal: 14,
    width: Layout.window.width*0.9,
    minHeight: 100,
    paddingVertical: 16,
    shadowColor: "#3076F0",
    shadowOpacity: 0.5,
    shadowRadius: 7,
    shadowOffset: {
      height: 3,
      width: 0
    },
    marginVertical: 16,
    zIndex: 11
  },

  title: {
    fontSize: 20,
    fontWeight: '500',
    lineHeight: 20,
    color: '#000',
    alignSelf: 'center',
    marginBottom: 16,
  },
  h2: {
    fontWeight: '300',
    fontSize: 12,
    lineHeight: 12,
    color: '#000',
    opacity: 0.5,
    marginBottom: 4
  },
  prevTime: {
    fontWeight: "500",
    fontSize: 18,
    lineHeight: 18,
    color: "#000000",
    opacity: 0.50,
    marginTop: 8
  },
   nextTime: {
    fontWeight: "500",
    fontSize: 18,
    lineHeight: 18,
    color: "#0F64F7",
    marginTop: 8
  },
  buttonCont: {
    backgroundColor: "#0F64F7",
    opacity: 1.00,
    borderRadius: 5,
    width: Layout.window.width*0.8,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    height: 36,
    marginTop: 16
  },
  button: {
    color: "#FFF",
    alignSelf: 'center',
    fontWeight: "500",
    fontSize: 14,
    lineHeight: 14,
  },
  stopName: {
    fontWeight: "500",
    fontSize: 14,
    lineHeight: 14
  }
});
