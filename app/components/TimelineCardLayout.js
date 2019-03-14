import React, {Component} from "react";
import * as PropTypes from "prop-types";
import {Image, Text, View, Animated} from "react-native";
import {chooseNonNullInOrder} from "../utilities/ObjectUtils";
import Separator from "./Separator";
import ReboundFlatList from "./ReboundFlatList";
import {SCREEN_WDITH} from "../utilities/ScreenUtils";

const DEFAULT_TITLE_COLOR = 'black';
const DEFAULT_TITLE_SIZE = 15;

const DEFAULT_CIRCLE_SIZE = 12;
const DEFAULT_CIRCLE_COLOR = '#007AFF';
const DEFAULT_CIRCLE_TOP = 0;

const DEFAULT_LINE_WIDTH = 1;
const DEFAULT_LINE_COLOR = 'rgba(170, 170, 170, 0.8)';

const DEFAULT_DOT_COLOR = 'white';

const DEFAULT_OVERLAYING_COLOR = 'white';

const DEFAULT_STICKY_HEADER_MARGIN_TOP = 10;

class TimelineCardLayout extends Component {

   constructor(props) {
      super(props);

      // initialize this.dataSource
      this.dataSource = this.convertRowDataToFlatListDataSource();
      this.dataFlatListRef = React.createRef();

      // top / bottom position of each row
      this.bottomPoitions = new Array(this.dataSource.length);
      this.topPositions = new Array(this.dataSource.length);

      this.headerAnimatedTop = new Animated.Value(0);

      this.state = {
         // the left of each card (used to align the circle with the border line of each card)
         cardX: 0,

         stickyHeaderHeight: 0, // height of sticky header is a fixed number
         scrolledRowIndex: 0, // row index currently located at
         stickyHeaderRowIndex: 0, // index of row data sticky header uses
         enableHeaderAnim: false,
      };
   }

   convertRowDataToFlatListDataSource() {
      const dataSource = [];
      if (this.props.rowsData.length === 0) {
         return dataSource;
      }
      for (let i = 0; i < this.props.rowsData.length; i++) {
         dataSource.push({
            key: `item-${i}`,
            ...this.props.rowsData[i],
         });
      }
      return dataSource;
   }

   measureRow(evt, rowIndex) {
      const {y, height} = evt.nativeEvent.layout;
      const bottom = y + height;
      this.topPositions[rowIndex] = y;
      this.bottomPoitions[rowIndex] = bottom;
   }

   renderSeparator(rowIndex) {
      if (this.hideSeparator || rowIndex === this.dataSource.length - 1) {
         return null;
      }
      return <Separator type='line'/>
   }

   renderTime(rowData) {
      const circleTop = chooseNonNullInOrder([
         rowData.circleTop, this.props.circleTop, DEFAULT_CIRCLE_TOP
      ]);
      const circleSize = chooseNonNullInOrder([
         rowData.circleSize, this.props.circleSize, DEFAULT_CIRCLE_SIZE
      ]);
      const timeFontSize = styles.time.fontSize;
      let timeTop = 0;
      if (timeFontSize > circleSize) {
         timeTop = circleTop - (timeFontSize - circleSize) / 2 - 2;
      } else {
         timeTop = circleTop + (circleSize - timeFontSize) / 2 - 2;
      }

      const timeWrapper = {
         alignItems: 'flex-end',
         top: timeTop,
      };
      return (
         <View style={timeWrapper}>
            <View style={[styles.timeContainer]}>
               <Text style={[styles.time]}>{rowData.time}</Text>
            </View>
         </View>
      )
   }

   renderTitle(rowData) {
      const titleColor = chooseNonNullInOrder([
         rowData.titleColor, this.props.titleColor, DEFAULT_TITLE_COLOR
      ]);

      const titleSize = chooseNonNullInOrder([
         rowData.titleSize, this.props.titleSize, DEFAULT_TITLE_SIZE
      ]);

      const titleStyle = {
         color: titleColor,
         fontSize: titleSize,
      };

      return (
         <Text style={[styles.title, titleStyle]}>
            {rowData.title}
         </Text>
      );
   }

