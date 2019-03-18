import React, {Component} from "react";
import {Image, ScrollView, Text, View} from "react-native";
import {RkCard, RkText} from "react-native-ui-kitten";
import * as PropTypes from 'prop-types'

// TODO:
//  Add modal Info text

class HorizontalImageSlider extends Component {

   constructor(props) {
      super(props);

      let backgroundColor = null;
      if ('backgroundColor' in this.props.style) {
         backgroundColor = this.props.style.backgroundColor;
      }

      this.state = {
         backgroundColor: backgroundColor
      };
   }

   _renderDescription = (elem) => (
      <RkText rkType='secondary7' style={[this.props.textStyle]}>
         {elem.description}
      </RkText>
   );

   _renderCard = (elem, index) => {
      let cardStyle = {
         backgroundColor: this.state.backgroundColor
      };

      if (elem.cardStyle) {
         cardStyle = {
            ...cardStyle,
            ...elem.cardStyle,
         }
      }

      return (
         <RkCard
            key={index}
            rkStyle={this.props.cardRkStyle}
            style={[this.props.cardStyle, cardStyle]}>
            <View rkCardContent style={[styles.container]}>
               <Image source={{uri: elem.uri}} style={this.props.imageStyle}/>
               {!!elem.description && this._renderDescription(elem)}
            </View>
         </RkCard>
      );
   };

   _renderCards = () => (
      this.props.data.map((elem, index) => (
         this._renderCard(elem, index)
      ))
   );

   render = () => (
      <ScrollView
         style={[this.props.style]}
         horizontal={true}
         showsHorizontalScrollIndicator={false}>
         {this._renderCards()}
      </ScrollView>
   );
}

const styles = {
   container: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
   }
};

HorizontalImageSlider.propTypes = {
   data: PropTypes.arrayOf(PropTypes.shape({
      uri: PropTypes.string,
      description: PropTypes.string,
      onSelected: PropTypes.func,
      cardStyle: PropTypes.object,  // extra styles applied to the card
   })).isRequired,

   style: PropTypes.object, // style applied to scroll view
   cardStyle: PropTypes.object, // style applied to each card
   cardRkStyle: PropTypes.string, // rk style applied to each card
   imageStyle: PropTypes.object,  // style applied to each card image
   textStyle: PropTypes.object, // style applied to each card description
};

export default HorizontalImageSlider;
