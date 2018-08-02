import React, { Component } from 'react';

import { View, Text, AsyncStorage, FlatList, ActivityIndicator} from 'react-native';

import api from '../../services/api';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles';

import OrganizationItem from './components/OrganizationItem';

export default class Organization extends Component {
    static navigationOptions = {
        title: 'Organizações',
        tabBarIcon: ({ tintColor }) => <Icon name="building" size={20} color={tintColor}/>,
    };

    state = {
        data: [],
        loading: false,
        refreshing: false,
    };

    componentDidMount() {
        this.loadOrganizations();
    }

    loadOrganizations = async () => {
        this.setState({ refreshing: true });

        const username = await AsyncStorage.getItem('@Githuber:username');
        const response = await api.get(`/users/${username}/orgs`);

        this.setState({ data: response.data, loading: false, refreshing: false })
    };

    renderListItem = ({ item }) => <OrganizationItem organization={item} />


    renderList = () => (
        <FlatList
            data={this.state.data}
            keyExtractor={item => String(item.id)}
            renderItem={this.renderListItem}
            numColumns={2}
            columnWrapperStyle={styles.columnContainer}
            onRefresh={this.loadOrganizations}
            refreshing={this.state.refreshing}
        />
    )

    render() {
        return(
            <View style={styles.container}>
                { this.state.loading
                    ? <ActivityIndicator style={styles.loading} />
                    : this.renderList()
                }
            </View>
        );
    };
};