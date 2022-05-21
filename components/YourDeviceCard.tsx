import React, { useCallback, useState } from 'react';

import {
    View,
    Dimensions,
    StyleSheet,
    Image} from 'react-native';
import { ListedDevice } from '../typings';
import { Button, Text } from './Themed';

import Colors from '../constants/Colors';
import showToastMessage from '../utils/showToastMessage';
import useColorScheme from '../hooks/useColorScheme';
const { height, width } = Dimensions.get('screen');

interface YourDeviceCardProps {
    deviceDetail: ListedDevice;
}
const YourDeviceCard = (props: YourDeviceCardProps) => {
    const colorScheme = useColorScheme();
    const colors = Colors[colorScheme];
    const {
        deviceDetail,
    } = props;

    const {
        id,
        name,
        price,
        description,
        image,
        status,
        creditPoints,
        reducibleFootprint,
        date,
        condition,
    } = deviceDetail;

    // TODO - Remove unnecessary code
    // TODO - Add filter by status, device type
    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', height: 'auto' }}>
                <View style={{ flexDirection: 'row', height: '100%' }}>
                    <View style={{ width: '70%' }}>
                        <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                            <Text
                                style={{
                                    color: Colors.black,
                                    fontWeight: 'bold',
                                    fontSize: 18,
                                }}>
                                {name}
                            </Text>
                            <Text
                                style={{
                                    color: Colors.black,
                                    fontSize: 16,
                                }}>
                                {` - ${date}`}
                            </Text>
                        </View>
                        <Text
                            style={{
                                color: Colors.black,
                                fontSize: 16,
                            }}>
                            Condition - {condition}
                        </Text>
                        <Text
                            style={{
                                color: Colors.primary,
                                fontSize: 16,
                            }}>
                            Estimated Price - EUR {price}
                        </Text>
                        <Text
                            style={{
                                color: Colors.primary,
                                fontSize: 16,
                            }}>
                            Credit Points - {creditPoints} pts
                        </Text>
                        <Text
                            style={{
                                color: Colors.primary,
                                fontSize: 16,
                            }}>
                            Reducible Footprints - {reducibleFootprint} Kg CO2
                        </Text>
                        <Text
                            style={{
                                fontSize: 16,
                            }}>
                            {description}
                        </Text>
                    </View>
                    <View style={{ width: '30%' }}>
                        <Image
                            style={{ width: '100%', minHeight: 120, marginBottom: 5 }}
                            source={{
                                uri: image,
                            }}
                            resizeMode="stretch"
                        />
                        {(status === 'approved' || status === 'collected') && (
                            <Text
                                style={[
                                    {
                                        color: colors.background,
                                        backgroundColor: colors.primary,
                                        textAlign: 'center',
                                        width: '100%',
                                    },
                                    styles.statusMessage,
                                ]}
                            >
                                {status}
                            </Text>
                        )}
                        {status === 'pending' && (
                            <Text
                                style={[
                                    {
                                        color: colors.background,
                                        backgroundColor: colors.pendingColor,
                                        textAlign: 'center',
                                        width: '100%',
                                    },
                                    styles.statusMessage,
                                ]}
                            >
                                {status}
                            </Text>
                        )}
                        {status === 'rejected' && (
                            <Text
                                style={[
                                    {
                                        color: colors.background,
                                        backgroundColor: colors.dangerColor,
                                        textAlign: 'center',
                                        width: '100%',
                                    },
                                    styles.statusMessage,
                                ]}
                            >
                                {status}
                            </Text>
                        )}
                    </View>

                </View>
            </View>
            <View>
                {status === 'pending' && (
                    <View style={styles.buttonContainer}>
                        <Button
                            onPress={
                                () => showToastMessage('This action allows user to cancel the device which are still pending')
                            }
                            style={[styles.button, styles.cancelButton]}
                        >
                            <Text style={{
                                color: Colors.white,
                                textAlign: 'center',
                                margin: width * 0.005,
                            }}
                            >
                                Cancel Listing
                            </Text>
                        </Button>
                        <Button
                            onPress={
                                () => showToastMessage('This action allows user to edit the listed device.')
                            }
                            style={styles.button}
                        >
                            <Text style={{
                                color: Colors.white,
                                textAlign: 'center',
                                padding: width * 0.005,
                            }}
                            >
                                Edit Listing
                            </Text>
                        </Button>
                    </View>
                )}

            </View>
        </View>
    )
};


export default YourDeviceCard;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-between',
        borderRadius: 8,
        marginVertical: height * 0.01,
        borderColor: Colors.primary,
        borderWidth: 2,
        width: width * 0.95,
        padding: width * 0.02,
    },
    buttonContainer: {
        flexDirection: 'row',
        marginTop: width * 0.01,
        justifyContent: 'space-between',
    },
    button: {
        width: '45%',
        borderRadius: width * 0.02,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
    },
    cancelButton: {
        backgroundColor: Colors.dangerColor,
    },

    modalContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: width * 0.94,
        height: height * 0.8,
        justifyContent: 'space-around',
    },

    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },

    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },

    submitButton: {
        width: '100%',
        marginVertical: height * 0.01,
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

    statusMessage: {
        paddingVertical: width * 0.01,
        paddingHorizontal: width * 0.03,
        borderRadius: width * 0.02,
        alignSelf: 'flex-end',
    }
});
