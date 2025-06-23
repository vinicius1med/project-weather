import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './components/FormInput';
import HomeScreen from './components/HomeScreen';
import WeatherScreen from './components/WeatherScreen';

export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  WeatherScreen: undefined;
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
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="WeatherScreen" component={WeatherScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
