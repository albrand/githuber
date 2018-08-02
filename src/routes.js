import React from 'react';
import {
    StackNavigator,
    TabNavigator
} from 'react-navigation'

import { metrics, colors } from './styles';

import Welcome from './pages/welcome';
import Organization from './pages/organization';
import Repositories from './pages/repositories';

import HeaderRight from './components/HeaderRight';

const createNavigator = (isLogged = false) => StackNavigator ({
    Welcome: { screen: Welcome },
    User: { 
        screen: TabNavigator({
            Repositories: { screen: Repositories },
            Organization: { screen: Organization },
        }, {
            tabBarPosition: 'bottom',
            tabBarOptions: {
                showIcon: true,
                showLabel: false,
                activeTintColor: colors.white,
                inactiveTintColor: colors.whiteTransparent,
                style: {
                    backgroundColor: colors.secundary,
                },
            },
        }),
     },
}, {
    initialRouteName: isLogged ? 'User' : 'Welcome',
    navigationOptions: ({ navigation }) => ({
        headerStyle: {
            paddingHorizontal: metrics.basePadding,
        },
        headerRight: <HeaderRight navigation={navigation}/>,
    })
});

export default createNavigator;