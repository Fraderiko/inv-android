
import MainContainer from '../components/MainContainer/MainContainer'
import InvScreen from '../components/LinesList/LinesList'
import { StackNavigator } from 'react-navigation';


export default StackNavigator({
    App: {
      screen: MainContainer,
      navigationOptions: ({ navigation }) => ({
        header: null
      }),
    },
    InvScreen: {
      screen: InvScreen,
      navigationOptions: ({ navigation }) => ({
        headerTitle: navigation.state.params.title
      })
    }
  },
  {
    initialRouteName: 'App',
  });