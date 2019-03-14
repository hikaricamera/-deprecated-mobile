import React, {Component} from "react";
import {Image, StyleSheet, View} from "react-native";
import EditImageScreenBottomTool from "./EditImageScreenBottomTool";


export default class EditScreen extends Component {
    constructor(props) {
        super(props);

        this.imagePath = this.props.navigation.getParam('photoPath');
    }


    render() {
        return (
            <View style={styles.ctr}>
                <Image
                   source={{uri: this.imagePath}}
                   style={{width: '90%', height: '90%'}}/>
                <EditImageScreenBottomTool/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    ctr: {
        margin: 5,
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center'
    }
});
