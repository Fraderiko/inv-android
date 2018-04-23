import React, { Component } from 'react';
import { View, TextInput, StyleSheet, Button, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux'
import { onLoginChange, onPasswordChange, performAuth } from '../../actions/AuthActions'

class LoginForm extends Component {

    resolveComponent() {

        const { login, password, onLoginChange, onPasswordChange, isLoading, performAuth } = this.props

        if (isLoading) {
            return <ActivityIndicator />
        } else {
            return (
                <View style={styles.container}>
                    <TextInput
                        placeholder={'Логин'}
                        style={styles.input}
                        value={login}
                        onChangeText={(value) => onLoginChange(value)} />
                    <TextInput
                        placeholder={'Пароль'}
                        style={styles.input}
                        secureTextEntry
                        value={password}
                        onChangeText={(value) => onPasswordChange(value)}
                    />
                    <Button
                        onPress={() => performAuth(login, password)}
                        title="Войти"
                        color="#FF6347"
                    />
                </View>
            )
        }
    }

    render() {
        return this.resolveComponent()
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    input: {
        height: 40,
        marginBottom: 20,
        width: 300,
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
    }
})

const mapStateToProps = state => {
    return {
        email: state.auth.email,
        password: state.auth.password,
        isLoading: state.auth.isLoading
    }
}

export default connect(mapStateToProps, {
    onLoginChange,
    onPasswordChange,
    performAuth
})(LoginForm)