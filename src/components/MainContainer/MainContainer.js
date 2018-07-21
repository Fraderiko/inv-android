import React, { Component } from 'react';
import { View, TextInput, StyleSheet, Button, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux'
import Login from '../Login/Login'
import InvsList from '../InvsList/InvsList'
import { checkAuth, logout } from '../../actions/AuthActions'
import { AlertMessage } from '../../nativemodules/AlertMessage'

class MainContainer extends Component {

    componentDidMount() {
        const { isAuthed, checkAuth } = this.props
        checkAuth()
        this.props.navigation.setParams({ isAuthed })
    }

    componentWillReceiveProps(nextProps){
        if (this.props.isAuthed !== nextProps.isAuthed) {
            this.props.navigation.setParams({ isAuthed: nextProps.isAuthed })
        }
    }

    wrongCredentials() {
        AlertMessage.showError('Неверные логин или пароль :(')
    }

    resolveComponent() {

        const { isAuthed } = this.props

        if (isAuthed === false) {
            return <Login
                authFailed={(isWrong) => this.wrongCredentials(isWrong)}
                navigation={this.props.navigation} />
        } else {
            return  <View style={{flex: 1}}>
                    <InvsList navigation={this.props.navigation} />
                    <Button onPress={() => this.props.logout()} title={'Выход'}/>
                    </View>
        }
    }

    render() {
        return this.resolveComponent()
    }
}

const mapStateToProps = state => {
    return {
        isAuthed: state.auth.isAuthed,
        id: state.auth._id,
    }
}

export default connect(mapStateToProps, {
    checkAuth,
    logout
})(MainContainer)