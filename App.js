import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';

import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'
import reducers from './src/reducers/index'

import MainContainer from './src/components/MainContainer/MainContainer'
import CameraComponent from './src/components/CameraComponent/CameraComponent'
import CameraGallery from './src/components/CameraComponent/CameraGallery'
import { StackNavigator } from 'react-navigation';
import { composeWithDevTools } from 'remote-redux-devtools';
import { AlertMessage } from './src/nativemodules/AlertMessage'

import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducers, composeEnhancers(applyMiddleware(ReduxThunk)))

class App extends React.Component {

  showAlertMessage(type, text) {
    switch (type) {
      case 'error':
        AlertMessage.showError(text)
        break
      case 'success':
        AlertMessage.showSuccess(text)
        break
      default:
        break
    }
  }

  wrongCredentials(isWrong) {
    if (isWrong) {
      this.showAlertMessage('error', 'Неверные логин пароль!')
    }
  }

  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <MainContainer  />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: 'white',
  }
});


export default StackNavigator({
  App: {
    screen: App,
    navigationOptions: ({ navigation }) => ({
      header: null
    }),
  },
  App2: {
    screen: CameraComponent,
  },
  Image: {
    screen: CameraGallery,
  }
});