   renderCard(rowData, rowIndex) {
      const {
         cardX,
      } = this.state;

      const lineWidth = chooseNonNullInOrder([
         rowData.lineWidth, this.props.lineWidth, DEFAULT_LINE_WIDTH
      ]);

      const lineColor = chooseNonNullInOrder([
         rowData.lineColor, this.props.lineColor, DEFAULT_LINE_COLOR
      ]);

      const cardContainerStyle = {
         borderColor: lineColor,
         borderLeftWidth: lineWidth,
         borderRightWidth: 0,
         marginLeft: 15,
         paddingLeft: 15,
      };

      return (
         <View
            style={[styles.cardContainer, cardContainerStyle]}
            onLayout={evt => {
               if (!cardX) {
                  const {x} = evt.nativeEvent.layout;
                  this.setState({
                     cardX: x
                  });
               }
            }}>
            {this.renderTitle(rowData, rowIndex)}
            <View style={[styles.card]}>
               {rowData.card}
            </View>
            {this.renderSeparator(rowIndex)}
         </View>
      )
   }

   renderCircle(rowData) {
      const circleSize = chooseNonNullInOrder([
         rowData.circleSize, this.props.circleSize, DEFAULT_CIRCLE_SIZE
      ]);
      const circleColor = chooseNonNullInOrder([
         rowData.circleColor, this.props.circleColor, DEFAULT_CIRCLE_COLOR
      ]);
      const circleTop = chooseNonNullInOrder([
         rowData.circleTop, this.props.circleTop, DEFAULT_CIRCLE_TOP
      ]);
      const lineWidth = chooseNonNullInOrder([
         this.props.lineWidth, DEFAULT_LINE_WIDTH
      ]);

      const circleStyle = {
         width: circleSize,
         height: circleSize,
         borderRadius: circleSize / 2,
         backgroundColor: circleColor,
         left: this.state.cardX - circleSize / 2 + (lineWidth - 1) / 2,
         top: circleTop
      };

      let innerCircle = null;
      switch (this.props.innerCircle) {
         case 'icon':
            const iconSource = chooseNonNullInOrder([
               rowData.innerCircleIconUri, this.props.innerCircleIconUri
            ]);
            const iconStyle = {
               height: circleSize,
               width: circleSize,
            };
            innerCircle = (
               <Image
                  source={{uri: iconSource}}
                  style={iconStyle}
               />
            );
            break;
         case 'dot':
            const dotStyle = {
               height: circleSize / 2,
               width: circleSize / 2,
               borderRadius: circleSize / 4,
               backgroundColor: chooseNonNullInOrder([
                  rowData.innerCircleDotColor, this.props.innerCircleDotColor,
                  rowData.parentBackgroundColor, DEFAULT_DOT_COLOR
               ])
            };
            innerCircle = <View style={[dotStyle]}/>;
            break;
         default:
            break;
      }

      return (
         <View style={[styles.circle, circleStyle]}>
            {innerCircle}
         </View>
      );
   }

   hideLineAboveFirstCircle(rowData, index) {
      if (index !== 0) {
         return null;
      }
      const circleTop = chooseNonNullInOrder([
         rowData.circleTop, this.props.circleTop, DEFAULT_CIRCLE_TOP
      ]);
      const lineWidth = chooseNonNullInOrder([
         rowData.lineWidth, this.props.lineWidth, DEFAULT_LINE_WIDTH
      ]);
      const overlayingColor = chooseNonNullInOrder([
         this.props.parentBackgroundColor, DEFAULT_OVERLAYING_COLOR,
      ]);

      // no need to hide the line because circle is at the top
      if (circleTop === DEFAULT_CIRCLE_TOP) {
         return null;
      }
      const overlayStyle = {
         width: lineWidth,
         height: circleTop,
         left: this.state.cardX,
         backgroundColor: overlayingColor,
      };

      return <View style={[styles.overlayContainer, overlayStyle]}/>;
   }

