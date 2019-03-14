import React, {Component, ReactNode} from "react";
import {ScrollView, StyleSheet} from "react-native";
import InfoText from "../../components/InfoText";
import Card from "../../components/Card";
import CardItem from "../../components/CardItem";
import {ICONS} from "../../../assets/Path";


class SettingScreen extends Component {

    render(): ReactNode {
        return (
            <ScrollView style={styles.container}>
                <InfoText text='General'/>
                <Card>
                    <CardItem
                        title='How Hikari Works'
                        icon={ICONS.HOME_ICON}
                        showChevron={true}
                    />
                </Card>
                <InfoText text='Referral'/>
                <Card>
                    <CardItem
                        title='Referral Code'
                        icon={ICONS.CONNECT_ICON}
                        subtitle='z7mnj8X12nIpxs'
                    />
                    <CardItem
                        title='Hikari Coin'
                        icon={ICONS.COIN_ICON}
                        subtitle='100'
                        showChevron={true}
                    />
                </Card>
                <InfoText text='Camera'/>
                <Card>
                    <CardItem
                        title='Default Len'
                        icon={ICONS.LEN_ICON}
                        subtitle='Cyber Punk'
                        showChevron={true}
                    />
                    <CardItem
                        title='Assistant Guide'
                        icon={ICONS.GUIDE_ICON}
                        showSwitch={true}
                    />
                    <CardItem
                        title='Photo Watermark'
                        icon={ICONS.PEN_ICON}
                        showSwitch={true}
                    />
                    <CardItem
                        title='Language'
                        icon={ICONS.LANGUAGE_ICON}
                        subtitle='English (Canada)'
                        showChevron={true}
                    />
                    <CardItem
                        title='Dark Theme'
                        icon={ICONS.MOON_ICON}
                        showSwitch={true}
                    />
                </Card>
                <InfoText text='About'/>
                <Card>
                    <CardItem
                        title='Give Feedback'
                        icon={ICONS.FEEDBACK_ICON}
                        showChevron={true}
                    />
                    <CardItem
                        title='Version'
                        icon={ICONS.BADGE_ICON}
                        subtitle='0.1.1'
                    />
                </Card>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'rgba(247, 247, 247, 1)',
        marginTop: 25,
    }
});

export default SettingScreen;
