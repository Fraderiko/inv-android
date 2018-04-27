import React, { Component } from 'react';
import { View, TextInput, StyleSheet, Text, Button, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native';
import { connect } from 'react-redux'
import MediaFieldItem from './MediaFieldItem'
import MediaFieldEmpty from './MediaFieldEmpty'
import Separator from '../InvsList/Separator'
import uuid from 'uuid/v4'
import { navigateToCamera, onDeletePress, onMediaDelete, uploadFiles } from '../../actions/LineActions'
import ActionButton from 'react-native-action-button';

class MediaField extends Component {

    static navigationOptions = ({ navigation }) => {
        const params = navigation.state.params || {};

        const upload = () => {
            params.uploadFiles(params.value, params._id)
        }
    
        return {
          headerRight: (
            <TouchableOpacity onPress={() => upload()} >
                <Text style={{ color: "#32CD32", paddingRight: 20, fontWeight: 'bold' }}>СОХРАНИТЬ</Text>
            </TouchableOpacity>
          ),
        };
      };

    onFieldPress() {
        const { inv, line, navigateToCamera, _id } = this.props
        const field_uuid = line.filter(f => f._id === _id)[0].field_uuid
        const field = inv.fields.filter(f => f.uuid === field_uuid)[0]

        switch (field.type) {
            case 'video':
            case 'image':
                navigateToCamera(_id)
                break
        }

    }

    componentWillMount() {
        const { value, uploadFiles, _id } = this.props
        this.props.navigation.setParams({ value, uploadFiles, _id });
    }

    render() {

        const { value, _id, onMediaDelete } = this.props

        return (
            <View style={{ flex: 1 }}>
                <FlatList style={styles.container}
                    data={value}
                    keyExtractor={(x, i) => uuid()}
                    ListEmptyComponent={<MediaFieldEmpty style={{ marginTop: '50%' }} onPress={() => this.onFieldPress()} />}
                    renderItem={({ item, index }) => <MediaFieldItem
                        _id={index}
                        value={item}
                        onPress={(pressed_id) => this.onFieldPress(pressed_id)}
                        onDeletePress={(index) => onMediaDelete(_id, index)} />}
                    ItemSeparatorComponent={() => <Separator />}
                />
                <ActionButton onPress={() => this.onFieldPress()} buttonColor="rgba(231,76,60,1)"/>
            </View>
        )
    }
}

const mapStateToProps = state => {

    const _id = () => {
        return state.nav.routes[state.nav.routes.findIndex(c => c.routeName === 'MediaField')] !== undefined ? state.nav.routes[state.nav.routes.findIndex(c => c.routeName === 'MediaField')].params._id : ""
    }

    return {
        _id: _id(),
        value: state.line.line[state.line.line.findIndex(l => l._id === _id())] !== undefined ? state.line.line[state.line.line.findIndex(l => l._id === _id())].media : [],
        fields: state.inv.inv.fields,
        line: state.line.line,
        inv: state.inv.inv,
        nav: state.nav
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white'
    }
})


export default connect(mapStateToProps, {
    navigateToCamera,
    onDeletePress,
    onMediaDelete,
    uploadFiles
})(MediaField)