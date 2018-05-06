import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';

class LineListItem extends React.PureComponent {

    resolveCheckMark() {
        if (this.props.isCompleted) {
            return <Image style={styles.image} source={require('../../images/check-mark.png')} is />
        }
    }
    
    render() {
        return (
            <TouchableOpacity onPress={() => this.props.onPress(this.props._id)} style={styles.container}>
                <Text style={styles.styleBold}>{this.props.name}</Text>
                <Text style={styles.style}>{this.props.cell}</Text>
                {this.resolveCheckMark()}
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
    },
    image: {
        width: 30,
        height: 30,
        flex: 1,
        resizeMode: 'contain',
        marginRight: 80,
        marginTop: 20
    }
})

export default LineListItem