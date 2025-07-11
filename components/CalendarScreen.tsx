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

type RootStackParamList = {
  Weather: undefined;
};

type WeatherData = {
  name: string;
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
  const defaultStyles = useDefaultStyles();
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorGetLocation, setErrorGetLocation] = useState<string | null>(null);
  const [errorFetchWeather, setErrorFetchWeather] = useState<string>('');
  const [forecastData, setForecastData] = useState<any[]>([]);
  const [weatherForSelectedDay, setWeatherForSelectedDay] = useState<WeatherData | null>(null);

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
      name: noonForecast.name,
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
    <View style={styles.container}>
      {/* HEADER FIXO */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        >
          <Feather name="align-justify" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>Calendário</Text>
      </View>

      {/* CONTEÚDO ROLÁVEL */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <DatePicker
          mode="single"
          date={date}
          onChange={({ date }) => {
            if (date) {
              setDate(dayjs(date));
            }
          }}
          style={styles.datePickerContainer}
          minDate={minDate.toDate()}
          maxDate={maxDate.toDate()}
          styles={{
            ...defaultStyles,
            today: { borderColor: 'blue', borderWidth: 1 },
            selected: { backgroundColor: 'blue' },
            selected_label: { color: 'white' },
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
            <Text style={styles.cityName}>{weatherForSelectedDay.name}</Text>
            <Text style={styles.cityName}>{`Previsão para ${date.format(
              'DD/MM/YYYY',
            )}`}</Text>
            <Image
              style={styles.weatherIcon}
              source={{
                uri: `https://openweathermap.org/img/wn/${weatherForSelectedDay.icon}@2x.png`,
              }}
            />
            <Text style={styles.temperature}>
              {Math.round(weatherForSelectedDay.temp)}°
            </Text>
            <Text style={styles.description}>
              {weatherForSelectedDay.description}
            </Text>
            <View style={styles.additionalInfo}>
              <Text style={styles.info}>
                <Text style={styles.label}>Vento:</Text>{' '}
                {weatherForSelectedDay.windSpeed} km/h
              </Text>
              <Text style={styles.info}>
                <Text style={styles.label}>Umidade:</Text>{' '}
                {weatherForSelectedDay.humidity}%
              </Text>
            </View>
          </View>
        ) : (
          <Text style={{ marginTop: 20 }}>
            Previsão indisponível para essa data.
          </Text>
        )}
      </ScrollView>

      {/* FOOTER FIXO */}
      <Footer
        customButton={{
          icon: <Feather name="cloud" size={24} color="black" />,
          label: 'Clima',
          onPress: () => navigation.navigate('Weather'),
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#fff',
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
    borderColor: '#ccc',
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
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  weatherContainer: {
    padding: 30,
    paddingBottom: 180, // espaco extra p o footer n cobrir as infos
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
    color: '#333',
  },
  description: {
    fontSize: 18,
    color: '#666',
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
    color: '#333',
  },
  label: {
    fontWeight: 'bold',
  },
});
