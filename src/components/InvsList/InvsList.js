import React, { Component } from 'react';
import { View, TextInput, StyleSheet, Text, Button, ActivityIndicator, FlatList, SectionList } from 'react-native';
import { connect } from 'react-redux'
import { getInvs, startLoading } from '../../actions/InvsListActions'
import { invOpened, navigateToInv, navigateToTask } from '../../actions/InvActions'
import { taskSavedReset } from '../../actions/LineActions'
import InvListItem from './InvListItem'
import Separator from './Separator'
import uuid from 'uuid/v4'
import { AlertMessage } from '../../nativemodules/AlertMessage'

class InvsList extends Component {

    componentDidMount() {
        const { startLoading, getInvs, counter } = this.props
        startLoading()
        getInvs(counter)
    }

    onInvPress(_id) {
        this.props.invOpened(this.props.invs[this.props.invs.findIndex(i => i._id === _id)])
        this.props.navigateToInv(this.props.invs[this.props.invs.findIndex(i => i._id === _id)].name)
    }

    onTaskPress(_id) {
        this.props.navigateToTask(_id, this.props.tasks, 'На проверку')
    }

    componentDidUpdate() {
        const {isShowingTaskAlert, taskSavedReset, getInvs, counter} = this.props
        
        if (isShowingTaskAlert) {
            AlertMessage.showSuccess('Успешно отправлено')
            taskSavedReset()
            getInvs(counter)
        }
    }

    getCounted = (lines, fields, inv) => {

        let counted = 0

        const required_fields = inv.fields.filter(f => f.is_required)
        const required_fields_uuids = required_fields.map(r => r.uuid)
        let index
        let empty

        inv.lines.forEach(concreteLine => concreteLine.forEach(l => {
            if (required_fields_uuids.includes(l.field_uuid)) {
                const field = inv.fields.filter(c => c.uuid === l.field_uuid)[0]

                if (l.initial_value !== "") {
                    empty = false
                } else {
                    empty = true
                }

                if (field.type === 'text' || field.type === 'digit' || field.type === 'time' || field.type === 'choice' || field.type === 'date') {
                    if (l.value !== "") {
                        counted = counted + 1
                    }
                } else {
                    if (l.media.length !== 0) {
                        counterd = counted + 1
                    }
                }
            }
        }))

        if (inv.cells.length > 0) {
            return counted + " из " + (inv.cells[inv.cells.findIndex(c => c._id === this.props.counter)].ending_cell - inv.cells[inv.cells.findIndex(c => c._id === this.props.counter)].starting_cell + 1)
        }

        if (empty) {
            return counted
        } else {
            return counted + " из " + lines.length
        }   
    }

    isTask = item => {
        if (item.inv !== undefined) {
            return true
        } else {
            return false
        }
    }

    getNameForTask = (lines, fields) => {
        const expr_cell = /яче.*/i
        const uuid = lines[fields.findIndex(f => expr_cell.test(f.name))] !== undefined ? fields[fields.findIndex(f => expr_cell.test(f.name))].uuid : null

        if (uuid !== null) {
            return lines[lines.findIndex(f => f.field_uuid === uuid)].initial_value
        } else {
            return lines[0].initial_value
        }
    }

    resolveComponent() {

        const { isLoading, getInvs, counter, startLoading } = this.props

        if (isLoading) {
            return <ActivityIndicator style={styles.activity} />
        } else {
            return <SectionList style={styles.list}

                onRefresh={() => getInvs(counter)}
                refreshing={isLoading}
                keyExtractor={(x, i) => uuid()}
                sections={[
                    {
                        'title': 'Первая секция', data: this.props.tasks.map(t => ({ name: this.getNameForTask(t.lines, t.fields), inv: t.inv.name, number: t.number, _id: t._id })), renderItem: ({ item }) => <InvListItem
                            name={item.name + '\n' + item.inv}
                            counted={''}
                            number={item.number}
                            _id={item._id}
                            onPress={(_id) => this.onTaskPress(_id)} />
                    },
                    { 'title': 'Вторая секция', data: this.props.invs.map(i => ({ _id: i._id, name: i.name, counted: this.getCounted(i.lines, i.fields, i) })) }
                ]}
                renderItem={({ item }) => <InvListItem
                    name={item.name}
                    counted={item.counted}
                    _id={item._id}
                    onPress={(_id) => this.onInvPress(_id)} />}
                ItemSeparatorComponent={() => <Separator />}
            />
        }
    }

    render() {
        return this.resolveComponent()
    }
}

const mapStateToProps = state => {
    return {
        counter: state.auth._id,
        invs: state.invs.invs,
        navigation: state.nav,
        isLoading: state.invs.isLoading,
        tasks: state.tasks.tasks,
        isShowingTaskAlert: state.tasks.isShowingTaskAlert
    }
}

const styles = StyleSheet.create({
    activity: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    list: {
        backgroundColor: 'white'
    }
})


export default connect(mapStateToProps, {
    startLoading,
    getInvs,
    invOpened,
    navigateToInv,
    navigateToTask,
    taskSavedReset
})(InvsList)