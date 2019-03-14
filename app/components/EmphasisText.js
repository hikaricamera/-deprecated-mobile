import {Component} from "react";
import React from "react";
import {Text} from "react-native";
import * as PropTypes from 'prop-types'
import {chooseNonNullInOrder} from "../utilities/ObjectUtils";

const DEFAULT_FONT_SIZE = 23;
const DEFAULT_FONT_COLOR = 'black';

export default class EmphasisText extends Component {

    constructor(props) {
        super(props);
        this.fontSize = chooseNonNullInOrder([
            this.props.fontSize, DEFAULT_FONT_SIZE
        ]);

        this.fontColor = chooseNonNullInOrder([
            this.props.fontColor, DEFAULT_FONT_COLOR
        ]);
    }

    render(): React.ReactNode {
        return (
            <Text style={{
                fontSize: this.fontSize,
                fontWeight: 'bold',
                color: this.fontColor,
                alignSelf: 'center'
            }}>
                {this.props.children}
            </Text>
        );
    }
}

EmphasisText.propTypes = {
    fontSize: PropTypes.number,
    fontColor: PropTypes.string
};
