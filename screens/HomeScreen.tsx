import { Dimensions, StyleSheet, Image } from 'react-native';

const { height } = Dimensions.get('window');

import { Button, Text, View } from '../components/Themed';
import Colors from '../constants/Colors';
import showToastMessage from '../utils/showToastMessage';

export default function HomeScreen(props: any) {
    const {
        navigation,
    } = props;
    return (
        <View style={styles.container}>
            <View style={{ alignItems: 'center', width: '100%' }}>
                <Image
                    style={{ width: height * 0.25, height: height * 0.25, }}
                    source={require('../assets/images/logo.png')}
                />
                <Text style={[styles.title, { width: '70%' }]}>
                    GIVE US YOUR UNUSED OLD ELECTRONICS
                </Text>
                <Text style={{ width: '75%', textAlign: 'center', fontSize: 18, marginVertical: 4, }}>
                    like mobile phones, tablets, PCs, television, etc. and contribute to
                </Text>
                <Text style={{ width: '70%', textAlign: 'center', fontSize: 22, fontWeight: 'bold' }}>
                    SAVE THE PLANET.
                </Text>
            </View>
            <View style={{ width: '100%' }}>
                <Button
                    onPress={() =>
                        navigation.navigate({ name: 'Login' })
                    }
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>
                        Log In
                    </Text>
                </Button>
                <Button
                    onPress={() =>
                        navigation.navigate({ name: 'Register' })
                    }
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>
                        Register
                    </Text>
                </Button>
                <Button
                    style={styles.button}
                    onPress={() => showToastMessage('This shows details of our company.')}
                >
                    <Text style={styles.buttonText}>
                        About Us
                    </Text>
                </Button>
                <Button
                    style={styles.button}
                    onPress={() => showToastMessage('This shows policies of our company and application.')}
                >
                    <Text style={styles.buttonText}>
                        Our Policies
                    </Text>
                </Button>
                <Button
                    onPress={() =>
                        navigation.navigate({ name: 'Nearby' })
                    }
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>
                        Near by Stores
                    </Text>
                </Button>
                <Button
                    style={styles.button}
                    onPress={() => showToastMessage('This shows eco-friendly tips to save the planet.')}
                >
                    <Text style={styles.buttonText}>
                        Eco-friendly Tips
                    </Text>
                </Button>
            </View>
            <View style={{ width: '100%', flexDirection: 'row', display: 'flex', justifyContent: 'space-around' }}>
                <Image
                    style={{ width: '40%', height: 36, backgroundColor: 'black', marginTop: 20, }}
                    source={{
                        uri: 'https://greenhack.eu/wp-content/uploads/2021/02/Logo_PNG_wht-1-1024x246.png',
                    }}
                />
                <Image
                    style={{ width: '40%', backgroundColor: 'black', marginTop: 20, }}
                    source={{
                        uri: 'https://www.t-mobile.com/news/_admin/uploads/2020/06/T-Mobile_New_Logo_Primary_RGB_M-on-W.jpg',
                    }}
                />
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingVertical: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    button: {
        width: '90%',
        marginVertical: height * 0.01,
        padding: 4,
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
    },
    buttonText: {
        color: Colors.white,
        marginVertical: height * 0.01,
        fontSize: 16,
    },
});
