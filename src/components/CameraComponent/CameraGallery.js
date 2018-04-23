import React, { Component } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { CameraKitGallery } from 'react-native-camera-kit'

export default class CameraGallery extends Component {
    render() {
        return (
            <Image 
                style={styles.container}
                resizeMode='contain'
                source={{ uri: 'file://' + this.props.navigation.state.params.image, isStatic: true }}
             />
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        aspectRatio: 1
    }
})