import React, {PureComponent} from 'react';
import {Animated, InteractionManager} from 'react-native';
import * as PropTypes from 'prop-types';

class Scale extends PureComponent {
   constructor(props) {
      super(props);

      const { initValue } = props;

      this.state = {
         scaleValue: new Animated.Value(initValue),
      };
   }

   componentDidMount() {
      const { animateOnMount } = this.props;

      if (animateOnMount) {
         InteractionManager.runAfterInteractions().then(() => {
            this.move(this.props);
         })
      }
   }
   componentWillReceiveProps(nextProps, nextContext) {
      const { value } = this.props;

      if (value !== nextProps.value) {
         InteractionManager.runAfterInteractions().then(() => {
            this.move(nextProps);
         })
      }
   }
   move(props) {
      const { value, type, onShowFinish, ...rest } = props;
      const { scaleValue } = this.state;

      Animated[type](scaleValue, {
         toValue: value,
         ...rest,
      }).start(() => {
         onShowFinish(props);
      });
   };
   render() {
      const { style, children } = this.props;
      const { scaleValue } = this.state;

      const animatedStyle = {
         transform: [{ scale: scaleValue }],
      };

      return (
         <Animated.View style={[style, animatedStyle]}>
            {children}
         </Animated.View>
      );
   }
}

Scale.propTypes = {
   value: PropTypes.number.isRequired,
   initValue: PropTypes.number,

   duration: PropTypes.number.isRequired,
   delay: PropTypes.number,

   type: PropTypes.string,
   animateOnMount: PropTypes.bool,
   onShowFinish: PropTypes.func,
};

Scale.defaultProps = {
   initValue: 0.01,
   delay: 0,
   type: 'timing',
   animateOnMount: true,
   onShowFinish: () => {},
};

export default Scale;
