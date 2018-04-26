import React from 'react';
import { StyleSheet, Text, View, Image, Button, TouchableOpacity } from 'react-native';
import uuid from 'uuid/v4'

class MediaFieldItem extends React.PureComponent {
    render() {

        console.log('value inside cell is ', this.props.value)

        return (
            <View style={{width: '100%', height: 340}}>
                <Image
                key={uuid()}
                style={{width: '100%', height: 300}}
                resizeMode='cover'
                source={{ uri: 'file://' + this.props.value, isStatic: true }}/>
                <Button title={'Удалить'}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    style: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 20,
        paddingBottom: 20,
        fontSize: 19,
        marginLeft: "14%"
    },
    styleBold: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 20,
        paddingBottom: 20,
        fontSize: 19,
        fontWeight: 'bold',
        marginLeft: "14%"
    }
})

export default MediaFieldItem