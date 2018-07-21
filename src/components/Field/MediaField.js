import React, { Component } from 'react';
import { View, TextInput, StyleSheet, Text, Button, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native';
import { connect } from 'react-redux'
import MediaFieldItem from './MediaFieldItem'
import MediaFieldEmpty from './MediaFieldEmpty'
import Separator from '../InvsList/Separator'
import uuid from 'uuid/v4'
import { navigateToCamera, onDeletePress, onMediaDelete, uploadFiles, goBack } from '../../actions/LineActions'
import ActionButton from 'react-native-action-button';
import { VideoCamera } from '../../nativemodules/VideoCamera'
import RightButton from '../Common/RightButton'

class MediaField extends Component {

    static navigationOptions = ({ navigation }) => {
        const params = navigation.state.params || {};
        const upload = () => {
            params.uploadFiles(params.value, params._id, params.isTask)
        }
        return {
            headerRight: (<RightButton title={'СОХРАНИТЬ'} onPress={() => upload()} />),
        };
    };

    isTask() {
        if (Object.getOwnPropertyNames(this.props.task).length !== 0) {
            return true
        }
        return false
    }

    onFieldPress() {

        if (this.isTask() === false) {
            const { inv, line, navigateToCamera, _id } = this.props
            const field_uuid = line.filter(f => f._id === _id)[0].field_uuid
            let field = inv.fields.filter(f => f.uuid === field_uuid)[0]

            if (field === undefined) {
                field = inv.counters_fields.filter(f => f.uuid === field_uuid)[0]
            }

            switch (field.type) {
                case 'image':
                    navigateToCamera(_id)
                    break
            }
        } else {
            const { task, navigateToCamera, _id } = this.props
            const field_uuid = task.lines.filter(f => f._id === _id)[0].field_uuid
            const field = task.fields.filter(f => f.uuid === field_uuid)[0] 

            switch (field.type) {
                case 'image':
                    navigateToCamera(_id)
                    break
            }
        }
    }

    componentWillMount() {
        const { value, uploadFiles, _id, goBack } = this.props
        this.props.navigation.setParams({ value, uploadFiles, _id, goBack });
    }

    componentWillReceiveProps(nextProps) {
        const { value } = this.props
        if (nextProps.value !== value) {
            this.props.navigation.setParams({ value });
        }
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
                <ActionButton onPress={() => this.onFieldPress()} buttonColor="rgba(231,76,60,1)" />
            </View>
        )
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
        return state.nav.routes[state.nav.routes.findIndex(c => c.routeName === 'MediaField')] !== undefined
    }

    const _id = () => {
        return componentIsVisible() ? state.nav.routes[state.nav.routes.findIndex(c => c.routeName === 'MediaField')].params._id : ""
    }

    const getValue = () => {
        if (componentIsVisible()) {
            if (taskExists() === false) {
                return state.line.line[state.line.line.findIndex(l => l._id === _id())].media
            } else {
                return state.tasks.currentTask.lines[state.tasks.currentTask.lines.findIndex(l => l._id === _id())].media
            }
        } else {
            return []
        }
    }

    const getFields = () => {
        if (componentIsVisible()) {
            if (taskExists() === false) {
                return state.nav.routes[state.nav.routes.findIndex(c => c.routeName === 'MediaField')].params.isCustom === false ? state.inv.inv.fields : state.inv.inv.counters_fields
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
        inv: state.inv.inv,
        nav: state.nav,
        task: state.tasks.currentTask
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
    uploadFiles,
    goBack
})(MediaField)