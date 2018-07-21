
import MainContainer from '../components/MainContainer/MainContainer'
import InvScreen from '../components/LinesList/LinesList'
import LineScreen from '../components/FieldsList/FieldsList'
import TextField from '../components/Field/TextField'
import PickerField from '../components/Field/PickerField'
import DateField from '../components/Field/DateField'
import MediaField from '../components/Field/MediaField'
import CameraScreen from '../components/CameraComponent/CameraComponent'

import { StackNavigator } from 'react-navigation';
import React, { Component } from 'react';
import { Image, TouchableOpacity } from 'react-native';

import BackButton from './BackButton'
import RightButton from '../components/Common/RightButton'


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
                headerTitle: navigation.state.params.title.substring(0, 15) + "...",
                headerLeft: <BackButton onPress={ () => navigation.state.params.goBack() }/> ,
                headerRight: (<RightButton title={'ДОБАВИТЬ'} onPress={() => navigation.state.params.navigateToCustomLineAlert()} />),  
            }),
        },
        LineScreen: {
            screen: LineScreen,
            navigationOptions: ({ navigation }) => ({
                headerTitle: navigation.state.params.title,
                headerRight: (<RightButton title={'СОХРАНИТЬ'} onPress={(line, inv) => navigation.state.params.saveLine(line, inv)} />),
                headerLeft: <BackButton onPress={ () => navigation.state.params.goBack() }/> ,
            })
        },
        TextField: {
            screen: TextField,
            navigationOptions: ({ navigation }) => ({
                headerTitle: navigation.state.params.title,
                headerLeft: <BackButton onPress={ () => navigation.state.params.goBack() }/> ,  
            }),
        },
        PickerField: {
            screen: PickerField,
            navigationOptions: ({ navigation }) => ({
                headerTitle: navigation.state.params.title,
                headerLeft: <BackButton onPress={ () => navigation.state.params.goBack() }/> ,  
            }),
        },
        DateField: {
            screen: DateField,
            navigationOptions: ({ navigation }) => ({
                headerTitle: navigation.state.params.title,
                headerLeft: <BackButton onPress={ () => navigation.state.params.goBack() }/> ,  
            }),
        },
        MediaField: {
            screen: MediaField,
            navigationOptions: ({ navigation }) => ({
                headerTitle: navigation.state.params.title,
                headerLeft: <BackButton onPress={ () => navigation.state.params.goBack() }/> ,  
            }),
        },
        CameraScreen: {
            screen: CameraScreen,
            navigationOptions: ({ navigation }) => ({
                headerTitle: navigation.state.params.title,
                headerLeft: <BackButton onPress={ () => navigation.state.params.goBack() }/> ,  
            }),
        }
    },
    {
        initialRouteName: 'App',
    });