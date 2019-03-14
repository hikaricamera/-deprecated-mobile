import React, {Component, lazy} from "react";
import {Animated, StyleSheet, View} from "react-native";
import * as PropTypes from "prop-types";
import PagerDefault from "./PagerDefault";
import {navigationStateProps} from "./PropTypesCollection";
import TrackedTabBar from "./TrackedTabBar";

class TrackedTabView extends Component {

    constructor(props) {
        super(props);

        const {initialNavigationState} = this.props;

        const navigationState = initialNavigationState;

        const layout = {
            ...this.props.initialLayout,
            measured: false,
        };

        // current index in float
        this.positionX = new Animated.Value(0);

        this.state = {
            navigationState,
            layout,
        };
    }

    _getChildScreens() {
        const {navigationState} = this.state;
        const {lazy, navigation} = this.props;

        return navigationState.routes.map((route, index) => {
            const isFocused = navigationState.index === index;

            // will render the screen when either
            //    lazy is set to false or
            //    screen is focused
            if (!lazy || isFocused) {
                // inject navigation && navigationState obj
                return <route.screen
                    navigationState={navigationState}
                    navigation={navigation}/>;
            } else {
                return <View/>;
            }
        });
    }

    _onIndexChange(prevIndex, nextIndex) {
        this.setState({
            navigationState: {
                ...this.state.navigationState,
                index: nextIndex
            }
        });
    }

    _renderTabBar() {
        const {
            renderTabBar,
            routeNameToDisplayText,
        } = this.props;

        const {
            navigationState,
        } = this.state;

        return renderTabBar({
            routeNameToDisplayText: routeNameToDisplayText,
            navigationState: navigationState,
            positionX: this.positionX,
        });
    }

    _renderPager() {
        const {
            renderPager,
        } = this.props;

        const {
            navigationState,
            layout
        } = this.state;

        const children = this._getChildScreens();

        return renderPager({
            children,
            navigationState,
            layout,
            positionX: this.positionX,
            onIndexChange: (prev, next) => this._onIndexChange(prev, next)
        });
    }

    _handleLayout(evt) {
        const {height, width} = evt.nativeEvent.layout;

        if (this.state.layout.height === height
            && this.state.layout.width === width) {
            return;
        }

        this.setState({
            layout: {
                measured: true,
                height,
                width,
            }
        });
    }

    render() {
        const {
            tabBarPosition,
        } = this.props;

        return (
            <View style={[styles.container, this.props.styles]}>
                {tabBarPosition === 'top' && this._renderTabBar()}
                <View onLayout={(e) => this._handleLayout(e)} style={[styles.pager]}>
                    {this._renderPager()}
                </View>
                {tabBarPosition === 'bottom' && this._renderTabBar()}
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        overflow: 'hidden'
    },
    pager: {
        flex: 1,
    }
});

TrackedTabView.propTypes = {
    navigation: PropTypes.object.isRequired,
    initialNavigationState: navigationStateProps.isRequired,

    renderPager: PropTypes.func.isRequired,
    renderTabBar: PropTypes.func.isRequired,
    tabBarPosition: PropTypes.oneOf(['top', 'bottom']).isRequired,
    initialLayout: PropTypes.shape({
        width: PropTypes.number.isRequired,
        height: PropTypes.number.isRequired,
    }),
    styles: PropTypes.object,

    // draw config
    routeNameToDisplayText: PropTypes.object.isRequired,
    lazy: PropTypes.bool,
};

TrackedTabView.defaultProps = {
    renderPager: (props) => <PagerDefault {...props}/>,
    renderTabBar: (props) => <TrackedTabBar {...props}/>,

    tabBarPosition: 'top',
    initialLayout: {
        width: 0,
        height: 0,
    },

    lazy: false,
};

export default TrackedTabView;
