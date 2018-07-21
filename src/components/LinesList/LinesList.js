import React, { Component } from 'react';
import { View, TextInput, StyleSheet, Text, Button, ActivityIndicator, FlatList, Alert } from 'react-native';
import { connect } from 'react-redux'
import LineListItem from './LineListItem'
import Separator from '../InvsList/Separator'
import uuid from 'uuid/v4'
import { Provider } from 'react-redux'
import { navigateToLine, navigateToCustomLine, navigateToCustomLineAlert, navigateToCustomLineAlertReset } from '../../actions/InvActions'
import { resetLineSaved } from '../../actions/LineActions'
import { goBack } from '../../actions/LineActions'
import { AlertMessage } from '../../nativemodules/AlertMessage'

class LinesList extends Component {

    componentWillMount() {
        const { goBack, navigateToCustomLineAlert } = this.props
        this.props.navigation.setParams({ goBack, navigateToCustomLineAlert })
    }

    componentDidUpdate() {
        const { lineSaved, resetLineSaved, isShowingCustomLineAlert, navigateToCustomLine, inv, navigateToCustomLineAlert, navigateToCustomLineAlertReset } = this.props

        if (lineSaved) {
            AlertMessage.showSuccess('Линия успешно сохранена')
            resetLineSaved()
        }

        if (isShowingCustomLineAlert) {
            Alert.alert(
                'Вы собираетесь добавить новую линию',
                'Возможно, для этого потребуется заполнить дополнительные поля',
                [
                    { text: 'Не буду добавлять' },
                    { text: 'Понятно', onPress: () => navigateToCustomLine(inv) },
                ],
                { cancelable: false }
              )
              navigateToCustomLineAlertReset()
        }

    }

    getNameUUID() {
        // const { inv } = this.props
        // const expr_articul = /арт.*/i

        // return inv.fields[inv.fields.findIndex(f => expr_articul.test(f.name))].uuid


        const { inv } = this.props
        const expr_articul = /арт.*/i

        if (inv.fields[0].type === 'video' || inv.fields[0].type === 'image') {
            return inv.fields[1].uuid
        } else {
            return inv.fields[0].uuid
        }        
    }

    getCellUUID() {
        const { inv } = this.props
        const expr_cell = /яче.*/i
        return inv.fields[inv.fields.findIndex(f => expr_cell.test(f.name))] !== undefined ? inv.fields[inv.fields.findIndex(f => expr_cell.test(f.name))].uuid : null
    }

    getData() {
        let array = []
        let result = []
        const required_fields = this.props.inv.fields.filter(f => f.is_required).map(f => f.uuid)

        if (this.props.inv.cells.length > 0) {

            const thisCounterCells = this.props.inv.cells.filter(c => c._id === this.props.counterID)[0]
            const startingIndex = thisCounterCells.starting_cell
            const endingIndex = thisCounterCells.ending_cell

            this.props.inv.lines.forEach((l, index) => {
                if (index >= startingIndex && index <= endingIndex) {
                    array.push(l)
                }
            })

        } else {
            array = this.props.inv.lines
        }

        // добавляем только те линии, в которых нет данных в обязательных полях

        array.forEach(l => {
            l.forEach(f => {
                if (required_fields.includes(f.field_uuid)) {

                    const field = this.props.inv.fields[this.props.inv.fields.findIndex(c => c.uuid === f.field_uuid)]

                    if (field.type === 'text' || field.type === 'digit' || field.type === 'time' || field.type === 'date' || field.type === 'choice') {

                        if (f.value === "") {
                            result.push(l)
                        }
                    } else {

                        if (f.media.length === 0) {
                            result.push(l)
                        }
                    }
                } 
            })
        })

        return result.map(l => ({
            name: l[l.findIndex(c => c.field_uuid === this.getNameUUID())].initial_value,
            _id: l[l.findIndex(c => c.field_uuid === this.getNameUUID())]._id,
            cell: this.getCellUUID() !== null ? l[l.findIndex(c => c.field_uuid === this.getCellUUID())].initial_value : ""
        }))
    }

    render() {
        return (
            <FlatList
                style={styles.list}
                data={this.getData()}
                initialNumToRender={10}
                keyExtractor={(x, i) => uuid()}
                renderItem={({ item }) => <LineListItem
                    name={item.name}
                    cell={item.cell}
                    _id={item._id}
                    onPress={(_id) => this.props.navigateToLine(_id, this.props.inv, item.name)} />}
                ItemSeparatorComponent={() => <Separator />}
            />
        )
    }
}

const mapStateToProps = state => {
    return {
        inv: state.inv.inv,
        isShowingCustomLineAlert: state.inv.isShowingCustomLineAlert,
        lineSaved: state.inv.lineSaved,
        counterID: state.auth._id
    }
}

const styles = StyleSheet.create({
    list: {
        backgroundColor: 'white'
    }
})

export default connect(mapStateToProps, {
    navigateToLine,
    goBack,
    resetLineSaved,
    navigateToCustomLine,
    navigateToCustomLineAlert,
    navigateToCustomLineAlertReset
})(LinesList)