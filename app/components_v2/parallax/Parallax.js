import {RkComponent} from "react-native-ui-kitten";
import React from "react";
import {Animated, View} from "react-native";
import * as PropTypes from "prop-types"
import Background from "./Background";
import Foreground from "./Foreground";

/**
 * A component supporting parallax effect
 * Note that:
 *    1. The parallax height includes the height of navigation header
 * */


export default class Parallax extends RkComponent {

   static Background = Background;
   static Foreground = Foreground;

   scrollY = new Animated.Value(0);

   constructor(props) {
      super(props);
      this._onAnimatedScroll = Animated.event(
         [{ nativeEvent: { contentOffset: { y: this.scrollY } } }],
         { useNativeDriver: true }
      );
   }

   _renderParallaxForeground() {
      const {
         parallaxWidth,
         parallaxHeight,
         renderParallaxForeground,
         parallaxForegroundScrollSpeed
      } = this.props;

      const translateY = this.scrollY.interpolate({
         inputRange: [0, parallaxHeight],
         outputRange: [0, -(parallaxHeight / parallaxForegroundScrollSpeed)],
         extrapolateRight: 'extend',
         extrapolateLeft: 'clamp'
      });

      const opacity = this.scrollY.interpolate({
         inputRange: [0, parallaxHeight],
         outputRange: [1, 0],
         extrapolateRight: 'clamp',
         extrapolateLeft: 'clamp'
      });

      const wrapperStyle = {
         position: 'absolute',
         top: 0,
         width: parallaxWidth,
         height: parallaxHeight,
         zIndex: 1
      };

      return (
         <View style={wrapperStyle} pointerEvents="box-none">
            <Animated.View
               style={{
                  position: 'absolute',
                  parallaxWidth,
                  parallaxHeight,
                  opacity,
                  transform: [{ translateY }]
               }}
               pointerEvents="box-none">
               {renderParallaxForeground({ scrollY: this.scrollY })}
            </Animated.View>
         </View>
      );
   }

   _renderParallaxBackground() {
      const {
         parallaxWidth,
         parallaxHeight,
         renderParallaxBackground,
         backgroundScale,
         parallaxBackgroundScrollSpeed,
      } = this.props;

      const translateY = this.scrollY.interpolate({
         inputRange: [0, parallaxHeight],
         outputRange: [0, -(parallaxHeight / parallaxBackgroundScrollSpeed)],
         extrapolateLeft: 'extend',
         extrapolateRight: 'extend'
      });

      const scale = this.scrollY.interpolate({
         inputRange: [-parallaxHeight, 0],
         outputRange: [backgroundScale, 1],
         extrapolateLeft: 'extend',
         extrapolateRight: 'clamp'
      });

      const opacity = this.scrollY.interpolate({
         inputRange: [0, parallaxHeight],
         outputRange: [1, 0],
         extrapolate: 'clamp'
      });

      return (
         <Animated.View
            style={{
               position: 'absolute',
               width: parallaxWidth,
               height: parallaxHeight,
               opacity,
               transform: [{ translateY }, { scale }]
            }}
            pointerEvents="box-none">
            {renderParallaxBackground({ scrollY: this.scrollY })}
         </Animated.View>
      );
   }

   _renderBackgroundPlaceholder = () => (
      <View style={{ height: this.props.parallaxHeight}}/>
   );

   render() {
      const props = {
         scrollY: this.scrollY,
         parallaxHeight: this.props.parallaxHeight,
         headerHeight: this.props.headerHeight,
      };

      return (
         <View style={[this.props.style]}>
            {this._renderParallaxBackground()}
            <Animated.ScrollView onScroll={this._onAnimatedScroll}>
               {this._renderParallaxForeground()}
               {this._renderBackgroundPlaceholder()}
               {this.props.renderChildren(props)}
            </Animated.ScrollView>
            {this.props.renderFixedHeader()}
         </View>
      );
   }
}

Parallax.propTypes = {
   headerHeight: PropTypes.number,
   parallaxHeight: PropTypes.number,
   parallaxWidth: PropTypes.number,

   renderParallaxBackground: PropTypes.func,
   renderParallaxForeground: PropTypes.func,
   renderFixedHeader: PropTypes.func,
   renderChildren: PropTypes.func,

   backgroundScale: PropTypes.number,
   parallaxForegroundScrollSpeed: PropTypes.number,
   parallaxBackgroundScrollSpeed: PropTypes.number,

   style: PropTypes.object,  // applied to the top container

};

Parallax.defaultProps = {
   renderParallaxBackground: () => {},
   renderParallaxForeground: () => {},
   renderFixedHeader: () => {},
   renderChildren: () => {},

   backgroundScale: 3,
   parallaxForegroundScrollSpeed: 2,
   parallaxBackgroundScrollSpeed: 2,
};
