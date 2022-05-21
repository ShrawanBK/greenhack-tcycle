import React from 'react';
import { Dimensions, Image, StyleSheet } from 'react-native';

import { Text, View } from '../components/Themed';

const { width } = Dimensions.get('window');

export default function NearByStoresScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Here are the stores near by to your location. Please feel free to reach us out.</Text>
            <Image
                style={{ width: width * 0.9, height: width * 1.2, }}
                source={require('../assets/images/nearby-stores.jpeg')}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    title: {
        padding: width * 0.1,
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 10,
    },
});
