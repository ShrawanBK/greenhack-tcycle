import React, { useCallback, useState } from 'react';
import { Image, StyleSheet, Dimensions, TextInput, ScrollView } from 'react-native';
import { Ionicons as Icon } from '@expo/vector-icons';

import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';
import { Text, View, Button } from '../components/Themed';
import Colors from '../constants/Colors';
import showToastMessage from '../utils/showToastMessage';
import colors from '../constants/Colors';

const { width, height } = Dimensions.get('window');

// NOTE - This will come from Backend
const deviceTypeOptions = [
    {
        label: 'Select Device Type',
        value: '',
    },
    {
        label: 'Laptop',
        value: 'Laptop',
    },
    {
        label: 'Television',
        value: 'Television',
    },
    {
        label: 'Mobile Phone',
        value: 'Mobile Phone',
    },
    {
        label: 'Power Bank',
        value: 'Power Bank',
    },
    {
        label: 'Tablets',
        value: 'Tablet',
    },
    {
        label: 'PCs',
        value: 'PCs',
    },
    {
        label: 'Routers',
        value: 'Routers',
    },
    {
        label: 'Chargers',
        value: 'Chargers',
    },
    {
        label: 'Set-Top Boxes',
        value: 'Set-Top Boxes',
    }
];

const deviceConditionOptions = [
    {
        label: 'Select Device Condition',
        value: '',
    },
    {
        label: 'Unused',
        value: 'Unused',
    },
    {
        label: 'Like New',
        value: 'Like New',
    },
    {
        label: 'Used',
        value: 'Used',
    },
    {
        label: 'Old',
        value: 'Old',
    },
    {
        label: 'Useless',
        value: 'Useless',
    },
]

