import React, {PureComponent} from "react";
import {Animated} from "react-native";
import * as PropTypes from "prop-types";

class TranslateX extends PureComponent {
   constructor(props) {
      super(props);

      const { isHidden, translateXMin } = props;

      this.state = {
         translateXValue: new Animated.Value(
            isHidden ? 0 : translateXMin
         ),
      };
   }
   componentDidMount() {
      const { isHidden, animateOnMount } = this.props;

      if (animateOnMount) {
         if (isHidden) {
            this.hide(this.props);
         } else {
            this.show(this.props);
         }
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
      const { translateXValue } = this.state;
      const { onShowFinished, ...rest } = props;

      Animated.timing(translateXValue, {
         toValue: 0,
         ...rest,
      }).start(() => {
         if (onShowFinished) {
            onShowFinished(props);
         }
      });
   }
   hide(props) {
      const { translateXValue } = this.state;
      const { translateXMin, onHideFinished, ...rest } = props;

      Animated.timing(translateXValue, {
         toValue: translateXMin,
         ...rest,
      }).start(() => {
         onHideFinished(props);
      });
   }
   render() {
      const { children, style } = this.props;
      const { translateXValue } = this.state;

      const animatedStyle = {
         transform: [{ translateX: translateXValue }],
      };

      return (
         <Animated.View style={[animatedStyle, style]}>
            {children}
         </Animated.View>
      );
   }
}


TranslateX.propTypes = {
   translateXMin: PropTypes.number,
   delay: PropTypes.number,
   duration: PropTypes.number,

   onShowFinished: PropTypes.func,
   onHideFinished: PropTypes.func,

   animateOnMount: PropTypes.bool,
   isHidden: PropTypes.bool,
};

TranslateX.defaultProps = {
   translateXMin: -4,
   delay: 0,
   duration: 500,

   onShowFinished: () => {},
   onHideFinished: () => {},

   animateOnMount: true,
   isHidden: false,
};

export default TranslateX;
