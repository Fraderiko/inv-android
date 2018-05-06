import React, { Component } from 'react';
import { View, TextInput, StyleSheet, Button } from 'react-native';
import { connect } from 'react-redux'
import uuid from 'uuid/v4'
import { lineTextFieldChanged, goBack } from '../../actions/LineActions'
import DatePicker from 'react-native-datepicker'
import moment from 'moment'

class DateField extends Component {

    componentWillMount() {
        const { goBack } = this.props
        this.props.navigation.setParams({ goBack });
    }

    isTime() {
        const { _id, fields, line } = this.props
        const field_uuid = line.filter(l => l._id === _id)[0].field_uuid
        const type = fields.filter(f => f.uuid === field_uuid)[0].type

        if (type === 'time') {
            return true
        } else {
            return false
        }
    }

    isTask() {
        if (Object.getOwnPropertyNames(this.props.task).length !== 0) {
            return true
        }
        return false
    }

    render() {
        if (this.props.nav.routes.filter(r => r.routeName === 'DateField').length > 0) {
            const { _id, value, lineTextFieldChanged, goBack } = this.props

            return (
                <View style={styles.container}>
                    <DatePicker
                        style={styles.picker}
                        date={value}
                        mode={this.isTime() === true ? 'time' : 'date'}
                        placeholder={this.isTime() === true ? 'Выберите время' : 'Выберите дату'}
                        format={this.isTime() === true ? 'HH:mm' : "DD/MM/YYYY"}
                        confirmBtnText="Выбрать"
                        cancelBtnText="Отмена"
                        customStyles={{
                            dateIcon: {
                                position: 'absolute',
                                left: 0,
                                top: 4,
                                marginLeft: 0
                            },
                            dateInput: {
                                marginLeft: 36
                            }
                        }}
                        onDateChange={(date) => { lineTextFieldChanged(_id, date, this.isTask()) }}
                    />
                    <Button style={styles.button} title={'Сохранить'} onPress={() => goBack()} />
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

    const componentIsVisible = () => {
        return state.nav.routes[state.nav.routes.findIndex(c => c.routeName === 'DateField')] !== undefined
    }

    const _id = () => {
        return componentIsVisible() ? state.nav.routes[state.nav.routes.findIndex(c => c.routeName === 'DateField')].params._id : ""
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
                return state.nav.routes[state.nav.routes.findIndex(c => c.routeName === 'DateField')].params.isCustom === false ? state.inv.inv.fields : state.inv.inv.counters_fields
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
        justifyContent: 'center',
        alignItems: 'center',
        alignItems: 'stretch',
        backgroundColor: 'white',
        paddingLeft: '10%',
        paddingRight: '10%',
        flex: 1,
        
    },
    picker: { 
        width: '100%',
        height: 80,
        paddingTop: 20,
    },
})

export default connect(mapStateToProps, {
    lineTextFieldChanged,
    goBack
})(DateField)