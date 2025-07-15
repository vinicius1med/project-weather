import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import {
  useNavigation,
  CompositeNavigationProp,
  DrawerActions,
} from '@react-navigation/native';
import {
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import {
  DrawerNavigationProp,
} from '@react-navigation/drawer';
import Footer from './footer/Footer';
import { StackParamList, DrawerParamList, WeatherData } from '../App';
import { useTheme } from '../components/context/ThemeContext';
import { darkColors, lightColors } from '../components/ui/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createHistory } from '../components/utils/api';
import { SafeAreaView } from 'react-native-safe-area-context';
import Constants from 'expo-constants';

type WeatherScreenNavigationProp = CompositeNavigationProp<
  DrawerNavigationProp<DrawerParamList, 'MainStack'>,
  NativeStackNavigationProp<StackParamList, 'Weather'>
>;

const API_KEY = Constants.expoConfig?.extra?.OPENWEATHER_API_KEY;

export default function WeatherScreen() {
  const [city, setCity] = useState<string>('');
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string>('');
  const navigation = useNavigation<WeatherScreenNavigationProp>();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const fetchWeather = async () => {
    if (!city) return;
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      const data = await response.json();

      if (data.cod === 200) {
        setWeatherData(data);
        setError('');

        const userId = await AsyncStorage.getItem('userId');

        await createHistory(userId, {
          city: data.name,
          country: data.sys.country,
          weatherDescription: data.weather[0].description,
          weatherIcon: data.weather[0].icon,
          temperature: data.main.temp,
          windSpeed: data.wind.speed,
          lon: data.coord.lon,
          lat: data.coord.lat,
          date: new Date().toISOString(),
        });

      } else {
        setError('Cidade não encontrada');
        setWeatherData(null);
      }
    } catch (err) {
      setError('Erro ao buscar dados');
      setWeatherData(null);
    }
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          backgroundColor: isDark
            ? darkColors.background
            : lightColors.background,
        },
      ]}
      edges={['top', 'bottom']}
    >
      <View
        style={[
          styles.header,
          {
            borderColor: isDark ? darkColors.borders : lightColors.borders,
          },
        ]}
      >
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        >
          <Feather
            name="align-justify"
            size={24}
            color={isDark ? darkColors.primaryText : lightColors.primaryText}
          />
        </TouchableOpacity>

        <TextInput
          style={[
            styles.input,
            {
              color: isDark ? darkColors.primaryText : lightColors.primaryText,
              borderColor: isDark ? darkColors.borders : lightColors.borders,
            },
          ]}
          placeholder="Pesquisar cidade"
          placeholderTextColor={isDark ? '#aaa' : '#888'}
          value={city}
          onChangeText={setCity}
          onSubmitEditing={fetchWeather}
        />

        <TouchableOpacity
          style={[
            styles.searchButton,
            {
              backgroundColor: isDark
                ? darkColors.buttons
                : lightColors.buttons,
            },
          ]}
          onPress={fetchWeather}
        >
          <Text style={[styles.searchButtonText, { color: '#fff' }]}>
            Buscar
          </Text>
        </TouchableOpacity>
      </View>

      {weatherData && (
        <View style={styles.weatherContainer}>
          <Text
            style={[
              styles.cityName,
              {
                color: isDark
                  ? darkColors.primaryText
                  : lightColors.primaryText,
              },
            ]}
          >
            {weatherData.name}
          </Text>
          <Image
            style={styles.weatherIcon}
            source={{
              uri: `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`,
            }}
          />
          <Text
            style={[
              styles.temperature,
              {
                color: isDark
                  ? darkColors.primaryText
                  : lightColors.primaryText,
              },
            ]}
          >
            {Math.round(weatherData.main.temp)}°
          </Text>
          <Text
            style={[
              styles.description,
              {
                color: isDark
                  ? darkColors.primaryText
                  : lightColors.primaryText,
              },
            ]}
          >
            {weatherData.weather[0].description}
          </Text>

          <View style={styles.additionalInfo}>
            <Text
              style={[
                styles.info,
                {
                  color: isDark
                    ? darkColors.primaryText
                    : lightColors.primaryText,
                },
              ]}
            >
              <Text style={styles.label}>Vento:</Text> {weatherData.wind.speed}{' '}
              km/h
            </Text>
            <Text
              style={[
                styles.info,
                {
                  color: isDark
                    ? darkColors.primaryText
                    : lightColors.primaryText,
                },
              ]}
            >
              <Text style={styles.label}>Umidade:</Text>{' '}
              {weatherData.main.humidity}%
            </Text>
          </View>
        </View>
      )}

      <Footer
        customButton={{
          icon: (
            <Feather
              name="thermometer"
              size={24}
              color={isDark ? darkColors.primaryText : lightColors.primaryText}
            />
          ),
          label: '+Detalhes',
          onPress: () => {
            if (weatherData) {
              navigation.navigate('Details', { weatherData });
            } else {
              alert('Nenhum dado de clima carregado.');
            }
          },
        }}
      />

      {error !== '' && (
        <Text style={[styles.errorText, { color: 'red' }]}>{error}</Text>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 20,
  },
  header: {
    flexDirection: 'row',
    marginBottom: 30,
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
  },
  input: {
    flex: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 8,
    fontSize: 16,
    borderWidth: 1,
  },
  menuButton: {
    padding: 10,
    borderRadius: 10,
  },
  searchButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  searchButtonText: {
    fontWeight: 'bold',
  },
  weatherContainer: {
    padding: 25,
    borderRadius: 20,
    alignItems: 'center',
    width: '100%',
  },
  cityName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  weatherIcon: {
    width: 100,
    height: 100,
  },
  temperature: {
    fontSize: 48,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 18,
    marginBottom: 10,
    textTransform: 'capitalize',
  },
  additionalInfo: {
    marginTop: 20,
    alignItems: 'flex-start',
    width: '100%',
  },
  info: {
    fontSize: 16,
  },
  label: {
    fontWeight: 'bold',
  },
  errorText: {
    marginTop: 20,
  },
});
