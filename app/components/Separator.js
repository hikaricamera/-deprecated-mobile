import React, {Component} from "react";
import * as PropTypes from 'prop-types'
import {View} from "react-native";

class Separator extends Component {

    render() {
        const opStyle = {
            width: this.props.width,
            height: this.props.height,
        };
        return (
            <View style={[styles.separator, opStyle]}/>
        );
    }
}

const styles = {
    separator: {
        height: 1,
        backgroundColor: "#aaa",
        marginTop: 10,
        marginBottom: 10,
    }
};

Separator.propType = {
    type: PropTypes.oneOf(['line']),

    width: PropTypes.number,
    height: PropTypes.number,
};

Separator.defaultProps = {
    width: null,
    height: null,
};

export default Separator;