export default function TabAddDeviceScreen() {
    const [focusedField, setFocusedField] = useState('');
    const [deviceName, setDeviceName] = useState<string>();
    const [deviceSize, setDeviceSize] = useState<string>();
    const [deviceType, setDeviceType] = useState();
    const [deviceCondition, setDeviceCondition] = useState();
    const [password, setPassword] = useState<string>();
    const [selectedImage, setSelectedImage] = React.useState(null);
    const openImagePickerAsync = async () => {
        // Ask the user for the permission to access the media library
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            alert("You've refused to allow this appp to access your photos!");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync();

        if (!result.cancelled) {
            setSelectedImage({ localUri: result.uri });
        }
    }

    const openCamera = async () => {
        // Ask the user for the permission to access the camera
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

        if (permissionResult.granted === false) {
            alert("You've refused to allow this appp to access your camera!");
            return;
        }

        const result = await ImagePicker.launchCameraAsync();

        if (!result.cancelled) {
            setSelectedImage({ localUri: result.uri });
        }
    }

    const onClearData = useCallback(() => {
        setDeviceType(undefined);
        setDeviceName(undefined);
        setDeviceSize(undefined);
        setDeviceType(undefined);
        setDeviceCondition(undefined);
        setSelectedImage(null);
    }, []);

    const clearButtonDisabled = !deviceType && !deviceName && !deviceSize && !deviceCondition && selectedImage === null;

    const submitButtonDisabled = !deviceType || !deviceName || !deviceSize || !deviceCondition || selectedImage === null;

    const onSubmitForm = useCallback(
        () => {
            setTimeout(() => {
                showToastMessage('Thank you for adding device. Our team will review it and contact you soon.');
            }, 1000);
            onClearData();
        }, [onClearData]);

    return (
        <ScrollView
            contentContainerStyle={{
                justifyContent: 'center',
                backgroundColor: '#fff',
                paddingVertical: 10,
                minHeight: '100%',
            }}
        >
            <View style={{
                marginHorizontal: width * 0.025,
                borderRadius: width * 0.02,
            }}>
                <View style={styles.page}>
                    <View
                        style={{
                            backgroundColor: colors.primary,
                            borderTopEndRadius: width * 0.02,
                            borderTopStartRadius: width * 0.02,
                            padding: 10,
                        }}>
                        <Text
                            style={{
                                fontSize: 18,
                                color: 'white',
                                textAlign: 'center',
                            }}
                        >
                            Enlist the unused devices you have and contribute towards saving the planet.
                        </Text>
                    </View>
                    <View
                        style={{
                            paddingVertical: height * 0.015,
                            paddingHorizontal: width * 0.025,
                        }}>
                        <View style={styles.formField}>
                            <Text
                                style={[
                                    styles.formTitle,
                                    focusedField === 'deviceType' ? { color: colors.primary } : {}
                                ]}
                            >
                                Device Type *
                            </Text>
                            <View style={{ borderColor: focusedField === 'deviceType' ? colors.primary : 'black', borderWidth: 1, borderRadius: 8, }}>
                                <Picker
                                    selectedValue={deviceType}
                                    onValueChange={(itemValue, itemIndex) =>
                                        setDeviceType(itemValue)
                                    }
                                >
                                    {deviceTypeOptions.map((item) => (
                                        <Picker.Item
                                            key={item.value}
                                            label={item.label}
                                            value={item.value}
                                        />
                                    ))}
                                </Picker>
                            </View>
                        </View>

                        <View style={styles.formField}>
                            <Text
                                style={[
                                    styles.formTitle,
                                    focusedField === 'deviceName' ? { color: colors.primary } : {}
                                ]}
                            >
                                Device Name *
                            </Text>
                            <TextInput
                                placeholder="Enter Device Name"
                                onFocus={() => setFocusedField('deviceName')}
                                onChangeText={(deviceNameValue) => setDeviceName(deviceNameValue)}
                                value={deviceName}
                                selectionColor="#6373db"
                                clearTextOnFocus={true}
                                style={[
                                    styles.formContent,
                                    focusedField === 'deviceName' ? { color: 'black' } : {},
                                ]}
                            />
                        </View>

                        <View style={styles.formField}>
                            <Text
                                style={[
                                    styles.formTitle,
                                    focusedField === 'deviceSize' ? { color: colors.primary } : {}
                                ]}
                            >
                                Device Size *
                            </Text>
                            <TextInput
                                placeholder="Enter Device Size"
                                onFocus={() => setFocusedField('deviceSize')}
                                onChangeText={(deviceSizeValue) => setDeviceSize(deviceSizeValue)}
                                value={deviceSize}
                                selectionColor="#6373db"
                                clearTextOnFocus={true}
                                style={[
                                    styles.formContent,
                                    focusedField === 'deviceSize' ? { color: 'black' } : {},
                                ]}
                            />
                        </View>

                        <View style={styles.formField}>
                            <Text
                                style={[
                                    styles.formTitle,
                                    focusedField === 'deviceSize' ? { color: colors.primary } : {}
                                ]}
                            >
                                Device Condition *
                            </Text>
                            <View style={{ borderColor: focusedField === 'deviceCondition' ? colors.primary : 'black', borderWidth: 1, borderRadius: 8, }}>
                                <Picker
                                    selectedValue={deviceCondition}
                                    onValueChange={(itemValue, itemIndex) =>
                                        setDeviceCondition(itemValue)
                                    }
                                >
                                    {deviceConditionOptions.map((item) => (
                                        <Picker.Item
                                            key={item.value}
                                            label={item.label}
                                            value={item.value}
                                        />
                                    ))}
                                </Picker>
                            </View>
                        </View>
                        <View style={styles.formField}>
                            <View style={{ display: 'flex', flexDirection: 'row' }}>
                                <Button
                                    onPress={openImagePickerAsync}
                                    style={{
                                        width: '50%',
                                        minHeight: 50,
                                        alignItems: 'center',
                                        borderColor: selectedImage !== null ? colors.primary : 'black',
                                        borderWidth: 1,
                                        backgroundColor: 'transparent',
                                        borderRadius: 8,
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'space-around',
                                        borderTopRightRadius: 0,
                                        borderBottomRightRadius: 0,
                                    }}
                                >
                                    <Text style={{ fontSize: 16, width: '80%' }}>
                                        Choose Photo
                                    </Text>
                                    <View style={{ width: 20 }}>
                                        <Icon
                                            name="image-outline"
                                            size={18}
                                        />
                                    </View>
                                </Button>
                                <Button
                                    onPress={openCamera}
                                    style={{
                                        width: '50%',
                                        minHeight: 50,
                                        alignItems: 'center',
                                        borderColor: selectedImage !== null ? colors.primary : 'black',
                                        borderWidth: 1,
                                        backgroundColor: 'transparent',
                                        borderRadius: 8,
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'space-around',
                                        borderTopLeftRadius: 0,
                                        borderBottomLeftRadius: 0,
                                        borderLeftWidth: 0,
                                    }}
                                >
                                    <Text style={{ fontSize: 16, width: '80%' }}>
                                        Take Photo
                                    </Text>
                                    <View style={{ width: 20 }}>
                                        <Icon
                                            name="camera-outline"
                                            size={18}
                                        />
                                    </View>
                                </Button>
                            </View>
                            {selectedImage !== null && (
                                <View style={{ backgroundColor: '#e8f7fc', paddingVertical: 16, width: '96%', alignSelf: 'center' }}>
                                    <Image
                                        source={{ uri: selectedImage !== null ? selectedImage.localUri : undefined }}
                                        style={{ width: 120, height: 120, alignSelf: 'center', }}
                                    />
                                </View>
                            )}
                        </View>
                        <Button
                            style={[styles.registerButton, {
                                backgroundColor: submitButtonDisabled ? '#dedede' : colors.primary,
                            }]}
                            onPress={onSubmitForm}
                            disabled={submitButtonDisabled}
                        >
                            <Text
                                style={{
                                    fontSize: 16,
                                    textAlign: 'center',
                                    fontWeight: '600',
                                    color: submitButtonDisabled ? '#000' : '#fff',
                                }}>
                                Submit
                            </Text>
                        </Button>
                        <Button
                            style={[styles.registerButton, {
                                backgroundColor: clearButtonDisabled ? '#dedede' : colors.dangerColor
                            }]}
                            onPress={onClearData}
                            disabled={clearButtonDisabled}
                        >
                            <Text
                                style={{
                                    fontSize: 16,
                                    textAlign: 'center',
                                    fontWeight: '600',
                                    color: clearButtonDisabled ? '#000' : '#fff',
                                }}>
                                Clear
                            </Text>
                        </Button>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 10,
    },
    separator: {
        marginVertical: 10,
        height: 1,
        width: '80%',
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        paddingVertical: 20,
        paddingHorizontal: 10,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: width * 0.9,
        height: height * 0.7,
        justifyContent: 'space-around',
    },

    dateText: {
        marginVertical: 15,
        textAlign: 'center',
        fontSize: 16,
    },

    timeSlotsContainer: {
        flexDirection: 'row',
        width: '80%',
        justifyContent: 'space-between',
    },

    timeSlot: {
        borderColor: Colors.lightPrimary,
        borderWidth: 1,
        paddingHorizontal: 8,
    },

    ticketCountContainer: {
        width: '80%',
        justifyContent: 'center'
    },

    ticketInput: {
        color: Colors.secondaryTextColor,
        fontSize: 16,
        borderBottomWidth: 0.25,
        borderBottomColor: '#3C4858',
        marginVertical: 10,
    },

    submitButton: {
        width: '40%',
        marginVertical: width * 0.02,
        padding: 8,
        borderRadius: width * 0.02,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
    },

    closeButtonText: {
        color: Colors.white,
        fontSize: 20,
        textAlign: 'center',
        fontWeight: '600',
    },

    refreshButton: {
        width: '45%',
        marginVertical: height * 0.01,
        borderRadius: width * 0.02,
        borderColor: Colors.primary,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        alignSelf: 'center',
        flexDirection: 'row',
    },
    cancelButton: {
        backgroundColor: Colors.dangerColor,
    },

    page: {
        backgroundColor: 'white',
        borderRadius: width * 0.02,
    },
    formTitle: {
        fontSize: 12,
        color: '#3C4858',
        marginBottom: 4,
        fontWeight: '600',
    },
    formContent: {
        color: colors.secondaryTextColor,
        fontSize: 16,
        borderBottomWidth: 0.25,
        borderBottomColor: '#3C4858',
        height: 40,
    },
    formField: {
        marginVertical: height * 0.02,
    },
    registerButton: {
        width: '40%',
        marginVertical: height * 0.01,
        padding: 8,
        borderRadius: width * 0.02,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
    },

    line: {
        borderBottomColor: colors.primary,
        borderBottomWidth: 2,
        width: width * 0.2,
    },
    orText: {
        color: colors.primary,
        width: width * 0.4,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    errorText: {
        color: 'red',
        fontSize: 12,
        marginVertical: 2,
    }
});
