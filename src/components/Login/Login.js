import React, { Component } from 'react';
import { View, TextInput, StyleSheet, Button } from 'react-native';

export default class LoginForm extends Component {
    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    placeholder={'Логин'}
                    style={styles.input} />
                <TextInput
                    placeholder={'Пароль'}
                    style={styles.input}
                    secureTextEntry
                    />
                <Button
                    onPress={() => this.props.navigation.navigate('App2')}
                    title="Войти"
                    color="#FF6347"
                />
            </View>
        );
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