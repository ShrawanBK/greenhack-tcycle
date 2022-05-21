import { useCallback, useContext, useEffect, useState } from 'react';
import { Dimensions, FlatList, RefreshControl, StyleSheet } from 'react-native';

import { Text, View, Button } from '../components/Themed';
import YourDeviceCard from '../components/YourDeviceCard';
import { ListedDevice } from '../typings';

import AuthContext from '../contexts/AuthContext';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import { yourDevicesData } from '../data/yourdevices';

const { width, height } = Dimensions.get('window');

export default function TabYourDevicesScreen() {
    const [yourDevices, setYourDevices] = useState<ListedDevice[]>();
    const { userData } = useContext(AuthContext);
    const [refreshing, setRefreshing] = useState(false);

    const getyourDevices = useCallback(() => {
            if (!userData?.userId) {
                return;
            }
            setRefreshing(true);
            setYourDevices(yourDevicesData);
            setRefreshing(false);
    }, [userData?.userId]);

    useEffect(() => {
        getyourDevices();
    }, []);

    return (
        <View style={styles.container}>
            <Button
                style={styles.refreshButton}
                onPress={getyourDevices}
                transparent
            >
                <Ionicons name="refresh" size={20} color={Colors.primary}/>
                <Text
                    style={{
                        color: Colors.primary,
                        fontSize: 16,
                        textAlign: 'center',
                        fontWeight: '600',
                    }}>
                    Refresh your data
                </Text>
            </Button>

            <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
            <FlatList
                data={yourDevices}
                keyExtractor={(item) => String(item.id)}
                renderItem={({ item }) => (
                    <YourDeviceCard
                        deviceDetail={item}
                    />
                )}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={getyourDevices}
                    />
                }
                ListEmptyComponent={<Text>No booking made yet</Text>}
            />
        </View>
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
        width: '100%',
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
});
