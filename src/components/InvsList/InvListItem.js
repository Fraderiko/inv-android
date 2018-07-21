import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const InvListItem = (props) => {

    const style = props => {
        if (props.number !== undefined) {
            if (props.number === 1) {
                return {
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    backgroundColor: 'yellow'
                }
            } else {
                return {
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    backgroundColor: 'orange'
                }
            }
        } else {
            return styles.container
        }
    }

    return (
        <TouchableOpacity onPress={() => props.onPress(props._id)}>
            <View style={style(props)}>
            <Text style={styles.style}>{props.name}</Text>
            <Text style={styles.styleBold}>{props.counted}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'white'
    },
    style: {
        flex: 1,
        width: '100%',
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