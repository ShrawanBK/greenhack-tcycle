import { Ionicons as Icon } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import React, { useContext, useState } from 'react';
import { Platform, StyleSheet, Image, Dimensions, ScrollView } from 'react-native';
import {
    LineChart,
} from 'react-native-chart-kit'
import { Picker } from '@react-native-picker/picker';

import { Text, View, Button } from '../components/Themed';
import Colors, { primaryColor } from '../constants/Colors';
import AuthContext from '../contexts/AuthContext';
import useColorScheme from '../hooks/useColorScheme';
import showToastMessage from '../utils/showToastMessage';

const { width, height } = Dimensions.get('window');
const monthlyData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [{
        data: [50, 20, 2, 86, 71, 100],
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})` // optional
    }, {
        data: [20, 10, 4, 56, 87, 90]
    }, {
        data: [30, 90, 67, 54, 10, 2]
    }]
}

const yearlyData = {
    labels: ['2020', '2021', '2022'],
    datasets: [{
        data: [500, 200, 122,],
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})` // optional
    }, {
        data: [120, 210, 94]
    }, {
        data: [230, 190, 467]
    }]
}

const calendarOptions = [
    {
        label: 'Monthly',
        value: 'monthly',
    },
    {
        label: 'Yearly',
        value: 'yearly'
    }
]

const chartConfig = {
    backgroundColor: 'red',
    backgroundGradientFrom: Colors.primary,
    backgroundGradientTo: Colors.light,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
};

