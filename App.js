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

import LoginForm from './src/components/Login/LoginForm'
import CameraComponent from './src/components/CameraComponent/CameraComponent'
import CameraGallery from './src/components/CameraComponent/CameraGallery'
import { StackNavigator } from 'react-navigation';
import { composeWithDevTools } from 'remote-redux-devtools';

import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// const composeEnhancers = composeWithDevTools({realtime: true, port: 8181})

const store = createStore(reducers, composeEnhancers(applyMiddleware(ReduxThunk)))

class App extends React.Component {

  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <LoginForm navigation={this.props.navigation} />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  }
});


export default StackNavigator({
  App: {
    screen: App,
  },
  App2: {
    screen: CameraComponent,
  },
  Image: {
    screen: CameraGallery,
  }
});