   renderStickyHeader() {
      const {
         stickyHeaderRowIndex,
      } = this.state;

      const {
         parentBackgroundColor
      } = this.props;

      const rowData = this.dataSource[stickyHeaderRowIndex];

      const lineWidth = chooseNonNullInOrder([
         rowData.lineWidth, this.props.lineWidth, DEFAULT_LINE_WIDTH
      ]);

      const lineColor = chooseNonNullInOrder([
         rowData.lineColor, this.props.lineColor, DEFAULT_LINE_COLOR
      ]);

      const cardContainerStyle = {
         borderColor: lineColor,
         borderLeftWidth: lineWidth,
         borderRightWidth: 0,
         marginLeft: 15,
         paddingLeft: 15,
      };

      const stickyHeaderStyle = {
         backgroundColor: parentBackgroundColor,
         top: this.headerAnimatedTop,
         marginTop: DEFAULT_STICKY_HEADER_MARGIN_TOP,
      };

      return (
         <View style={[styles.stickyHeaderContainer]}>
            <Animated.View
               style={[stickyHeaderStyle, styles.stickyHeader]}
               onLayout={(evt) => {
                  if (!this.state.stickyHeaderHeight) {
                     const {height} = evt.nativeEvent.layout;
                     this.setState({stickyHeaderHeight: height});
                  }
               }}>
               {this.renderTime(rowData)}
               <View style={[styles.cardContainer, cardContainerStyle]}>
                  {this.renderTitle(rowData)}
               </View>
               {this.renderCircle(rowData)}
               {this.hideLineAboveFirstCircle(rowData, 0)}
            </Animated.View>
         </View>
      );
   }

   renderRow(rowData, rowIndex) {
      const {
         parentBackgroundColor
      } = this.props;

      let rowContainerStyle = {
         backgroundColor: parentBackgroundColor
      };

      // reserve some space at the last row
      if (this.dataSource.length - 1 === rowIndex) {
         rowContainerStyle = {
            marginBottom: 10,
         }
      }
      return (
         <View
            style={[styles.rowContainer, rowContainerStyle]}
            onLayout={(e) => {this.measureRow(e, rowIndex);}}>
            {this.renderTime(rowData)}
            {this.renderCard(rowData, rowIndex)}
            {this.renderCircle(rowData)}
            {this.hideLineAboveFirstCircle(rowData, rowIndex)}
         </View>
      );
   }

   handleScrollEvent(evt) {
      const {y} = evt.nativeEvent.contentOffset;
      const {velocity} = evt.nativeEvent;
      const {
         scrolledRowIndex,
         stickyHeaderHeight,
         enableHeaderAnim,
      } = this.state;

      // bottom position of sticky header relative to the scroll view
      const headerBottomY = y + this.state.stickyHeaderHeight;
      const rowNum = this.dataSource.length;

      const scrollDown = velocity.y > 0;
      const scrollUp = velocity.y < 0;

      /*
       * State Machine:
       * E: No header animation
       * A: Header animation is enabled when scrolling down
       * C: Header animation is enabled when scrolling up
       * */

      // header transition
      if (scrolledRowIndex < rowNum - 1
         && headerBottomY >= this.bottomPoitions[scrolledRowIndex]) {

         if (y < this.topPositions[scrolledRowIndex + 1]) {
            /*
            * Transition occurs when scrolling to the end of a row
            * Transition: E -> A
            * */

            // prevent keeping updating state
            if (enableHeaderAnim === false) {
               this.setState({enableHeaderAnim: true});
               this.headerAnimatedTop.setValue(0);
            }
            this.headerAnimatedTop.setValue(
               this.bottomPoitions[scrolledRowIndex] - y - stickyHeaderHeight
            );

         } else {
            /*
             * Transition occurs when the top of sticky header bar
             * reaches the top of the next row
             * Transition: A -> E
             * */
            this.setState({
               scrolledRowIndex: scrolledRowIndex + 1,
               stickyHeaderRowIndex: scrolledRowIndex + 1,
               enableHeaderAnim: false
            });
            this.headerAnimatedTop.setValue(0);
         }

      } else if (scrolledRowIndex > 0
         && scrollUp
         && headerBottomY < this.topPositions[scrolledRowIndex] + stickyHeaderHeight) {

         const prevRowBottomY = this.bottomPoitions[scrolledRowIndex - 1];

         if (headerBottomY > prevRowBottomY) {
            /*
             * Transition occurs when the sticky header just scrolls over
             * the bottom of the previous row (equals the top of the current row)
             * Transition: E -> C
             * */

            // prevent keeping updating state
            if (enableHeaderAnim === false) {
               this.setState({
                  stickyHeaderRowIndex: scrolledRowIndex - 1,
                  enableHeaderAnim: true
               });
               this.headerAnimatedTop.setValue(-stickyHeaderHeight);
            }
            this.headerAnimatedTop.setValue(
               this.topPositions[scrolledRowIndex] - y - stickyHeaderHeight
            );

         } else {
            /*
             * Transition occurs when the header of previous row occurs
             * Transition: C -> E
             * */
            this.setState({
               scrolledRowIndex: scrolledRowIndex - 1,
               stickyHeaderRowIndex: scrolledRowIndex - 1,
               enableHeaderAnim: false,
            });
            this.headerAnimatedTop.setValue(0);
         }

      } else {

         /*
          * There are two special cases:
          * 1. user scroll up in state A
          * 2. user scroll down in state C
          *
          * In both cases, when the sticky header returns within
          * the current scrolled row, the animation should be disabled
          *
          * */

         if (enableHeaderAnim) {

            if (scrollDown) {

               this.headerAnimatedTop.setValue(
                  this.bottomPoitions[scrolledRowIndex] - y - stickyHeaderHeight
               );

            } else if (scrollUp) {

               this.headerAnimatedTop.setValue(
                  this.topPositions[scrolledRowIndex] - y - stickyHeaderHeight
               );

            }

            if (
               (scrollUp && headerBottomY <= this.bottomPoitions[scrolledRowIndex]) ||
               (scrollDown && headerBottomY <= this.topPositions[scrolledRowIndex] + stickyHeaderHeight)
            ) {
               // when the animation is enabled, it means the sticky header
               // must exceed either the top of the bottom of the current row

               this.setState({
                  stickyHeaderRowIndex: scrolledRowIndex,
                  enableHeaderAnim: false,
               });
               this.headerAnimatedTop.setValue(0);
            }
         }
      }

   }

