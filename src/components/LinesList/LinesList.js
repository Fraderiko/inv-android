import React, { Component } from 'react';
import { View, TextInput, StyleSheet, Text, Button, ActivityIndicator, FlatList } from 'react-native';
import { connect } from 'react-redux'
import LineListItem from './LineListItem'
import Separator from '../InvsList/Separator'
import uuid from 'uuid/v4'
import { Provider } from 'react-redux'
import { navigateToLine } from '../../actions/InvActions'

class LinesList extends Component {

    componentDidMount() {
        // this.setState({
        //     data: this.state.data.concat(this.props.inv.lines.map(l => ({ name: l[l.findIndex(c => c.field_uuid === this.getNameUUID())].initial_value, cell: l[l.findIndex(c => c.field_uuid === this.getCellUUID())].initial_value !== undefined ? l[l.findIndex(c => c.field_uuid === this.getCellUUID())].initial_value : "", _id: l[l.findIndex(c => c.field_uuid === this.getNameUUID())]._id })).slice(0, 1 * 10)),
        //     })

            this.setState({
                data: this.state.data.concat(this.props.inv.lines.map(l => ({ name: l[l.findIndex(c => c.field_uuid === this.getNameUUID())].initial_value, _id: l[l.findIndex(c => c.field_uuid === this.getNameUUID())]._id })).slice(0, 1 * 10)),
                })
    }

    state = {
        page: 0,
        itemNumber: 10,
        start: 0,
        data: []
    }

    getNameUUID() {
        const { inv } = this.props
        const expr_articul = /арт.*/i

        return inv.fields[inv.fields.findIndex(f => expr_articul.test(f.name))].uuid
    }

    getCellUUID() {
        const { inv } = this.props
        const expr_cell = /яче.*/i
        return inv.fields[inv.fields.findIndex(f => expr_cell.test(f.name))] !== undefined ? inv.fields[inv.fields.findIndex(f => expr_cell.test(f.name))].uuid : null
    }

    getData() {

        console.log('endReached, getting data')

        const { page, start, itemNumber } = this.state
        console.log('initial page = ', page, 'initial start = ', start, 'initial itemNumber = ', itemNumber)
        const newPage = page + 1
        const newStart = newPage * itemNumber
        const itemsToFetch = newStart * 2
        console.log('calculated page = ', newPage, 'calculated start = ', newStart)

        // this.setState({
        //     start: newPage * itemNumber,
        //     page: newPage,
        //     data: this.state.data.concat(this.props.inv.lines.map(l => ({ name: l[l.findIndex(c => c.field_uuid === this.getNameUUID())].initial_value, cell: l[l.findIndex(c => c.field_uuid === this.getCellUUID())].initial_value !== undefined ? l[l.findIndex(c => c.field_uuid === this.getCellUUID())].initial_value : "", _id: l[l.findIndex(c => c.field_uuid === this.getNameUUID())]._id })).slice(newStart, itemsToFetch)),
        //     })

        this.setState({
            start: newPage * itemNumber,
            page: newPage,
            data: this.state.data.concat(this.props.inv.lines.map(l => ({ name: l[l.findIndex(c => c.field_uuid === this.getNameUUID())].initial_value, _id: l[l.findIndex(c => c.field_uuid === this.getNameUUID())]._id })).slice(newStart, itemsToFetch)),
            })
    }   

    render() {
        return (
            <FlatList
                data={this.state.data}
                onEndReachedThreshold={0.5}
                onEndReached={ () => this.getData()}
                initialNumToRender={10}
                keyExtractor={(x, i) => uuid()}
                renderItem={({ item }) => <LineListItem
                    name={item.name}
                    cell={item.cell}
                    _id={item._id}
                    onPress={(_id) => this.props.navigateToLine(_id, this.props.inv)} />}
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

export default connect(mapStateToProps, {
    navigateToLine
})(LinesList)