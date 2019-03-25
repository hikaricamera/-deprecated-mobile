import React, {Component} from "react";
import {StyleSheet} from "react-native";
import * as PhotoUtils from "../../utilities/PhotoUtils";
import WorkshopPendingView from "./WorkshopPendingView";
import {DebouncedButton, NavBar} from "../../components_v2/core";
import {FontAwesomeIcons} from "../../../assets/Icons";
import {SCREEN_HEIGHT, SCREEN_WDITH} from "../../configs/themes/Screen";
import WorkshopTimelineView from "./timeline/WorkshopTimelineView";
import {BLUE_LOGO_BGIMAGE} from "../../../assets/Path";
import {Parallax} from "../../components_v2/parallax";
import {DropdownMenuButton} from "../../components_v2/simple-dropdown-menu";
import WorkshopDisplayAllPhotoView from "./allphotos/WorkshopDisplayAllPhotoView";

const NAV_BAR_HEIGHT = 48;
const PARALLAX_HEIGHT = 200;

const PHOTO_BATCH_READ_SIZE = 50;

class WorkshopMainView extends Component {

   // noinspection JSUnusedGlobalSymbols
   static navigationOptions = () => ({
      header: null,
   });

   constructor(props) {
      super(props);

      // photos not grouped by creation date
      this._photos = [];
      // photos grouped by creation date
      this._groupedPhotos = [];

      this.state = {
         photoLoaded: false,
      };
   }

   _loadPhotos() {
      this._photos = PhotoUtils.loadPhotosSortByCreationDate(PHOTO_BATCH_READ_SIZE);
      this._groupedPhotos = PhotoUtils.groupPhotosByCreationDate(this._photos);
      this.setState({photoLoaded: true});
   }

   componentDidMount() {
      this._loadPhotos();
   }

   _renderNavBarLeftItem = () => (
      <DebouncedButton title={FontAwesomeIcons.camera}
                       style={styles.cameraButton}
                       textRkType='awesome inverseColor h2'/>
   );

   _renderNavBarRightItem = () => (
      <DropdownMenuButton iconUri={FontAwesomeIcons.bars}
                          style={styles.barsButton}>
         <DropdownMenuButton.Option option={"All Photos"}/>
         <DropdownMenuButton.Option option={"Timeline"}/>
      </DropdownMenuButton>
   );

   _renderNavBar = () => (
      <NavBar navigation={this.props.navigation}
              title='Timeline'
              titleRkType='inverseColor header4'
              layoutStyle={styles.navBarLayoutContainer}
              containerStyle={styles.navBarContainer}
              renderCustomLeftItem={() => this._renderNavBarLeftItem()}
              renderCustomRightItem={() => this._renderNavBarRightItem()}/>
   );

   _renderChildren = (props) => (
      <WorkshopDisplayAllPhotoView items={this._photos}
                                   galleryMinHeight={SCREEN_HEIGHT - PARALLAX_HEIGHT}/>
   );

   _renderWorkShopView = () => (
      <Parallax
         parallaxHeight={PARALLAX_HEIGHT}
         parallaxWidth={SCREEN_WDITH}
         headerHeight={NAV_BAR_HEIGHT}
         renderParallaxBackground={() => <Parallax.Background uri={BLUE_LOGO_BGIMAGE}/>}
         renderParallaxForeground={() => <Parallax.Foreground/>}
         renderFixedHeader={() => this._renderNavBar()}
         renderChildren={(props) => this._renderChildren(props)}
      />
   );

   render = () => (
      !this.state.photoLoaded ? <WorkshopPendingView/> : this._renderWorkShopView()
   );

}

const styles = StyleSheet.create({

   // nav bar
   navBarLayoutContainer: {
      backgroundColor: 'rgba(31, 31, 31, 0.98)',
      position: 'absolute',
      top: 0,
      left: 0,
      paddingTop: 0,
      borderBottomWidth: 0,
      height: NAV_BAR_HEIGHT,
      width: SCREEN_WDITH,
   },
   navBarContainer: {
      flexDirection: 'row',
      alignItems: 'center',
   },
   cameraButton: {
      position: 'absolute',
      left: 10,
   },
   barsButton: {
      position: 'absolute',
      right: 10,
   },

});

export default WorkshopMainView;