import React, { Component } from 'react';
import { View, StyleSheet, Button, Picker } from 'react-native';
import { connect } from 'react-redux'
import uuid from 'uuid/v4'
import { Provider } from 'react-redux'
import { lineTextFieldChanged, goBack } from '../../actions/LineActions'

class PickerField extends Component {

    componentWillMount() {
        const { goBack } = this.props
        this.props.navigation.setParams({ goBack });
    }

    getPickerItems() {

        const { _id, fields, line } = this.props
        const field_uuid = line.filter(l => l._id === _id)[0].field_uuid
        const choices = fields.filter(f => f.uuid === field_uuid)[0].choices
        let result = choices.map(c => <Picker.Item key={uuid()} label={c} value={c} />)
        result.unshift(<Picker.Item key={uuid()} label={"Выберите"} value={"Выберите"} />)
        return result
    }

    isTask() {
        if (Object.getOwnPropertyNames(this.props.task).length !== 0) {
            return true
        }
        return false
    }

    render() {
        if (this.props.nav.routes.filter(r => r.routeName === 'PickerField').length > 0) {

            const { _id, value, lineTextFieldChanged, goBack } = this.props

            return (
                <View style={styles.container}>
                    <Picker
                        selectedValue={value !== "" ? value : 'Выберите'}
                        onValueChange={(newValue, itemIndex) => lineTextFieldChanged(_id, newValue, this.isTask())}>
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

    const taskExists = () => {
        if (Object.getOwnPropertyNames(state.tasks.currentTask).length !== 0) {
            return true
        }
        return false
    }

    componentIsVisible = () => {
        return state.nav.routes[state.nav.routes.findIndex(c => c.routeName === 'PickerField')] !== undefined
    }

    const _id = () => {
        return componentIsVisible() ? state.nav.routes[state.nav.routes.findIndex(c => c.routeName === 'PickerField')].params._id : ""
    }

    const getValue = () => {
        if (componentIsVisible()) {
            if (taskExists() === false){
                return state.line.line[state.line.line.findIndex(l => l._id === _id())].value
            } else {
                return state.tasks.currentTask.lines[state.tasks.currentTask.lines.findIndex(l => l._id === _id())].value
            }
        } else {
            return ""
        } 
    }

    const getFields = () => {
        if (componentIsVisible()) {
            if (taskExists() === false) {
                return state.nav.routes[state.nav.routes.findIndex(c => c.routeName === 'PickerField')].params.isCustom === false ? state.inv.inv.fields : state.inv.inv.counters_fields
            } else {
                return state.tasks.currentTask.fields
            }
        } else {
            return []
        }
    }

    const getLine = () => {
        if (taskExists() === false) {
            return state.line.line
        } else {
            return state.tasks.currentTask.lines
        }
    }

    return {
        _id: _id(),
        value: getValue(),
        fields: getFields(),
        line: getLine(),
        nav: state.nav,
        task: state.tasks.currentTask
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