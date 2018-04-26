import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

class MediaFieldEmpty extends React.PureComponent {
    
    render() {
        return (
            <TouchableOpacity onPress={() => this.props.onPress(this.props._id)} style={styles.container}>
                <Image source={require('../../images/capture_image_button.png')}/>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 600,
        backgroundColor: 'white'
    }
})

export default MediaFieldEmpty