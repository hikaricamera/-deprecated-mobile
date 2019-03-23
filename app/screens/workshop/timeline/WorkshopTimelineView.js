import React, {Component} from "react";
import {Animated, FlatList, StatusBar, StyleSheet, TouchableHighlight, View} from "react-native";
import * as PropTypes from "prop-types";
import WorkshopDisplayAllPhotoView from "../allphotos/WorkshopDisplayAllPhotoView";
import {RkGalleryImage, RkText} from "react-native-ui-kitten";
import {SCREEN_WDITH} from "../../../configs/themes/Screen";

const TIME_HEADER_HEIGHT = 50;

const NUMBER_OF_IMAGES_PER_ROW = 4;
const IMAGE_MARGIN = 2;

export default class WorkshopTimelineView extends Component {

   constructor(props) {
      super(props);

      let headersPosition = [];
      for (let cnt = 0;cnt < this.props.items.length;cnt ++) {
         headersPosition.push(null);
      }

      this.state = {
         headersPosition: headersPosition,
      };
   }

   _renderPhotos(item) {
      const imageSize =
         (SCREEN_WDITH - IMAGE_MARGIN * NUMBER_OF_IMAGES_PER_ROW * 2) /
         NUMBER_OF_IMAGES_PER_ROW;

      return (
         <FlatList
            numColumns={NUMBER_OF_IMAGES_PER_ROW}
            columnWrapperStyle={{justifyContent: 'flex-start'}}
            renderItem={
               ({item: photo}) => {
                  return (
                     <TouchableHighlight style={{margin: IMAGE_MARGIN}}>
                        <RkGalleryImage style={{width: imageSize, height: imageSize}}
                                        source={{uri: photo.thumbnailBase64}}/>
                     </TouchableHighlight>
                  );
               }
            }
            data={item.photos}
            keyExtractor={(item, index) => index}/>
      );
   }

   _renderHeader(item, index) {

      const {
         items,
         scrollY,
         parallaxHeight,
         headerHeight,
      } = this.props;

      let translateY = null;
      const headerY = this.state.headersPosition[index];

      if (headerY !== null) {
         if (index !== items.length - 1) {
            const nextHeaderY = this.state.headersPosition[index + 1];
            if (nextHeaderY !== null) {
               translateY = scrollY.interpolate({
                  inputRange: [
                     0,
                     parallaxHeight - headerHeight + headerY,
                     parallaxHeight - headerHeight + nextHeaderY - TIME_HEADER_HEIGHT
                  ],
                  outputRange: [0, 0, nextHeaderY - headerY - TIME_HEADER_HEIGHT],
                  extrapolateLeft: 'clamp',
                  extrapolateRight: 'clamp'
               });
            }
         } else {
            translateY = scrollY.interpolate({
               inputRange: [
                  0,
                  parallaxHeight - headerHeight + headerY,
                  parallaxHeight - headerHeight + headerY + 1, // dummy 1
               ],
               outputRange: [0, 0, 1],
               extrapolateLeft: 'clamp',
               extrapolateRight: 'extend'
            });
         }
      }

      let animatedStyle = {
         transform: []
      };

      if (translateY) {
         animatedStyle.transform.push({translateY})
      }

      return (
         <Animated.View style={[animatedStyle, styles.timeHeader]}>
            <RkText rkType='h3' style={{marginLeft: 15, marginTop: 12, marginBottom: 12}}>
               {item.time}
            </RkText>
         </Animated.View>
      );
   }

   _renderHeaderPlaceholder = () => (
      <View style={styles.timeHeaderPlaceholder}/>
   );

   _handleHeaderLayout(layout, index) {
      const {y} = layout;
      let curHeadersHeight = this.state.headersPosition;
      curHeadersHeight[index] = y;
      this.setState({
         headersPosition: curHeadersHeight,
      });
   }

   _renderItem = (item, index) => (
      <View onLayout={(evt) => this._handleHeaderLayout(evt.nativeEvent.layout, index)}>
         {this._renderHeaderPlaceholder()}
         {this._renderPhotos(item)}
         {this._renderHeader(item, index)}
      </View>
   );

   render = () => (
      <Animated.ScrollView style={styles.container}>
         <StatusBar hidden={true}/>
         {this.props.items.map(
            (item, index) => this._renderItem(item, index))}
      </Animated.ScrollView>
   )
}

const styles = StyleSheet.create({
   container: {
      backgroundColor: 'white',
   },

   timeHeaderPlaceholder: {
      height: TIME_HEADER_HEIGHT
   },
   timeHeader: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: TIME_HEADER_HEIGHT,
      backgroundColor: 'white'
   },
});

WorkshopDisplayAllPhotoView.propTypes = {
   items: PropTypes.shape({
      time: PropTypes.string,
      photos: PropTypes.arrayOf(PropTypes.object)
   }).isRequired
};
