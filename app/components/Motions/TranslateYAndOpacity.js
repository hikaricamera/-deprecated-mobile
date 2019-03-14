import React, {PureComponent} from 'react';
import {Animated} from 'react-native';
import * as PropTypes from 'prop-types';

/**
 * Child views must be wrapped by a view component
 * */

class TranslateYAndOpacity extends PureComponent {
   constructor(props) {
      super(props);

      const { opacityMin, translateYMin } = props;

      this.state = {
         opacityValue: new Animated.Value(opacityMin),
         translateYValue: new Animated.Value(translateYMin),
      };
   }
   componentDidMount() {
      const { animateOnMount } = this.props;

      if (animateOnMount) {
         this.show(this.props);
      }
   }
   componentWillReceiveProps(nextProps, nextContext) {
      const { isHidden } = this.props;

      if (!isHidden && nextProps.isHidden) {
         this.hide(nextProps);
      }
      if (isHidden && !nextProps.isHidden) {
         this.show(nextProps);
      }
   }
   show(props) {
      const { opacityValue, translateYValue } = this.state;
      const { onShowFinished, ...rest } = props;

      Animated.parallel([
         Animated.timing(opacityValue, {
            toValue: 1,
            ...rest,
         }),
         Animated.timing(translateYValue, {
            toValue: 0,
            ...rest,
         }),
      ]).start(() => {
         onShowFinished(props);
      });
   }
   hide(props) {
      const { translateYValue, opacityValue } = this.state;
      const { opacityMin, translateYMin, onHideFinished, ...rest } = props;

      Animated.parallel([
         Animated.timing(opacityValue, {
            toValue: opacityMin,
            ...rest,
         }),
         Animated.timing(translateYValue, {
            toValue: translateYMin,
            ...rest,
         }),
      ]).start(() => {
         onHideFinished(props);
      });
   }
   render() {
      const { children, style } = this.props;
      const { opacityValue, translateYValue } = this.state;

      const animatedStyle = {
         opacity: opacityValue,
         transform: [{ translateY: translateYValue }],
      };

      return (
         <Animated.View style={[animatedStyle, style]}>
            {children}
         </Animated.View>
      );
   }
}

TranslateYAndOpacity.propTypes = {
   opacityMin: PropTypes.number,
   translateYMin: PropTypes.number,
   delay: PropTypes.number,
   duration: PropTypes.number,

   onShowFinished: PropTypes.func,
   onHideFinished: PropTypes.func,

   animateOnMount: PropTypes.bool,
   isHidden: PropTypes.bool,
};

TranslateYAndOpacity.defaultProps = {
   opacityMin: 0,
   translateYMin: -4,
   delay: 0,
   duration: 500,

   onShowFinished: () => {},
   onHideFinished: () => {},

   animateOnMount: true,
   isHidden: false,
};

export default TranslateYAndOpacity;
