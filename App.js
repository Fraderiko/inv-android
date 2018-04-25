import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';

import { Provider, connect } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'
import reducers from './src/reducers/index'
import Navigator from './src/routes/index'
import { composeWithDevTools } from 'remote-redux-devtools';
import { AlertMessage } from './src/nativemodules/AlertMessage'
import { addNavigationHelpers } from 'react-navigation'

import {
  createReduxBoundAddListener,
  createReactNavigationReduxMiddleware,
} from 'react-navigation-redux-helpers';

import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middleware = createReactNavigationReduxMiddleware(
  "root",
  state => state.nav,
);
const addListener = createReduxBoundAddListener("root");

const store = createStore(reducers, composeEnhancers(applyMiddleware(ReduxThunk)))

// class App extends React.Component {

//   showAlertMessage(type, text) {
//     switch (type) {
//       case 'error':
//         AlertMessage.showError(text)
//         break
//       case 'success':
//         AlertMessage.showSuccess(text)
//         break
//       default:
//         break
//     }
//   }

//   wrongCredentials(isWrong) {
//     if (isWrong) {
//       this.showAlertMessage('error', 'Неверные логин пароль!')
//     }
//   }

//   render() {
//     return ( <Navigator/>
//       // <Provider store={store}>
//       //   <View style={styles.container}>
//       //     <MainContainer store={store} navigation={this.props.navigation} />
//       //   </View>
//       // </Provider>
//     );
//   }
// }

const App = ({ dispatch, nav }) => {
  return <Navigator navigation={addNavigationHelpers({ dispatch, state: nav, addListener })} />
}

const mapStateToProps = state => {
  return {
    nav: state.nav,
  }
}

const AppWithNavigation = connect(mapStateToProps)(App)

export default () => {
  return (
    <Provider store={store}>
      <AppWithNavigation />
    </Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  }
});
