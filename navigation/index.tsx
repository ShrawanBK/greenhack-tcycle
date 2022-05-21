/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { useContext } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName, Pressable } from 'react-native';

import Colors from '../constants/Colors';
import AuthContext from '../contexts/AuthContext';
import useColorScheme from '../hooks/useColorScheme';
import MyProfileScreen from '../screens/MyProfileScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import TabYourDevicesScreen from '../screens/TabYourDevicesScreen';
import TabAddDeviceScreen from '../screens/TabAddDeviceScreen';
import LogInScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';

import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import { View } from '../components/Themed';
import { Logout } from '../components/Logout';
import NearByStoresScreen from '../screens/NearByStores';
import ProductsScreen from '../screens/ProductsScreen';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
    return (
        <NavigationContainer
            linking={LinkingConfiguration}
            theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <RootNavigator />
        </NavigationContainer>
    );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
    const {
        authenticated,
        setAuthenticated,
        userData,
        setUserData,
    } = useContext(AuthContext);

    // useEffect(() => {
    //     setAuthenticated(true);
    //     setUserData({
    //         userId: 'user1',
    //         firstName: 'Test',
    //         surName: 'User',
    //         phonenumber: '+358-41xxx112',
    //         location: '101, test location',
    //         email: 'test@user.com',
    //     });
    // }, []);
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Login" component={LogInScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Root" component={authenticated ? BottomTabNavigator : HomeScreen} options={{ headerShown: false }} />
            {/* <Stack.Screen name="Scan" component={ArtBottomTabNavigator} options={{ title: 'Artworks' }} /> */}
            <Stack.Screen name="Nearby" component={NearByStoresScreen} options={{ title: 'Nearby Stores' }} />
            <Stack.Screen name="Products" component={ProductsScreen} options={{ title: 'Special Offers' }} />
            <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
            {/* <Stack.Screen name="Modal" component={MyProfileScreen} /> */}
            <Stack.Screen name="Logout" component={Logout} />
        </Stack.Navigator>
    );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
    const colorScheme = useColorScheme();
    const {
        authenticated
    } = useContext(AuthContext);

    if (!authenticated) {
        return null;
    }

    return (
        <BottomTab.Navigator
            initialRouteName="TabAddDevice"
            screenOptions={{
                tabBarActiveTintColor: Colors[colorScheme].tint,
            }}>
            <BottomTab.Screen
                name="TabYourDevices"
                component={TabYourDevicesScreen}
                options={({ navigation }: RootTabScreenProps<'TabYourDevices'>) => ({
                    title: 'Your Devices',
                    tabBarIcon: ({ color }) => <TabBarIcon name="laptop" color={color} />,
                    headerRight: () => <Logout />,
                })}
            />
            <BottomTab.Screen
                name="NearBy"
                component={NearByStoresScreen}
                options={{
                    title: 'Near By Stores',
                    headerTitleStyle: { marginTop: 10 },
                    tabBarIcon: ({ color }) => <TabBarIcon name="location-arrow" color={color} />,
                    headerRight: () => <Logout />,
                }}
            />
            <BottomTab.Screen
                name="TabAddDevice"
                component={TabAddDeviceScreen}
                options={({ navigation }: RootTabScreenProps<'TabAddDevice'>) => ({
                    title: 'Add Device',
                    tabBarIcon: ({ color }) => <TabBarIcon name="plus-circle" color={color} />,
                    headerRight: () => <Logout />,
                })}
            />
            <BottomTab.Screen
                name="Products"
                component={ProductsScreen}
                options={() => ({
                    title: 'Special Offers',
                    tabBarIcon: ({ color }) => <TabBarIcon name="tag" color={color} />,
                    headerRight: () => <Logout />,
                })}
            />
            <BottomTab.Screen
                name="MyProfile"
                component={MyProfileScreen}
                options={{
                    title: 'My Profile',
                    headerTitleStyle: { marginTop: 10 },
                    tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
                    headerRight: () => <Logout />,
                }}
            />
        </BottomTab.Navigator>
    );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
    name: React.ComponentProps<typeof FontAwesome>['name'];
    color: string;
}) {
    return <FontAwesome size={24} style={{ marginBottom: -3 }} {...props} />;
}
