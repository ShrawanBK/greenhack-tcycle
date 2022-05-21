/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import { LinkingOptions } from '@react-navigation/native';
import * as Linking from 'expo-linking';

import { RootStackParamList } from '../types';

const linking: LinkingOptions<RootStackParamList> = {
    prefixes: [Linking.makeUrl('/')],
    config: {
        screens: {
            Root: {
                screens: {
                    TabYourDevices: {
                        screens: {
                            TabYourDevicesScreen: 'yourtickets',
                        },
                    },
                    TabAddDevice: {
                        screens: {
                            TabAddDeviceScreen: 'booktickets',
                        },
                    },
                    NearBy: {
                        screens: {
                            NearByStoresScreen: 'nearby',
                        },
                    },
                },
            },
            Home: 'home',
            Register: 'register',
            Artwork: 'artwork',
            Login: 'login',
            Logout: 'logout',
            Scan: 'scan',
            Modal: 'modal',
            NotFound: '*',
            Nearby: 'nearby',
            Products: 'products',
        },
    },
};

export default linking;
