import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  ScrollView,
  Platform
} from 'react-native';

import ModalDropdown from 'react-native-modal-dropdown';
import Layout from '../../constants/Layout';


const DEMO_OPTIONS_2 = [
  'all', 'restaurant', 'hotel', 'activity', 'shop', 'route'
];

class MapDropDown extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  componentWillMount() {
    if (typeof this.props.option === 'undefined') {

    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.cell}>
            <ModalDropdown style={styles.dropdown_2}
                           textStyle={styles.dropdown_2_text}
                           defaultValue={this.capitalizeFirstLetter(this.props.option)}
                           dropdownStyle={styles.dropdown_2_dropdown}
                           options={DEMO_OPTIONS_2}
                           renderRow={this._dropdown_2_renderRow.bind(this)}
                           renderSeparator={(sectionID, rowID) => this._dropdown_2_renderSeparator(sectionID, rowID)}
                           onSelect={(idx, value) => this.props.handleClick(idx, value)}
            />
        </View>
      </View>
    );
  }

  _dropdown_2_renderRow(rowData, rowID, highlighted) {
    return (
      <TouchableHighlight underlayColor='cornflowerblue'>
        <View style={[styles.dropdown_2_row, {backgroundColor: 'white'}]}>
          <Text style={[styles.dropdown_2_row_text, highlighted && {color: 'mediumaquamarine'}]}>
            {this.capitalizeFirstLetter(rowData)}
          </Text>
        </View>
      </TouchableHighlight>
    );
  }

  capitalizeFirstLetter= (rowData) => {
    if (typeof rowData === 'undefined') {
      return 'All'
    } else {
    return rowData.charAt(0).toUpperCase() + rowData.slice(1);
    }
}

  
  _dropdown_2_renderSeparator(sectionID, rowID, adjacentRowHighlighted) {
    if (rowID == DEMO_OPTIONS_2.length - 1) return;
    let key = `spr_${rowID}`;
    return (<View style={styles.dropdown_2_separator}
                  key={key}
    />);
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    bottom: 0,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
  },
  cell: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  textButton: {
    color: 'deepskyblue',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'deepskyblue',
    margin: 2,
  },
  dropdown_2: {
    width: Layout.window.width,
    height: 50,
    alignSelf: 'center',
    bottom: 0,
    borderWidth: 0,
    backgroundColor: '#0F64F7',
  },
  dropdown_2_text: {
    alignSelf: 'stretch',
    height: 50,
    marginTop: (Platform.OS === 'ios') ? 15 : 0,
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  dropdown_2_dropdown: {
    width: Layout.window.width,
    borderWidth: 0,
    shadowColor: "#000000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: {
      height: 1,
      width: 0
    },
    marginBottom: 40,
  },
  dropdown_2_row: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    height: 40,
    alignItems: 'center',
    
  },
  dropdown_2_row_text: {
    width: Layout.window.width * 0.9,
    textAlign: 'center',
    marginHorizontal: 4,
    fontSize: 16,
    color: '#000',
    textAlignVertical: 'center',
  },
  dropdown_2_separator: {
    height: 0,
    backgroundColor: '#dfe2e5',
  },
});

export default MapDropDown;
