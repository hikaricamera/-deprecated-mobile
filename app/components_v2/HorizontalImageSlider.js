import React, {Component} from "react";
import {ScrollView, View, Text, Image} from "react-native";
import {RkCard} from "react-native-ui-kitten";
import * as PropTypes from 'prop-types'

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
               <Image source={{uri: elem.uri}}
                      style={this.props.imageStyle}/>
               <View>
                  <Text style={[this.props.textStyle]}>
                     {elem.description}
                  </Text>
               </View>
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
      uri: PropTypes.string.isRequired,
      description: PropTypes.string,
      cardStyle: PropTypes.object,  // extra styles applied to the card
   })).isRequired,

   style: PropTypes.object, // style applied to scroll view
   cardStyle: PropTypes.object, // style applied to each card
   cardRkStyle: PropTypes.string, // rk style applied to each card

   textStyle: PropTypes.object, // style applied to each card description
   imageStyle: PropTypes.object,
};

export default HorizontalImageSlider;
