import React, { Component } from 'react';
import { View, TextInput, StyleSheet, Button } from 'react-native';
import { connect } from 'react-redux'
import uuid from 'uuid/v4'
import { lineTextFieldChanged, goBack } from '../../actions/LineActions'

class TextField extends Component {

    isNumeric() {
        const { _id, fields, line } = this.props
        const field_uuid = line.filter(l => l._id === _id)[0].field_uuid
        const type = fields.filter(f => f.uuid === field_uuid)[0].type

        if (type === 'digit') {
            return true
        } else {
            return false
        }
    }

    render() {
        if (this.props.nav.routes.filter(r => r.routeName === 'TextField').length > 0) {
            const { _id, value, lineTextFieldChanged, goBack } = this.props

            return (
                <View style={styles.container}>
                    <TextInput style={styles.input} value={value} keyboardType={this.isNumeric() === true ? 'numeric' : 'default'} onChangeText={(newValue) => lineTextFieldChanged(_id, newValue)} />
                    <Button title={'Сохранить'} onPress={() => goBack()} />
                </View>
            )
        } else {
            return null
        }
    }
}

const mapStateToProps = state => {

    const _id = () => {
        return state.nav.routes[state.nav.routes.findIndex(c => c.routeName === 'TextField')] !== undefined ? state.nav.routes[state.nav.routes.findIndex(c => c.routeName === 'TextField')].params._id : ""
    }

    return {
        _id: _id(),
        value: state.line.line[state.line.line.findIndex(l => l._id === _id())] !== undefined ? state.line.line[state.line.line.findIndex(l => l._id === _id())].value : "",
        fields: state.inv.inv.fields,
        line: state.line.line,
        nav: state.nav
    }
}

const styles = StyleSheet.create({
    container: {
        marginLeft: '10%',
        marginRight: '10%',
        marginTop: '20%'
    },
    input: {
        height: 40
    }
})

export default connect(mapStateToProps, {
    lineTextFieldChanged,
    goBack
})(TextField)