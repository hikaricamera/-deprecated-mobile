import React, {Component} from "react";
import * as PropTypes from "prop-types"
import {RkGallery} from "react-native-ui-kitten";
import {StatusBar, View, StyleSheet} from "react-native";

export default class WorkshopDisplayAllPhotoView extends Component {

   constructor(props) {
      super(props);

      this._galleryItems = [];
      this.props.items.forEach((item) => {
         this._galleryItems.push({uri: item.thumbnailBase64});
      })
   }

   render() {
      const containerStyle = {
         minHeight: this.props.galleryMinHeight
      };

      return (
         <View style={styles.container}>
            <StatusBar hidden={true}/>
            <RkGallery items={this._galleryItems} spanCount={4}/>
         </View>
      );
   }

}

const styles = StyleSheet.create({
   container: {
      backgroundColor: '#FFFFFF',
      borderColor: '#111111',
   }
});

WorkshopDisplayAllPhotoView.propTypes = {
   items: PropTypes.arrayOf(PropTypes.shape({
      thumbnailBase64: PropTypes.string.isRequired,
   })).isRequired,

   galleryMinHeight: PropTypes.number.isRequired,
};

WorkshopDisplayAllPhotoView.defaultProps = {
   galleryMinHeight: 0,
};
