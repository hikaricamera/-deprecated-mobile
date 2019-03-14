import React, {Component, ReactNode} from "react";
import {View} from "react-native";


export default class Card extends Component {
    render(): ReactNode {
        return (
            <View style={styles.ctr1}>
                {this.props.children}
            </View>
        );
    }
}

const styles = {
    ctr1: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white'
    }
};
