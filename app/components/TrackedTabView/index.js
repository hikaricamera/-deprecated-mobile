import React from "react";
import TrackedTabView from "./TrackedTabView"

export function createTrackedTabNavigator(routeConfig, drawConfig) {
    // convert routeConfig to routes
    const routes = Object.keys(routeConfig).map((name) => {
        const screenConfig = routeConfig[name];
        return {
            key: name,
            screen: screenConfig.screen,
        }
    });

    // find initial routeName
    let initialRouteIndex = 0;
    if ('initialRouteName' in drawConfig) {
        routes.forEach((route, index) => {
            if (route.key === drawConfig['initialRouteName']) {
                initialRouteIndex = index;
            }
        });
    }

    // make navigationState obj
    const initialNavigationState = {
        routes: routes,
        index: initialRouteIndex,
    };

    return (props) => (
        <TrackedTabView
            {...props}   // navigation prop
            initialNavigationState={initialNavigationState}
            {...drawConfig}
        />
    );
}
