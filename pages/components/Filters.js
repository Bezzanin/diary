import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

class Filters extends Component {
  render() {
    const { filter } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.filters}>
          <TouchableOpacity style={[styles.filter, filter === "ALL" && styles.selected]} onPress={() => this.props.onFilter("ALL")}>
            <Text style={[styles.filterText, filter ==="ALL" && styles.selectedText]}>ALL</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.filter, styles.filterMiddle, filter === "Sininen" && styles.selected]} onPress={() => this.props.onFilter("Sininen")}>
            <Text style={[styles.filterText, filter ==="Sininen" && styles.selectedText]}>Sininen</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.filter, styles.filterMiddle, filter === "Vihrea" && styles.selected]} onPress={() => this.props.onFilter("Vihrea")}>
            <Text style={[styles.filterText, filter ==="Vihrea" && styles.selectedText]}>Vihrea</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.filter, filter === "Punainen" && styles.selected]} onPress={() => this.props.onFilter("Punainen")}>
            <Text style={[styles.filterText, filter === "Punainen" && styles.selectedText]}>Punainen</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#0F64F7",
    borderWidth: 1,
    borderRadius: 5
  },
  filters: {
    flexDirection: "row",
    padding: 0
  },
  filter: {
    flex: 1,
    paddingVertical: 5,
    alignItems: 'center'
  },
  filterMiddle: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: "#0F64F7"
  },
  filterText: {
    color: '#0F64F7',
    fontSize: 14
  },
  selected: {
    backgroundColor: '#0F64F7',
  },
  selectedText: {
    color: '#fff'
  }
})
export default Filters;