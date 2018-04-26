
import MainContainer from '../components/MainContainer/MainContainer'
import InvScreen from '../components/LinesList/LinesList'
import LineScreen from '../components/FieldsList/FieldsList'
import TextField from '../components/Field/TextField'
import PickerField from '../components/Field/PickerField'
import DateField from '../components/Field/DateField'
import MediaField from '../components/Field/MediaField'
import CameraScreen from '../components/CameraComponent/CameraComponent'

import { StackNavigator } from 'react-navigation';


export default StackNavigator(
    {
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
        },
        LineScreen: {
            screen: LineScreen,
            navigationOptions: ({ navigation }) => ({
                headerTitle: navigation.state.params.title
            })
        },
        TextField: {
            screen: TextField
        },
        PickerField: {
            screen: PickerField
        },
        DateField: {
            screen: DateField
        },
        MediaField: {
            screen: MediaField
        },
        CameraScreen: {
            screen: CameraScreen
        }
    },
    {
        initialRouteName: 'App',
    });