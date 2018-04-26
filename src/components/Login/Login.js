import React, { Component } from 'react';
import { View, TextInput, StyleSheet, Button, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux'
import { onLoginChange, onPasswordChange, performAuth, showLoading } from '../../actions/AuthActions'

class LoginForm extends Component {

    auth() {
        const { showLoading, performAuth, email, password } = this.props
        showLoading()
        performAuth(email, password)
    }

    resolveComponent() {

        const { login, password, onLoginChange, onPasswordChange, isLoading, performAuth, wrongCredentials, authFailed } = this.props

        if (wrongCredentials) {
            authFailed(true)
        }

        if (isLoading) {
            return <ActivityIndicator style={styles.activity} />
        } else {
            return (
                <View style={styles.container}>
                    <TextInput
                        autoCapitalize={'none'}
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
                        onPress={() => this.auth(login, password)
                            //  this.props.navigation.navigate('App2')
                        }
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
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    input: {
        height: 40,
        marginBottom: 20,
        width: 300,
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
    },
    activity: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    }
})

const mapStateToProps = state => {
    return {
        email: state.auth.email,
        password: state.auth.password,
        isLoading: state.auth.isLoading,
        wrongCredentials: state.auth.wrongCredentials
    }
}

export default connect(mapStateToProps, {
    onLoginChange,
    onPasswordChange,
    performAuth,
    showLoading
})(LoginForm)