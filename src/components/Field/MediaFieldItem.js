import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

class MediaFieldItem extends React.PureComponent {
    
    render() {
        return (
            <TouchableOpacity onPress={() => this.props.onPress(this.props._id)} style={styles.container}>
                <Text style={styles.styleBold}>{this.props.name}</Text>
            </TouchableOpacity>
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