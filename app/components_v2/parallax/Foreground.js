import React, {Component} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import * as PropTypes from 'prop-types'

export default class Foreground extends Component {
   render() {
      return (
         <View style={styles.wrapper} pointerEvents="box-none">
            <TouchableOpacity onPress={() => this.props.onPress()}>
               <Text style={styles.header}>{this.props.text}</Text>
            </TouchableOpacity>
         </View>
      );
   }
}

const styles = StyleSheet.create({
   wrapper: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
   },
   header: {
      color: '#fff',
      fontSize: 20,
      backgroundColor: 'transparent',
   },
});

Foreground.propTypes = {
   title: PropTypes.string,
   onPress: PropTypes.func,
};

Foreground.defaultProps = {
   onPress: () => {}
};
