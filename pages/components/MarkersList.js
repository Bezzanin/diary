import React, { Component } from "react";
import { View, Text, StyleSheet, ScrollView, ListView, Keyboard, Linking } from "react-native";

import MarkersItem from './MarkersItem';



class MarkersList extends Component {




    constructor(props) {
    super(props);
    this.state = {
       news: null,
       dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
       listMarkers: this.props.markers
    }
}

  componentDidMount() {
    this.timeout = setTimeout(() => {
        this.setState({
           dataSource: this.state.dataSource.cloneWithRows(this.props.markers),
        });
    }, 1100)
      };

componentWillReceiveProps(nextProps) {
    if((this.props.markers) !== (nextProps.markers)) // Check if new markers are different from old
    {
    this.setState({
           dataSource: this.state.dataSource.cloneWithRows(nextProps.markers),
        });
    }
   
} 

    
  render() {
     
    return (
        <View>
        <ListView
        style={styles.newsScroll}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        enableEmptySections 
        dataSource={this.state.dataSource}
        onScroll={() => Keyboard.dismiss()}
        renderRow={(article) => {
            handleClick = () => {
            const url = article.url
            Linking.canOpenURL(url).then(supported => {
             if (supported) {
            Linking.openURL(url);
            } else {
          console.log('Don\'t know how to open URI: ' + url);
           }
          });
          };

            return (
                <MarkersItem
                    title={article.title}
                    description={article.content.replace(/(<([^>]+)>)/ig,"")}
                    onPress={handleClick}
                />
            )
        }}
        />
        </View> 
    );
  }
}

const styles = StyleSheet.create({
   newsScroll: {
    position: 'absolute',
    bottom: 60,
    height: 200
  },
  });

export default MarkersList;

