import React, {Component} from "react";
import * as PropTypes from 'prop-types'
import {FlatList} from "react-native";
import {addDefaultKey} from "../utilities/ObjectUtils";

class GridsBox extends Component {

    constructor(props) {
        super(props);

        this.itemGroups = this.groupItems();
    }

    groupItems() {
        const {children, numberPerRow} = this.props;

        let items;
        if (Array.isArray(children)) {
            items = children;
        } else {
            items = [children];
        }

        let itemObjs = [];
        for (const item of items) {
            // add default key field to get rid of warnings
            itemObjs.push(addDefaultKey({
                item: item
            }));
        }

        let itemGroups = [];
        let group = [];

        itemObjs.forEach((item) => {
            group.push(item);
            if (group.length === numberPerRow){
                // add default key field to get rid of warnings
                const groupObj = addDefaultKey({
                    group: group
                });
                itemGroups.push(groupObj);
                group = [];
            }
        });

        if (group !== []) {
            itemGroups.push(addDefaultKey({
                group: group
            }));
        }

        return itemGroups;
    }

    renderRow(itemsPerRow) {
        return (
            <FlatList
                data={itemsPerRow}
                renderItem={({item}) => item.item}
                horizontal={true}
                scrollEnabled={this.props.scrollEnabled}
                showsHorizontalScrollIndicator={this.props.scrollEnabled}
            />
        );
    }

    render() {
        return (
           <FlatList
              data={this.itemGroups}
              renderItem={({item}) => this.renderRow(item.group)}
              scrollEnabled={this.props.scrollEnabled}
              showsVerticalScrollIndicator={this.props.scrollEnabled}
           />
        );
    }
}

GridsBox.propType = {
    numberPerRow: PropTypes.number.isRequired,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]),
    scrollEnabled: PropTypes.bool,
};

GridsBox.defaultProps = {
    scrollEnabled: true,
};

export default GridsBox;
