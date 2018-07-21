import React, { Component } from 'react';
import { View, TextInput, StyleSheet, Text, Button, ActivityIndicator, FlatList } from 'react-native';
import { connect } from 'react-redux'
import LineListItem from '../LinesList/LineListItem'
import Separator from '../InvsList/Separator'
import uuid from 'uuid/v4'
import {
    navigateToTextField,
    navigateToChoiceField,
    navigateToDateField,
    navigateToMediaField,
    uploadFiles,
    updateInv,
    resetMissingFields
} from '../../actions/LineActions'
import { VideoCamera } from '../../nativemodules/VideoCamera'
import { goBack } from '../../actions/LineActions'
import { AlertMessage } from '../../nativemodules/AlertMessage'


class FieldsList extends Component {

    componentWillMount() {
        const { goBack, updateInv, line, inv, counter, invs, task } = this.props
        this.props.navigation.setParams({ goBack, saveLine: () => updateInv(line, inv, counter, invs, this.isTask(), task) });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.line !== this.props.line || nextProps.task !== this.props.task) {
            this.props.navigation.setParams({ goBack: this.props.goBack, saveLine: () => this.props.updateInv(this.props.line, this.props.inv, this.props.counter, this.props.invs, this.isTask(), this.props.task) });
        }
    }

    componentDidUpdate() {
        const { isValid, resetMissingFields } = this.props

        if (isValid === false) {
            AlertMessage.showError('Заполните все обязательные поля, они отмечены звездочкой')
            resetMissingFields()
        }
    }

    isTask() {
        if (Object.getOwnPropertyNames(this.props.task).length !== 0) {
            return true
        }
        return false
    }

    isInv() {
        if (Object.getOwnPropertyNames(this.props.task).length !== 0) {
            return true
        }
        return false
    }

    prepareData() {
        let result = []
        let { inv, line, task, isShowingTaskAlert } = this.props
        let isTask = false

        if (this.isTask()) {
            line = task.lines
            inv = task
            isTask = true
        }

        const field_names = inv.fields.map(f => ({ name: f.name, uuid: f.uuid, is_required: f.is_required }))
        const custom_field_names = isTask === true ? [] : inv.counters_fields.map(f => ({ name: f.name, uuid: f.uuid, is_required: f.is_required }))

        line.forEach(e => {
            field_names.forEach(f => {
                if (e.field_uuid === f.uuid) {
                    result.push({ name: f.is_required === false ? f.name : f.name + " *", _id: e._id, field_uuid: f.uuid, isCustom: false })
                }
            })
        });


        if (isTask === false) {
            if (custom_field_names.length > 0) {
                line.filter(l => l.isCustom === true).forEach(e => {
                    custom_field_names.forEach(f => {
                        if (e.field_uuid === f.uuid) {
                            result.push({ name: f.is_required === false ? f.name : f.name + " *", _id: e._id, field_uuid: f.uuid, isCustom: true })
                        }
                    })
                })
            }
        }

        return result
    }

    onFieldPress(_id, isCustom) {
        let { inv, line, task, navigateToTextField, navigateToChoiceField, navigateToDateField, navigateToMediaField, uploadFiles } = this.props

        let isTask = false

        if (this.isTask()) {
            line = task.lines
            inv = task
            isTask = true
        }

        const field_uuid = line.filter(f => f._id === _id)[0].field_uuid
        const field = isCustom === false ? inv.fields.filter(f => f.uuid === field_uuid)[0] : inv.counters_fields.filter(f => f.uuid === field_uuid)[0]

        switch (field.type) {
            case 'text':
            case 'digit':
                navigateToTextField(field.name, _id, isCustom)
                break
            case 'choice':
                navigateToChoiceField(field.name, _id, isCustom)
                break
            case 'date':
            case 'time':
                navigateToDateField(field.name, _id, isCustom)
                break
            case 'video':
                async function show() {
                    try {
                        var { path } = await VideoCamera.show();
                        const files = [path]
                        uploadFiles(files, _id)
                    } catch (e) {
                        console.error(e);
                    }
                }

                show()
                break
            case 'image':
                navigateToMediaField(field.name, _id, isCustom, isTask)
                break
        }
    }

    getIsCompleted(_id, isCustom) {
        let { inv, line, task } = this.props

        if (Object.getOwnPropertyNames(task).length !== 0) {
            line = task.lines
            inv = task
        }

        const field_uuid = line.filter(f => f._id === _id)[0].field_uuid
        const field = isCustom === false ? inv.fields.filter(f => f.uuid === field_uuid)[0] : inv.counters_fields.filter(f => f.uuid === field_uuid)[0]
        const fieldInLine = line.filter(f => f.field_uuid === field_uuid)[0]

        if (field.type === 'text' || field.type === 'digit' || field.type === 'choice' || field.type === 'date' || field.type === 'time') {
            if (fieldInLine.value !== '') {
                return true
            }
        } else {
            if (fieldInLine.media.length > 0) {
                return true
            }
        }

        return false
    }

    render() {

        if (this.props.nav.routes.filter(r => r.routeName === 'LineScreen').length > 0) {
            return (
                <FlatList
                    extraData={this.props.line}
                    style={styles.list}
                    data={this.prepareData()}
                    keyExtractor={(x, i) => uuid()}
                    renderItem={({ item, index }) => <LineListItem
                        name={item.name}
                        cell={''}
                        _id={item._id}
                        isCompleted={this.getIsCompleted(item._id, item.isCustom)}
                        onPress={(_id) => this.onFieldPress(_id, item.isCustom)} />}
                    ItemSeparatorComponent={() => <Separator />}
                />
            )
        } else {
            return null
        }
    }
}

const mapStateToProps = state => {
    return {
        nav: state.nav,
        line: state.line.line,
        isValid: state.line.isValid,
        inv: state.inv.inv,
        counter: state.auth._id,
        task: state.tasks.currentTask,
        invs: state.invs.invs,
        isShowingTaskAlert: state.tasks.isShowingTaskAlert

    }
}

const styles = StyleSheet.create({
    list: {
        backgroundColor: 'white'
    }
})

export default connect(mapStateToProps, {
    navigateToTextField,
    navigateToChoiceField,
    navigateToDateField,
    navigateToMediaField,
    uploadFiles,
    goBack,
    updateInv,
    resetMissingFields
})(FieldsList)