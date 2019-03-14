import React, {PureComponent} from 'react';
import {Animated} from 'react-native';
import * as PropTypes from 'prop-types';


class Shake extends PureComponent {
   constructor(props) {
      super(props);

      this.currentValue = 0;

      this.state = {
         animatedValue: new Animated.Value(this.currentValue),
      };
   }
   componentWillReceiveProps(nextProps, nextContext) {
      const { extraData } = this.props;

      // Perform the shake if our `extraData` prop has been changed and is
      // being changed to a truthy value.
      if (extraData !== nextProps.extraData && !!nextProps.extraData) {
         this.move(nextProps);
      }
   }
   move(props) {
      const { type, onShowFinished, ...rest } = props;
      const { animatedValue } = this.state;
      const toValue = this.currentValue === 0 ? 1 : 0;

      Animated[type](animatedValue, {
         toValue: toValue,
         ...rest,
      }).start(() => {
         this.currentValue = toValue;
         onShowFinished(props);
      });
   };
   render() {
      const { animatedValue } = this.state;
      const { style, children } = this.props;

      const translateX = animatedValue.interpolate({
         inputRange: [0, 0.2, 0.4, 0.6, 0.8, 1],
         outputRange: [0, -10, 10, -10, 10, 0],
      });

      const animatedStyle = {
         transform: [{ translateX }],
      };

      return (
         <Animated.View style={[style, animatedStyle]}>
            {children}
         </Animated.View>
      );
   }
}

Shake.propTypes = {
   delay: PropTypes.number,
   duration: PropTypes.number.isRequired,
   type: PropTypes.string,
   onShowFinished: PropTypes.func,
   extraData: PropTypes.any,
};

Shake.defaultProps = {
   delay: 0,
   type: 'timing',

   onShowFinished: () => {},
};

export default Shake;
