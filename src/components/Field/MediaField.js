import React, { Component } from 'react';
import { View, TextInput, StyleSheet, Text, Button, ActivityIndicator, FlatList } from 'react-native';
import { connect } from 'react-redux'
import MediaFieldItem from './MediaFieldItem'
import Separator from '../InvsList/Separator'
import uuid from 'uuid/v4'
import { navigateToCamera } from '../../actions/LineActions'

class MediaField extends Component {

    onFieldPress() {

        const { inv, line, navigateToCamera, _id } = this.props
        const field_uuid = line.filter(f => f._id === _id)[0].field_uuid
        const field = inv.fields.filter(f => f.uuid === field_uuid)[0]

        switch (field.type) {
            case 'video':
            case 'image':
                navigateToCamera(_id)
                break
        }

    }

    render() {
        return (
            <FlatList
                data={[{ name: 'Заглушка' }]}
                keyExtractor={(x, i) => uuid()}
                renderItem={({ item }) => <MediaFieldItem
                    _id={''}
                    name={item.name}
                    onPress={(_id) => this.onFieldPress(_id)} />}
                ItemSeparatorComponent={() => <Separator />}
            />
        )
    }
}

const mapStateToProps = state => {

    const _id = () => {
        return state.nav.routes[state.nav.routes.findIndex(c => c.routeName === 'MediaField')] !== undefined ? state.nav.routes[state.nav.routes.findIndex(c => c.routeName === 'MediaField')].params._id : ""
    }

    return {
        _id: _id(),
        value: state.line.line[state.line.line.findIndex(l => l._id === _id())] !== undefined ? state.line.line[state.line.line.findIndex(l => l._id === _id())].value : "",
        fields: state.inv.inv.fields,
        line: state.line.line,
        inv: state.inv.inv,
        nav: state.nav
    }
}

export default connect(mapStateToProps, {
    navigateToCamera
})(MediaField)