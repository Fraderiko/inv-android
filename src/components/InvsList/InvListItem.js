import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const InvListItem = (props) => {
    return (
        <TouchableOpacity onPress={() => props.onPress(props._id)} style={styles.container}>
            <Text style={styles.style}>{props.name}</Text>
            <Text style={styles.styleBold}>{props.counted}</Text>
        </TouchableOpacity>
    )
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

export default InvListItem