import React, {Component, ReactNode} from "react";
import {StyleSheet, Text} from "react-native";
import *as PropTypes from 'prop-types'

export default class InfoText extends Component {
    render(): ReactNode {
        return (
            <Text style={styles.container}>
                {this.props.text}
            </Text>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        fontSize: 14,
        marginTop: 12,
        marginBottom: 3,
        marginLeft: 13,
        color: 'rgba(40, 40, 40, 0.7)',
    }
});

InfoText.propTypes = {
    text: PropTypes.string.isRequired
};
