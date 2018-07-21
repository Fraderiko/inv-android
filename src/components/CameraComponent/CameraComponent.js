import React, { Component } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { CameraKitCameraScreen } from 'react-native-camera-kit'
import { imageCaptured, barcodeSubmited, goBack } from '../../actions/LineActions'
import { connect } from 'react-redux';

class CameraComponent extends Component {

    componentWillMount() {
        const { goBack } = this.props
        this.props.navigation.setParams({ goBack });
    }

    isTask() {
        if (Object.getOwnPropertyNames(this.props.task).length !== 0) {
            return true
        }
        return false
    }

    onReadCode(event) {

        const { isBarcode, _id, barcodeSubmited } = this.props

        const code = event.nativeEvent.codeStringValue

        if (this.props.isBarcode) {
            barcodeSubmited(code, _id)
            Alert.alert("Найден код: " + code + "")
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <CameraKitCameraScreen
                    onBottomButtonPressed={(event) =>
                        this.props.imageCaptured(this.props._id, event.captureImages[0].uri, this.isTask())
                    }
                    showFrame={false}
                    scanBarcode={true}
                    onReadCode={(event) => this.onReadCode(event)}
                    hideControls={false}
                    captureButtonImage={this.props.isBarcode === true ? null : require('../../images/capture_image_button.png')}
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

    const componentIsVisible = () => {
        return state.nav.routes[state.nav.routes.findIndex(c => c.routeName === 'CameraScreen')] !== undefined ? true : false
    }

    const _id = () => {
        return componentIsVisible() ? state.nav.routes[state.nav.routes.findIndex(c => c.routeName === 'CameraScreen')].params._id : ""
    }

    return {
        isBarcode: componentIsVisible() ? state.nav.routes[state.nav.routes.findIndex(c => c.routeName === 'CameraScreen')].params.isBarcode : false,
        _id: _id(),
        nav: state.nav,
        task: state.tasks.currentTask
    }
}


export default connect(mapStateToProps, {
    imageCaptured,
    barcodeSubmited,
    goBack
})(CameraComponent)