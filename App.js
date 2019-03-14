import React, {Component} from "react";
import AppNavigator from "./app/screens/AppNavigator";
import {Provider} from "react-redux";
import {store} from "./app/store";

export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <AppNavigator/>
            </Provider>
        );
    }
}

