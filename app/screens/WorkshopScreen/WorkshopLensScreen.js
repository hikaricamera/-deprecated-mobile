import React, {Component} from "react";
import {ReboundScrollViewAndroid} from "../../components";
import {Text, View} from "react-native";

let DUMMY_DATA = [

];

for (let i = 0;i < 50;i ++) {
    DUMMY_DATA.push({
        key: `${i}`
    })
}

export default class WorkshopLensScreen extends Component {


    render() {
        return (
            <View>
                <ReboundScrollViewAndroid>
                    <View collapsable={false}>
                        {DUMMY_DATA.map(e => <Text>{e.key}</Text>)}
                    </View>
                </ReboundScrollViewAndroid>
            </View>
        );
    }
}

const styles = {

};
