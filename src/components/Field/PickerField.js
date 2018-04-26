import React, { Component } from 'react';
import { View, StyleSheet, Button, Picker } from 'react-native';
import { connect } from 'react-redux'
import uuid from 'uuid/v4'
import { Provider } from 'react-redux'
import { lineTextFieldChanged, goBack } from '../../actions/LineActions'

class PickerField extends Component {

    getPickerItems() {

        const { _id, fields, line } = this.props
        const field_uuid = line.filter(l => l._id === _id)[0].field_uuid
        const choices = fields.filter(f => f.uuid === field_uuid)[0].choices
        let result = choices.map(c => <Picker.Item key={uuid()} label={c} value={c} />)
        result.unshift(<Picker.Item key={uuid()} label={"Выберите"} value={"Выберите"} />)
        return result
    }

    render() {
        if (this.props.nav.routes.filter(r => r.routeName === 'PickerField').length > 0) {

            const { _id, value, lineTextFieldChanged, goBack } = this.props

            return (
                <View style={styles.container}>
                    <Picker
                        selectedValue={value !== "" ? value : 'Выберите'}
                        onValueChange={(newValue, itemIndex) => lineTextFieldChanged(_id, newValue)}>
                        {this.getPickerItems()}
                    </Picker>
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
        return state.nav.routes[state.nav.routes.findIndex(c => c.routeName === 'PickerField')] !== undefined ? state.nav.routes[state.nav.routes.findIndex(c => c.routeName === 'PickerField')].params._id : ""
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
})(PickerField)