import React, {Component, ReactNode} from "react";
import {Image, Switch, Text, TouchableOpacity, View} from "react-native";
import * as PropTypes from 'prop-types'
import {ICONS} from "../../assets/Path";

export default class CardItem extends Component {

    constructor(props) {
        super(props);

        // only show either chevron or switch
        if (this.props.showChevron && this.props.showSwitch) {
            this.props.showSwitch = false;
        }

        this.state = {
            switchToggled: false
        };
    }

    render(): ReactNode {
        return (
            <TouchableOpacity style={styles.ctr1}>
                <View style={styles.ctr2}>
                    <View style={styles.ctr3}>
                        <Image
                            source={{uri: `${this.props.icon}`}}
                            style={styles.icon}/>
                        <Text style={styles.text}>{this.props.title}</Text>
                        <Text style={styles.subtitle}>{this.props.subtitle}</Text>
                    </View>
                    {
                        this.props.showChevron &&
                            <TouchableOpacity
                                onPress={this.props.onPressChevron}
                                style={styles.chevronCtr}>
                                <Image
                                    source={{uri: `${ICONS.CHEVRON_ICON}`}}
                                    style={styles.chevron}/>
                            </TouchableOpacity>
                    }
                    {
                        this.props.showSwitch &&
                            <Switch
                                trackColor='red'
                                value={this.state.switchToggled}
                                onValueChange={(value) => {
                                    this.setState({switchToggled: value});
                                    this.prosp.onToggleSwitch();
                                }}/>
                    }
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = {
    ctr1: {
        flex: 1,
        height: 45,
        borderBottomWidth: 1,
        borderColor: 'rgba(230, 230, 230, 0.6)',
    },

    ctr2: {
        flex: 1,
        flexDirection:'row',
        justifyContent: 'space-between'
    },

    ctr3: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },

    icon: {
        width: 24,
        height: 20,
        marginRight: 10,
        marginLeft: 10,
        resizeMode: 'contain'
    },

    text: {
        fontSize: 14,
        color: 'black'
    },

    subtitle: {
        marginLeft: 20,
        fontSize: 13,
        color: 'rgba(70, 70, 70, 0.3)'
    },

    chevronCtr: {
        alignSelf: 'center',
        marginRight: 14,
    },

    chevron: {
        width: 24,
        height: 24,
        opacity: 0.2,
    }
};

CardItem.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
    showChevron: PropTypes.bool,
    showSwitch: PropTypes.bool,
    onToggleSwitch: PropTypes.func,
    onPressChevron: PropTypes.func,
};

CardItem.defaultProps = {
    showChevron: false,
    showSwitch: false,
    onToggleSwitch: () => {},
    onPressChevron: () => {},
};
