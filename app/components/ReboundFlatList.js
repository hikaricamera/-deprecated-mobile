import React, {Component} from "react";
import {FlatList, Platform, UIManager, View, findNodeHandle} from "react-native";
import ReboundScrollViewAndroid from "./ReboundScrollViewAndroid";
import * as PropTypes from 'prop-types'

class ReboundFlatList extends Component {

   scrollTo(x, y, animated = false) {
      UIManager.dispatchViewManagerCommand(
         findNodeHandle(this),
         UIManager.ReboundScrollViewAndroid.Commands.scrollTo,
         [x, y, animated]
      )
   }

   render() {
      const {
         data,
         renderItem,
         onEndReached,
         onScroll,
         showsVerticalScrollIndicator
      } = this.props;

      switch (Platform.OS) {
         case 'android':
            return (
               <ReboundScrollViewAndroid
                  onEndReached={(evt) => onEndReached(evt)}
                  onScroll={(evt) => onScroll(evt)}
                  showsVerticalScrollIndicator={showsVerticalScrollIndicator}
               >
                  <View collapsable={false}>
                     {data.map((item, index) => renderItem({item, index}))}
                  </View>
               </ReboundScrollViewAndroid>
            );
         case 'ios':
            return (
               <FlatList
                  data={data}
                  renderItem={renderItem}
                  {...this.props}
               />
            )
      }
   }
}

ReboundScrollViewAndroid.propTypes = {
   data: PropTypes.arrayOf(PropTypes.object).isRequired,
   renderItem: PropTypes.func.isRequired,
   onEndReached: PropTypes.func,
   onScroll: PropTypes.func,
   showsVerticalScrollIndicator: PropTypes.bool,
};

ReboundScrollViewAndroid.defaultProps = {
   onEndReached: () => {},
   onScroll: () => {},
   showsVerticalScrollIndicator: true,
};

export default ReboundFlatList;
