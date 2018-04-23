import React, { Component } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { CameraKitCameraScreen } from 'react-native-camera-kit'

export default class CameraComponent extends Component {

    static navigationOptions = {
        header: null,
    }

    render() {
        return (
            <View style={styles.container}>
                <CameraKitCameraScreen
                    actions={{ leftButtonText: 'Назад' }}
                    onBottomButtonPressed={(event) => 
                        this.props.navigation.navigate('Image', { image: event.captureImages[0].uri})
                        // this.props.navigation.goBack() 
                    }
                    showFrame={false}
                    scanBarcode={true}
                    onReadCode={((event) => Alert.alert("Qr code found" + event.nativeEvent.codeStringValue))}
                    hideControls={false}
                    captureButtonImage={require('../../images/capture_image_button.png')}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})