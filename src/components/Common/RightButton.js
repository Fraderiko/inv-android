import React, { Component } from 'react';
import { Text, TouchableOpacity } from 'react-native';

export default RightButton = (props) => {
    return (
        <TouchableOpacity onPress={() => props.onPress()} >
            <Text style={{ color: "#32CD32", paddingRight: 20, fontWeight: 'bold' }}>{props.title}</Text>
        </TouchableOpacity>
    )
}