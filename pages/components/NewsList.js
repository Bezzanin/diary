import React, { Component } from "react";
import { View, Text, StyleSheet, ScrollView, ListView, Keyboard, Linking } from "react-native";

import NewsItem from './NewsItem'



class NewsList extends Component {




    constructor(props) {
    super(props);
    this.state = {
       news: null,
       dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    }
}

  componentWillMount() {
    fetch('http://test.madeinyaba.com/api/get_posts/')
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
           dataSource: this.state.dataSource.cloneWithRows(responseData.posts),
        });
      })
      .done();
      };

    
  render() {
     
    return (
        <View>
        <ListView
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
                <NewsItem
                    title={article.title}
                    description={article.content.replace(/(<([^>]+)>)/ig,"")}
                    onPress={handleClick}
                    date={article.date}
                    author={article.author.name}
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
    backgroundColor: 'transparent',
  },
  });

export default NewsList;

