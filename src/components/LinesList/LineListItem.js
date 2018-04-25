import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const LineListItem = (props) => {
    return (
        <TouchableOpacity style={styles.container}>
            <Text style={styles.styleBold}>{props.name}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
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

export default LineListItem