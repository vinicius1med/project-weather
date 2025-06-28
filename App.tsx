import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './components/LoginScreen';
import HomeScreen from './components/HomeScreen';
import WeatherScreen from './components/WeatherScreen';
import DetailScreen from './components/DetailScreen';
import HistoryScreen from './components/HistoryScreen';
import SettingsScreen from './components/SettingsScreen';
import CalendarScreen from './components/CalendarScreen';
import MenuDrawer from './components/menu/MenuDrawer';

export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Weather: undefined;
  History: undefined;
  Details: undefined;
  Calendar: undefined;
  Settings: undefined;
  MenuDrawer: undefined;
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
        <Stack.Screen name="History" component={HistoryScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="Calendar" component={CalendarScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Weather" component={WeatherScreen} />
        <Stack.Screen name="MenuDrawer" component={MenuDrawer} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
