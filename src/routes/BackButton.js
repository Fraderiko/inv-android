import React, { Component } from 'react';
import { TouchableOpacity, Image } from 'react-native';

export default BackButton = (props) => {
    return (
        <TouchableOpacity style={{ paddingLeft: 15 }} onPress={() => props.onPress()}>
            <Image style={{ width: 22, height: 22 }} source={require('../images/back_button.png')} />
        </TouchableOpacity>
    )

}