   render() {
      const {
         cardX,
      } = this.state;

      const {
         onEndReached,
         showStickyHeader
      } = this.props;

      return (
         <View style={styles.container}>
            <ReboundFlatList
               ref={(ref) => this.dataFlatListRef = ref}
               data={this.dataSource}
               renderItem={({item, index}) => this.renderRow(item, index)}
               extraData={[cardX]}
               onEndReached={() => onEndReached()}
               onScroll={(evt) => this.handleScrollEvent(evt)}
               showsVerticalScrollIndicator={false}
            />
            {showStickyHeader && this.renderStickyHeader()}
         </View>
      );
   }
}

const styles = {
   container: {
      paddingTop: 10,
      marginTop: 1,
   },

   stickyHeaderContainer: {
      position: 'absolute',
      left: 0,
      top: 0,
      minWidth: SCREEN_WDITH,

   },
   stickyHeader: {
      flexDirection: 'row',
      justifyContent: 'center',
   },

   rowContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
   },

   timeContainer: {
      minWidth: 40,
   },
   time: {
      textAlign: 'right',
      color: 'rgba(100, 100, 100, 0.7)',
      fontSize: 12,
   },

   title: {
      marginBottom: 10,
   },
   circle: {
      position: 'absolute',
      alignItems: 'center',
      justifyContent: 'center',
   },

   cardContainer: {
      flexDirection: 'column',
      flex: 1,
   },
   card: {
      //justifyContent: 'center',
   },

   overlayContainer: {
      position: 'absolute',
   }
};

TimelineCardLayout.propTypes = {
   rowsData: PropTypes.arrayOf(PropTypes.shape({
      card: PropTypes.node.isRequired,
      time: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,

      // override the parent styles
      circleSize: PropTypes.number,
      circleColor: PropTypes.string,
      circleTop: PropTypes.number,

      lineWidth: PropTypes.number,
      lineColor: PropTypes.string,

      innerCircle: PropTypes.oneOf(['none', 'icon', 'dot']),
      innerCircleIconUri: PropTypes.string,
      innerCircleDotColor: PropTypes.string,
   })),

   titleSize: PropTypes.number,
   titleColor: PropTypes.string,

   circleSize: PropTypes.number,
   circleColor: PropTypes.string,
   circleTop: PropTypes.number,

   lineWidth: PropTypes.number,
   lineColor: PropTypes.string,

   innerCircle: PropTypes.oneOf(['none', 'icon', 'dot']),
   innerCircleIconUri: PropTypes.string,
   innerCircleDotColor: PropTypes.string,

   parentBackgroundColor: PropTypes.string, // for overlaying

   hideSeparator: PropTypes.bool,
   onEndReached: PropTypes.func,
   showStickyHeader: PropTypes.bool,
};

TimelineCardLayout.defaultProps = {
   hideSeparator: false,
   onEndReached: () => {},
   showStickyHeader: true,
};

export default TimelineCardLayout;
