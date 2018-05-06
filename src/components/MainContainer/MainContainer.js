import React, { Component } from 'react';
import { View, TextInput, StyleSheet, Button, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux'
import Login from '../Login/Login'
import InvsList from '../InvsList/InvsList'
import { checkAuth } from '../../actions/AuthActions'

class MainContainer extends Component {

    componentDidMount() {
        this.props.checkAuth()
    }

    resolveComponent() {

        const { isAuthed } = this.props

        if (isAuthed === false) {
            return <Login 
            authFailed={(isWrong) => this.wrongCredentials(isWrong)}
            navigation={this.props.navigation} />
        } else {
            return <InvsList navigation={this.props.navigation}/>
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
    checkAuth
})(MainContainer)