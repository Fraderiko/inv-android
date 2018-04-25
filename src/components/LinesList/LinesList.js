import React, { Component } from 'react';
import { View, TextInput, StyleSheet, Text, Button, ActivityIndicator, FlatList } from 'react-native';
import { connect } from 'react-redux'
import { getInvs, startLoading } from '../../actions/InvsListActions'
import LineListItem from './LineListItem'
import Separator from '../InvsList/Separator'
import uuid from 'uuid/v4'
import { Provider } from 'react-redux'

class LinesList extends Component {

    getNameUUID() {
        const { inv } = this.props
        const expr_articul = /арт.*/i
        return inv.fields[inv.fields.findIndex(f => expr_articul.test(f.name))].uuid
    }

    render() {
        return (
            <FlatList
                data={this.props.inv.lines.map(l => ({ name: l[l.findIndex(c => c.field_uuid === this.getNameUUID())].initial_value }))}
                keyExtractor={(x, i) => uuid()}
                renderItem={({ item }) => <LineListItem
                    name={item.name} />}
                ItemSeparatorComponent={() => <Separator />}
            />
        )
    }
}

const mapStateToProps = state => {
    return {
        inv: state.inv.inv
    }
}

export default connect(mapStateToProps, {})(LinesList)