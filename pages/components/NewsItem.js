import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Image
} from 'react-native';

import moment from 'moment';

export default function NewsItem({ title, description, image, onPress, date, author }) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.title}>{title}</Text>
      {/*<Image source={{uri: image}} style={{flex: 1, resizeMode: 'cover'}}></Image>*/}
      <Text adjustsFontSizeToFit={false} 
      style={styles.description}
      numberOfLines={5}
      >{description}</Text>

      <Text adjustsFontSizeToFit={false} 
      style={styles.date}
      >{moment(date).format('DD.MM.YY')} by {author}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#0F64F7',
    borderWidth: 0,
    borderRadius: 5,
    paddingHorizontal: 14,
    width: 300,
    minHeight: 100,
    paddingVertical: 16,
    marginHorizontal: 15,
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
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
    margin: 2,
  },

  description: {
    fontSize: 12,
    color: '#FFF',
    margin: 2,
  },
  date: {
    fontSize: 12,
    color: '#FFF',
    margin: 2,
    fontWeight: 'bold'
  },
});
