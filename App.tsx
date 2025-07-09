import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import LoginScreen from './components/LoginScreen';
import HomeScreen from './components/HomeScreen';
import WeatherScreen from './components/WeatherScreen';
import DetailScreen from './components/DetailScreen';
import HistoryScreen from './components/HistoryScreen';
import SettingsScreen from './components/SettingsScreen';
import CalendarScreen from './components/CalendarScreen';
import ProfileScreen from './components/ProfileScreen';
import AboutScreen from './components/AboutScreen';

export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Weather: undefined;
  History: undefined;
  Details: undefined;
  Calendar: undefined;
  Settings: undefined;
  MainDrawer: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailScreen} />
        <Stack.Screen name="Weather" component={WeatherScreen} />
        <Stack.Screen name="History" component={HistoryScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="Calendar" component={CalendarScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="MainDrawer" component={MainDrawer} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const Drawer = createDrawerNavigator();

function MainDrawer() {
  return (
    <Drawer.Navigator initialRouteName="Weather" screenOptions={{ headerShown: false }}>
      <Drawer.Screen name="Weather" component={WeatherScreen} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
      <Drawer.Screen name="Details" component={DetailScreen} />
      <Drawer.Screen name="History" component={HistoryScreen} />
      <Drawer.Screen name="About" component={AboutScreen} />
      <Drawer.Screen name="Calendar" component={CalendarScreen} />
    </Drawer.Navigator>
  );
}