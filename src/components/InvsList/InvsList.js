import React, { Component } from 'react';
import { View, TextInput, StyleSheet, Text, Button, ActivityIndicator, FlatList } from 'react-native';
import { connect } from 'react-redux'
import { getInvs, startLoading } from '../../actions/InvsListActions'
import InvListItem from './InvListItem'
import Separator from './Separator'
import uuid from 'uuid/v4'

class InvsList extends Component {

    componentDidMount() {
        const { startLoading, getInvs, counter } = this.props
        startLoading()
        getInvs(counter)
    }

    getCounted = (lines, fields) => {
        let counted = 0
    
        const info_fields = fields.filter(f => f.is_info_field === true) 
    
        lines.forEach(l => {
            const result = l.filter(field => {
                if (info_fields.includes(field.field_uuid)) {
                    return true
                } else {
                    if (field.value !== "") {
                        return true
                    }
                }
            })
    
            if (result.length === l.length) {
                counted = counted + 1
            }
        })
    
        return counted + " из " + lines.length
    }

    resolveComponent() {
        return <FlatList
            data = {this.props.invs.map(i =>  ({ _id: i._id, name: i.name, counted: this.getCounted(i.lines, i.fields) }) )}
            keyExtractor = { (x, i) => uuid() }
            renderItem = {({ item }) => <InvListItem 
                                        name = {item.name}
                                        counted = {item.counted}
                                        _id={item._id}
                                        onPress={(_id) => console.log(_id)} />}
            ItemSeparatorComponent={ () => <Separator/> }
            />
    }

    render() {
        return this.resolveComponent()
    }
}

const mapStateToProps = state => {
    return {
        counter: state.auth._id,
        invs: state.invs.invs
    }
}

export default connect(mapStateToProps, {
    startLoading,
    getInvs
})(InvsList)