export default function MyProfileScreen() {
    const {
        userData,
    } = useContext(AuthContext);
    const [calendarType, setCalendarType] = useState('monthly');

    if (!userData) {
        return null;
    }

    const colorScheme = useColorScheme();
    const colors = Colors[colorScheme];
    const imageUri = 'https://media-exp1.licdn.com/dms/image/C4D03AQG-5Y4PTAEaUA/profile-displayphoto-shrink_200_200/0/1644951674262?e=1653523200&v=beta&t=X4nibFgiOS-zNf12X69Q93N_Ef03VYanp4ObpGAG6lo';

    const earnedCredits = '136 pts';
    const savedCarbonEmission = '8 Kg(s) of CO2';
    const chartHeight = 200;

    const chartData = calendarType === 'yearly' ? yearlyData : monthlyData;
    // TODO - PUT GRAPHS FOR SAVINGS OR STH LIKE THAT
    return (
        <ScrollView>

            <View style={styles.container}>
                <Image
                    style={{ height: 120, width: 120, borderRadius: 60, marginBottom: 2, }}
                    source={{ uri: imageUri }}
                />
                <Text style={styles.title}>{userData.firstName} {userData.surName}</Text>
                <Button
                    onPress={() => showToastMessage('Edit profile pressed. You can edit your profile here')}
                    transparent
                >
                    <Text style={{
                        color: colors.primary,
                        textAlign: 'center',
                        textDecorationStyle: 'solid',
                        textDecorationLine: 'underline',
                    }}
                    >
                        Edit Profile
                    </Text>
                </Button>

                <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
                <View
                    style={[styles.contact, {
                        width: width * 0.94,
                    }]}>
                    <Text style={{
                        fontSize: 18,
                        fontWeight: 'bold',
                        marginBottom: 4,
                        textAlign: 'center',
                    }}>
                        Earned Credits - {earnedCredits}
                    </Text>
                    <Button
                        style={{ backgroundColor: '#fff' }}
                    >
                        <Text style={{
                            fontSize: 16, padding: 2,
                            textAlign: 'center',
                        }}>
                            Use this credit to benefit from us !
                        </Text>
                    </Button>
                </View>
                <View style={{
                    padding: 6,
                    borderRadius: width * 0.02,
                    marginVertical: 5,
                }}>
                    <View style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        borderColor: colors.primary,
                        borderBottomColor: 'transparent',
                        borderWidth: 2,
                    }}>
                        <Text style={{
                            fontSize: 18,
                            fontWeight: '600',
                            padding: 4,
                        }}>
                            Track your footprint
                        </Text>
                        <View style={{ width: '35%', borderBottomColor: 'black', borderBottomWidth: 2 }}>
                            <Picker
                                selectedValue={calendarType}
                                onValueChange={(itemValue, itemIndex) =>
                                    setCalendarType(itemValue)
                                }
                            >
                                {calendarOptions.map((item) => (
                                    <Picker.Item
                                        key={item.value}
                                        label={item.label}
                                        value={item.value}
                                    />
                                ))}
                            </Picker>
                        </View>
                    </View>
                    <LineChart
                        data={chartData}
                        width={width * 0.92}
                        height={chartHeight}
                        chartConfig={chartConfig}
                        bezier
                    />
                </View>
                <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '94%', marginVertical: 4, }}>
                    <View
                        style={styles.stats}>
                        <Text style={{
                            color: '#fff',
                            fontSize: 18,
                            textAlign: 'center',
                            fontWeight: '600',
                        }}>
                            Reduced Footprint {`\n${savedCarbonEmission}`}
                        </Text>
                        <Text style={{ color: '#fff', textAlign: 'center', fontSize: 14, marginVertical: 6 }}>
                            Thank you for doing good to the PLANET
                        </Text>
                        <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                                <Text style={{
                                    fontSize: 16,
                                    paddingHorizontal: 8,
                                    fontWeight: 'bold',
                                }}>
                                    LEVEL - 1
                                </Text>
                                <Button
                                    transparent
                                    onPress={() => showToastMessage('You know you about levels and your goals here')}
                                >
                                    <Icon
                                        name="information-circle-outline"
                                        size={16}
                                    />
                                </Button>
                            </View>
                            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                                <View style={{
                                    marginVertical: 10,
                                    height: 10,
                                    width: '68%',
                                }} lightColor={colors.primary} darkColor={colors.primary} />
                                <View style={{
                                    marginVertical: 10,
                                    height: 10,
                                    width: '28%',
                                }} lightColor="#ccc" darkColor="rgba(255,255,255,0.4)" />
                            </View>
                        </View>
                        <View style={{display: 'flex', flexDirection:'row', justifyContent: 'center', width: '100%'}}>
                            <Text style={{
                                fontSize: 16,
                                paddingVertical: 4,
                                textAlign: 'center',
                                width: '80%',
                            }}>
                                {`Congratulations for your progress 🎉 \n You only need to save 2Kg more CO2 to reach the next level. \n You will get extra 1000 credits bonus after you reach the next level.`}
                            </Text>
                        </View>
                    </View>
                </View>
                <View
                    style={[styles.contact, { width: '94%' }]}>
                    <Text style={{
                        fontSize: 18,
                        fontWeight: '600',
                        marginBottom: 4,
                    }}>
                        Mobile Phone
                    </Text>
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', width: '100%', paddingVertical: 6, }}>
                        <View style={{ width: 20 }}>
                            <Icon
                                name="call"
                                size={18}
                            />
                        </View>
                        <Text style={{ fontSize: 16, width: '80%' }}>
                            {`${userData.phonenumber}`}
                        </Text>
                    </View>
                </View>

                <View
                    style={[styles.contact, { width: '94%' }]}>
                    <Text style={{
                        fontSize: 18,
                        fontWeight: '600',
                        marginBottom: 4,
                    }}>
                        Email
                    </Text>
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', width: '100%', paddingVertical: 6, }}>
                        <View style={{ width: 20 }}>
                            <Icon
                                name="mail"
                                size={18}
                            />
                        </View>
                        <Text style={{ fontSize: 16, width: '80%' }}>
                            {`${userData.email}`}
                        </Text>
                    </View>
                </View>

                <View
                    style={[styles.contact, { width: '94%' }]}>
                    <Text style={{
                        fontSize: 18,
                        fontWeight: '600',
                        marginBottom: 4,
                    }}>
                        Address
                    </Text>
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', width: '100%', paddingVertical: 6, }}>
                        <View style={{ width: 20 }}>
                            <Icon
                                name="location"
                                size={18}
                            />
                        </View>
                        <Text style={{ fontSize: 16, width: '80%' }}>
                            {`${userData.location}`}
                        </Text>
                    </View>
                </View>
                {/* Use a light status bar on iOS to account for the black space above the modal */}
                <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 10,
        height: 1,
        width: '94%',
    },
    stats: {
        width: '100%',
        padding: 10,
        borderRadius: width * 0.02,
        backgroundColor: primaryColor,
    },
    contact: {
        padding: 6,
        borderRadius: width * 0.02,
        backgroundColor: '#caeec2',
        marginVertical: 5,
    }
});
