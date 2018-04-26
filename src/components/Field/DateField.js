import React, { Component } from 'react';
import { View, TextInput, StyleSheet, Button } from 'react-native';
import { connect } from 'react-redux'
import uuid from 'uuid/v4'
import { lineTextFieldChanged, goBack } from '../../actions/LineActions'
import DatePicker from 'react-native-datepicker'
import moment from 'moment'

class DateField extends Component {

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
                        onDateChange={(date) => { lineTextFieldChanged(_id, date) }}
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

    const _id = () => {
        return state.nav.routes[state.nav.routes.findIndex(c => c.routeName === 'DateField')] !== undefined ? state.nav.routes[state.nav.routes.findIndex(c => c.routeName === 'DateField')].params._id : ""
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