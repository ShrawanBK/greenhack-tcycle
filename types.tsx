/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList { }
    }
}

interface artworkParams {
    artworkId: string;
}

export type RootStackParamList = {
    Home: undefined;
    Login: undefined;
    Logout: undefined;
    Register: undefined;
    Scan: undefined;
    Artwork: artworkParams;
    Root: NavigatorScreenParams<RootTabParamList> | undefined;
    Modal: undefined;
    NotFound: undefined;
    Nearby: undefined;
    Products: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
    RootStackParamList,
    Screen
>;

export type RootTabParamList = {
    TabYourDevices: undefined;
    TabAddDevice: undefined;
    NearBy: undefined;
    MyProfile: undefined;
    Products: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> = CompositeScreenProps<
    BottomTabScreenProps<RootTabParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
>;
