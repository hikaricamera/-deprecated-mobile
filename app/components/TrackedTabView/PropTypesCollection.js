import {Animated} from "react-native"
import * as PropTypes from "prop-types";

export const navigationStateProps = PropTypes.shape({

    routes: PropTypes.arrayOf(
        PropTypes.shape({
            key: PropTypes.string.isRequired,
            screen: PropTypes.func.isRequired, // component class
        }).isRequired
    ).isRequired,

    index: PropTypes.number.isRequired,
});

export const childrenProps = PropTypes.oneOf([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
]);

export const pagerProps = {
    navigationState: navigationStateProps.isRequired,
    childrenProps: childrenProps.isRequired,

    positionX: PropTypes.instanceOf(Animated.Value).isRequired,
    layout: PropTypes.shape({
        width: PropTypes.number.isRequired,
        height: PropTypes.number.isRequired,
    }).isRequired
};
