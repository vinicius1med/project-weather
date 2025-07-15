import 'react-native-gesture-handler';
import { Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import LoginScreen from './components/LoginScreen';
import RegisterScreen from './components/RegisterScreen';
import HomeScreen from './components/HomeScreen';
import WeatherScreen from './components/WeatherScreen';
import DetailScreen from './components/DetailScreen';
import HistoryScreen from './components/HistoryScreen';
import SettingsScreen from './components/SettingsScreen';
import CalendarScreen from './components/CalendarScreen';
import ProfileScreen from './components/ProfileScreen';
import AboutScreen from './components/AboutScreen';
import { ThemeProvider, useTheme } from './components/context/ThemeContext';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { darkColors, lightColors } from './components/ui/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, CommonActions } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type WeatherData = {
  name: string;
  weather: { description: string; icon: string }[];
  main: { temp: number; humidity: number; pressure: number };
  wind: { speed: number };
  cod: number;
  sys: { country: string; sunrise: number; sunset: number };
  coord: { lon: number; lat: number };
};

export type DrawerParamList = {
  MainStack: { screen: keyof StackParamList } | undefined;
  Profile: undefined;
  About: undefined;
};

export type StackParamList = {
  Home: undefined;
  Login: undefined;
  Register: undefined;
  Weather: undefined;
  History: undefined;
  Details: { weatherData: WeatherData };
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
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
}

function CustomDrawerContent(props: any) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();

  const handleLogout = () => {
    Alert.alert(
      'Confirmar logout',
      'Tem certeza que deseja sair da conta?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Sair',
          style: 'destructive',
          onPress: async () => {
            try {
              await AsyncStorage.removeItem('userId');
              await AsyncStorage.removeItem('userName');

              props.navigation.closeDrawer();

              navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [{ name: 'Login' }],
                })
              );
            } catch (error) {
              console.error('Erro ao fazer logout:', error);
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <DrawerContentScrollView
      {...props}
      style={{ backgroundColor: isDark ? darkColors.background : lightColors.background }}
      contentContainerStyle={{ flex: 1 }}
    >
      <DrawerItemList
        {...props}
        labelStyle={{ color: isDark ? darkColors.primaryText : lightColors.primaryText }}
        activeTintColor={isDark ? darkColors.buttons : lightColors.buttons}
        inactiveTintColor={isDark ? darkColors.primaryText : lightColors.primaryText}
      />

      <DrawerItem
        label="Logout"
        labelStyle={{
          color: 'red',
          fontWeight: 'bold',
        }}
        onPress={handleLogout}
      />
    </DrawerContentScrollView>
  );
}

function RootDrawerNavigator() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <Drawer.Navigator
      initialRouteName="MainStack"
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: isDark ? darkColors.background : lightColors.background,
        },
        drawerActiveTintColor: isDark ? darkColors.buttons : lightColors.buttons,
        drawerInactiveTintColor: isDark ? darkColors.primaryText : lightColors.primaryText,
        drawerLabelStyle: {
          fontWeight: 'bold',
        },
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="MainStack" component={MainStackNavigator} options={{ title: 'Menu' }} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
      <Drawer.Screen name="About" component={AboutScreen} />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <SafeAreaProvider>
        <NavigationContainer>
          <RootDrawerNavigator />
        </NavigationContainer>
      </SafeAreaProvider>
    </ThemeProvider>
  );
}
