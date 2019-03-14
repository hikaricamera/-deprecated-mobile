import * as React from "react";
import {Component} from "react";
import {View, ViewPagerAndroid} from "react-native";
import {pagerProps} from "./PropTypesCollection";
import * as PropTypes from 'prop-types'

class PagerAndroid extends Component {


    _handlePageScroll(evt) {
        // position - the current index of view pager (integer)
        // offset - the current index of view pager (float)
        const {offset, position} = evt.nativeEvent;
        const {
            navigationState,
            onIndexChange,
            positionX
        } = this.props;

        positionX.setValue(offset + position);

        if (navigationState.index !== position) {
            const prevIndex = navigationState.index;
            const nextIndex = position;
            onIndexChange(prevIndex, nextIndex);
        }
    }

    render() {
        const {navigationState} = this.props;

        // convert a single children to an array as well
        const children = React.Children.toArray(this.props.children);

        // wrap each screen with a <View>
        // since each view pager must be a <View>
        const screens = children.map(function (child, i) {
            // the order matches between navigationState.routes and children
            const route = navigationState.routes[i];
            return (
                <View style={[styles.page]} key={route.key}>
                    {child}
                </View>
            )
        });

        const initialPage = navigationState.index;

        return (
            <ViewPagerAndroid
                scrollEnabled={true}
                onPageScroll={(e) => this._handlePageScroll(e)}
                initialPage={initialPage}
                style={[styles.container]}>
                {screens}
            </ViewPagerAndroid>
        );
    }
}

const styles = {
    container: {
        flexGrow: 1,
    },

};

PagerAndroid.propTypes = pagerProps & {
    onIndexChange: PropTypes.func.isRequired,
};

export default PagerAndroid;
