import React, { Component } from 'react';
import { Text } from 'react-native';
import Login from '../Login/Login'

export default class LoginForm extends Component {
  render() {
    return (
      <Login navigation={this.props.navigation}/>
    );
  }
}