import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  ScrollView,
} from 'react-native';
import DatePicker from 'react-native-ui-datepicker';
import dayjs, { Dayjs } from 'dayjs';
import { useDefaultStyles } from 'react-native-ui-datepicker';
import { Feather } from '@expo/vector-icons';
import Footer from './footer/Footer';
import * as Location from 'expo-location';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { DrawerActions } from '@react-navigation/native';
import { useTheme } from '../components/context/ThemeContext';
import { darkColors, lightColors } from '../components/ui/colors';
import { SafeAreaView } from 'react-native-safe-area-context';

type RootStackParamList = {
  Weather: undefined;
};

type WeatherData = {
  date: string; // YYYY-MM-DD
  temp: number;
  description: string;
  icon: string;
  windSpeed: number;
  humidity: number;
};

const API_KEY = '6971acb58fdbe71863cbeabfcba1eb96';

export default function CalendarScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [date, setDate] = useState<Dayjs>(dayjs());
  const [cityName, setCityName] = useState<string>('');
  const defaultStyles = useDefaultStyles();
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorGetLocation, setErrorGetLocation] = useState<string | null>(null);
  const [errorFetchWeather, setErrorFetchWeather] = useState<string>('');
  const [forecastData, setForecastData] = useState<any[]>([]);
  const [weatherForSelectedDay, setWeatherForSelectedDay] = useState<WeatherData | null>(null);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  useEffect(() => {
    async function getCurrentLocation() {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorGetLocation('Permission to access location was denied');
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    }
    getCurrentLocation();
  }, []);

  const fetchForecast = async () => {
    if (!location) return;

    try {
      const { latitude, longitude } = location.coords;

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
      );
      const data = await response.json();

      if (data.cod === "200") {
        setForecastData(data.list);
        setErrorFetchWeather('');
        setCityName(data.city.name);
      } else {
        setErrorFetchWeather('Cidade não encontrada.');
        setForecastData([]);
      }
    } catch (err) {
      setErrorFetchWeather('Erro ao buscar dados');
      setForecastData([]);
    }
  };

  useEffect(() => {
    if (location) {
      fetchForecast();
    }
  }, [location]);

  useEffect(() => {
    if (forecastData.length === 0) {
      setWeatherForSelectedDay(null);
      return;
    }

    const selectedDateStr = date.format('YYYY-MM-DD');

    const forecastsOfDay = forecastData.filter(item =>
      item.dt_txt.startsWith(selectedDateStr)
    );

    if (forecastsOfDay.length === 0) {
      setWeatherForSelectedDay(null);
      return;
    }

    const noonForecast = forecastsOfDay.find(item => item.dt_txt.includes('12:00:00')) || forecastsOfDay[0];

    const simplified: WeatherData = {
      date: selectedDateStr,
      temp: noonForecast.main.temp,
      description: noonForecast.weather[0].description,
      icon: noonForecast.weather[0].icon,
      windSpeed: noonForecast.wind.speed,
      humidity: noonForecast.main.humidity,
    };

    setWeatherForSelectedDay(simplified);
  }, [date, forecastData]);

  const minDate = dayjs();
  const maxDate = dayjs().add(5, 'day');

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDark ? darkColors.background : lightColors.background }]} edges={['top', 'bottom']}>
      <View style={[styles.header, { borderBottomColor: isDark ? darkColors.borders : lightColors.borders }]}>
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        >
          <Feather name="align-justify" size={24} color={isDark ? darkColors.primaryText : lightColors.primaryText} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: isDark ? darkColors.primaryText : lightColors.primaryText }]}>Calendário</Text>
      </View>

      <ScrollView contentContainerStyle={[styles.scrollContainer, { backgroundColor: isDark ? darkColors.background : lightColors.background }]}>
        <DatePicker
          mode="single"
          date={date}
          onChange={({ date }) => {
            if (date) {
              setDate(dayjs(date));
            }
          }}
          style={[styles.datePickerContainer, { shadowColor: isDark ? darkColors.primaryText : lightColors.primaryText }, { backgroundColor: darkColors.primaryText }]}
          minDate={minDate.toDate()}
          maxDate={maxDate.toDate()}
          styles={{
            ...defaultStyles,
            selected: isDark
              ? { backgroundColor: darkColors.buttons }
              : { backgroundColor: lightColors.buttons },
            selected_label: isDark
              ? { color: 'white' }
              : defaultStyles.selected_label,
          }}
        />

        {errorGetLocation && (
          <Text style={{ color: 'red', marginTop: 10 }}>
            {errorGetLocation}
          </Text>
        )}

        {errorFetchWeather && (
          <Text style={{ color: 'red', marginTop: 10 }}>
            {errorFetchWeather}
          </Text>
        )}

        {weatherForSelectedDay ? (
          <View style={styles.weatherContainer}>
            <Text style={[styles.cityName, { color: isDark ? darkColors.primaryText : lightColors.primaryText }]}>{`Previsão para ${cityName} em ${date.format('DD/MM/YYYY')}`}</Text>
            <Image
              style={styles.weatherIcon}
              source={{
                uri: `https://openweathermap.org/img/wn/${weatherForSelectedDay.icon}@2x.png`,
              }}
            />
            <Text style={[styles.temperature, { color: isDark ? darkColors.primaryText : lightColors.primaryText }]}>
              {Math.round(weatherForSelectedDay.temp)}°
            </Text>
            <Text style={[styles.description, { color: isDark ? darkColors.primaryText : lightColors.primaryText }]}>
              {weatherForSelectedDay.description}
            </Text>
            <View style={styles.additionalInfo}>
              <Text style={[styles.info, { color: isDark ? darkColors.primaryText : lightColors.primaryText }]}>
                <Text style={styles.label}>Vento:</Text>{' '}
                {weatherForSelectedDay.windSpeed} km/h
              </Text>
              <Text style={[styles.info, { color: isDark ? darkColors.primaryText : lightColors.primaryText }]}>
                <Text style={styles.label}>Umidade:</Text>{' '}
                {weatherForSelectedDay.humidity}%
              </Text>
            </View>
          </View>
        ) : (
          <Text style={{ marginTop: 20, color: isDark ? darkColors.primaryText : lightColors.primaryText }}>
            Previsão indisponível para essa data.
          </Text>
        )}
      </ScrollView>

      <Footer
        customButton={{
          icon: (
            <Feather
              name="cloud"
              size={24}
              color={isDark ? darkColors.primaryText : lightColors.primaryText}
            />
          ),
          label: 'Clima',
          onPress: () => navigation.navigate('Weather'),
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    paddingTop: 20,
  },
  header: {
    width: '100%',  
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  menuButton: {
    padding: 10,
    borderRadius: 10,
    shadowColor: '#000',
  },
  datePickerContainer: {
    width: 320,
    borderRadius: 12,
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  weatherContainer: {
    padding: 30,
    paddingBottom: 180,
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
});
