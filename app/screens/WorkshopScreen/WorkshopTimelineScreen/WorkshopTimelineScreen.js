import React, {Component} from "react";
import {Image, StatusBar, View} from "react-native";
import * as PhotoUtils from "../../../utilities/PhotoUtils";
import {GridsBox, TimelineCardLayout} from "../../../components";
import {dateToString} from "../../../utilities/DateUtils";

const PHOTO_BATCH_READ_SIZE = 50;

const BACKGROUND_COLOR = 'rgb(247, 247, 247)';

export default class WorkshopTimelineScreen extends Component {

    constructor(props) {
        super(props);

        this.state = {
            rowsData: [],
        };
    }

    componentDidMount() {
        this._loadPhotos();
    }

    render() {
        const {rowsData} = this.state;

        if (rowsData.length === 0) {
            return <View/>;
        }

        return (
            <View style={[styles.container]}>
                <StatusBar hidden={false}/>
                <TimelineCardLayout
                    rowsData={rowsData}
                    titleSize={15}
                    titleColor='rgba(110, 110, 110, 0.9)'
                    circleTop={7}
                    circleSize={8}
                    circleColor={'rgba(180, 180, 180, 0.7)'}
                    innerCircle={'dot'}
                    hideSeparator={true}
                    parentBackgroundColor={BACKGROUND_COLOR}
                />
            </View>
        )
    }

    _loadPhotos() {
        const photos = PhotoUtils.loadPhotosSortByCreationDate(PHOTO_BATCH_READ_SIZE);
        //groups two-dimensional array
        const groups = PhotoUtils.groupPhotosByCreationDate(photos);

        let rowsData = [];
        //group one-dimensional array
        for (const group of groups) {
            let uris = [];
            group.forEach((photo) => uris.push(photo.thumbnailBase64));

            let images = [];
            uris.forEach((uri) => {
                images.push(
                    <View style={{margin: 1}}>
                        <Image source={{uri: uri}} style={{width: 67, height: 67}}/>
                    </View>
                )
            });

            // when there are no photos, only display a date by default
            let date = new Date();
            if (group[0] != null){
                date = new Date(group[0].creationDate);
            }

            const dateTitle = dateToString(date, 'dd/MM/yyyy');
            const smallDateTitle = dateToString(date, 'dd/MM');
            rowsData.push(
                {
                    card: (
                        <GridsBox numberPerRow={4} scrollEnabled={false}>
                            {images}
                        </GridsBox>
                    ),
                    time: smallDateTitle,
                    title: dateTitle,
                }
            )
        }
        this.setState({rowsData});
    }
}

const styles = {
    container: {
        backgroundColor: BACKGROUND_COLOR,
    },
};
