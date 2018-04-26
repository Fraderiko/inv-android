import React, { Component } from 'react';
import { View, TextInput, StyleSheet, Text, Button, ActivityIndicator, FlatList } from 'react-native';
import { connect } from 'react-redux'
import LineListItem from '../LinesList/LineListItem'
import Separator from '../InvsList/Separator'
import uuid from 'uuid/v4'
import { navigateToTextField, navigateToChoiceField, navigateToDateField, navigateToMediaField } from '../../actions/LineActions'

class FieldsList extends Component {

    prepareData() {
        let result = []
        const { inv, line } = this.props
        const field_names = inv.fields.map(f => ({ name: f.name, uuid: f.uuid }))

        line.forEach(e => {
            field_names.forEach(f => {
                if (e.field_uuid === f.uuid) {
                    result.push({ name: f.name, _id: e._id, field_uuid: f.uuid })
                }
            })
        });

        return result
    }

    onFieldPress(_id) {
        const { inv, line, navigateToTextField, navigateToChoiceField, navigateToDateField, navigateToMediaField } = this.props
        const field_uuid = line.filter(f => f._id === _id)[0].field_uuid
        const field = inv.fields.filter(f => f.uuid === field_uuid)[0]


        switch (field.type) {
            case 'text':
            case 'digit':
                navigateToTextField(field.name, _id)
                break
            case 'choice':
                navigateToChoiceField(field.name, _id)
                break
            case 'date':
            case 'time':
                navigateToDateField(field.name, _id)
            case 'video':
            case 'image':
                navigateToMediaField(field.name, _id)
                break
        }

    }

    render() {
        return (
            <FlatList
                data={this.prepareData()}
                keyExtractor={(x, i) => uuid()}
                renderItem={({ item }) => <LineListItem
                    name={item.name}
                    cell={''}
                    _id={item._id}
                    onPress={(_id) => this.onFieldPress(_id)} />}
                ItemSeparatorComponent={() => <Separator />}
            />
        )
    }
}

const mapStateToProps = state => {
    return {
        line: state.line.line,
        inv: state.inv.inv
    }
}

export default connect(mapStateToProps, {
    navigateToTextField,
    navigateToChoiceField,
    navigateToDateField,
    navigateToMediaField
})(FieldsList)