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

export type DrawerParamList = {
  MainStack: undefined;
  Profile: undefined;
  About: undefined;
};

export type StackParamList = {
  Home: undefined;
  Login: undefined;
  Weather: undefined;
  History: undefined;
  Details: undefined;
  Calendar: undefined;
  Settings: undefined;
};

const Stack = createNativeStackNavigator<StackParamList>();
const Drawer = createDrawerNavigator<DrawerParamList>();

function MainStackNavigator() {
  return (
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
    </Stack.Navigator>
  );
}

function RootDrawerNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName="MainStack"
      screenOptions={{ headerShown: false }}
    >
      <Drawer.Screen name="MainStack" component={MainStackNavigator} options={{title: 'Menu'}}/>
      <Drawer.Screen name="Profile" component={ProfileScreen} />
      <Drawer.Screen name="About" component={AboutScreen} />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <RootDrawerNavigator />
    </NavigationContainer>
  );
}