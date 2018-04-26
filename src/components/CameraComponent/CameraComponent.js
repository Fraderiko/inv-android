import React, { Component } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { CameraKitCameraScreen } from 'react-native-camera-kit'
import { imageCaptured } from '../../actions/LineActions'
import { connect } from 'react-redux';

class CameraComponent extends Component {
    render() {

        console.log(this.props)

        return (
            <View style={styles.container}>
                <CameraKitCameraScreen
                    onBottomButtonPressed={(event) => 
                        this.props.imageCaptured(this.props._id, event.captureImages[0].uri)
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

const mapStateToProps = (state) => {
    const _id = () => {
        return state.nav.routes[state.nav.routes.findIndex(c => c.routeName === 'CameraScreen')] !== undefined ? state.nav.routes[state.nav.routes.findIndex(c => c.routeName === 'CameraScreen')].params._id : ""
    }

    return {
        _id: _id(),
        nav: state.nav
    }
}


export default connect(mapStateToProps, {
    imageCaptured
})(CameraComponent)