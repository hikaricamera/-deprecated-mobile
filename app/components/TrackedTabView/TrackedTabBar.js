import {Component} from "react";
import * as PropTypes from "prop-types";
import {StatusBar, StyleSheet, Text,
    TouchableOpacity, View, Animated} from "react-native";
import React from "react";
import {navigationStateProps} from "./PropTypesCollection";

class TrackedTabBar extends Component {

    constructor(props) {
        super(props);

        this._statusBar = {
            height: StatusBar.currentHeight,
        };

        this._firstTextTitle = React.createRef();
        this._lastTextTitle = React.createRef();

        this.state = {
            pagerIndex: 0,    // float
            firstTextCenterPos: 0,
            lastTextCenterPos: 0,
        };
    }

    componentDidMount() {
        this._startTrackingPosition();
    }

    componentWillUnmount() {
        this._stopTrackingPosition();
    }

    render() {
        return (
            <View style={[styles.container]}>
                {this._renderStatusBarBase()}
                {this._renderTabBar()}
            </View>
        );
    }

    _startTrackingPosition() {
        const {positionX} = this.props;

        this._positionXListener = positionX.addListener(({value}) => {
            this.setState({pagerIndex : value});
        });
    }

    _stopTrackingPosition() {
        const {positionX} = this.props;
        positionX.removeListener(this._positionXListener);
    }

    _measureTitle(width, height, px, py, isFirst) {
        // find the center position of the first and last tab titles
        const centerPos = px + width / 2;
        if (isFirst) {
            this.setState({firstTextCenterPos: centerPos});
        } else {
            this.setState({lastTextCenterPos: centerPos});
        }
    }

    _renderStatusBarBase() {
        const statusBarBaseStyle = {
            height: this._statusBar.height
        };
        return (
            <View style={[statusBarBaseStyle]}/>
        );
    }

    _renderCircle() {
        // render circle
        const {
            firstTextCenterPos,
            lastTextCenterPos,
            pagerIndex,
        } = this.state;

        const {
            navigationState
        } = this.props;

        const routesLength = navigationState.routes.length;
        const realLeftOffset =
            pagerIndex / (routesLength - 0.99) * (lastTextCenterPos - firstTextCenterPos);

        const circleStyle = {
            left: firstTextCenterPos + realLeftOffset
        };
        return (
            <View style={[styles.circle, circleStyle]}/>
        );
    }

    _renderTabBar() {
        const {navigationState} = this.props;
        const {routes} = navigationState;

        return (
            <View style={[styles.tabBarContainer]}>
                {routes.map((route, index) => {
                    return (
                        <TouchableOpacity style={[styles.tabBar]}>
                            <Text
                                ref={ref => {
                                    if (index === 0) {
                                        this._firstTextTitle = ref;
                                    } else if (index === routes.length - 1) {
                                        this._lastTextTitle = ref;
                                    }
                                }}
                                onLayout={() => {
                                    this._firstTextTitle.measure((fx, fy, width, height, px, py) => {
                                        this._measureTitle(width, height, px, py, true);
                                    });
                                    this._lastTextTitle.measure((fx, fy, width, height, px, py) => {
                                        this._measureTitle(width, height, px, py, false);
                                    });
                                }}
                                style={[styles.tarBarTitle]}
                            >
                                {this.props.routeNameToDisplayText[route.key]}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
                {this._renderCircle()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: 57,
        backgroundColor: 'rgb(3, 132, 48)',
    },
    tabBarContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    tabBar: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    tarBarTitle: {
        color: 'white',
        fontSize: 16,
        paddingBottom: 6,
    },
    circle: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: 'white',
        position: 'absolute',
        top: 23,
        alignSelf: 'center',
    }
});

TrackedTabBar.propTypes = {
    navigationState: navigationStateProps.isRequired,
    routeNameToDisplayText: PropTypes.object.isRequired,

    positionX: PropTypes.instanceOf(Animated.Value).isRequired,
};

export default TrackedTabBar;

