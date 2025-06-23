import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';

type WeatherData = {
  name: string;
  weather: { description: string; icon: string }[];
  main: { temp: number; humidity: number };
  wind: { speed: number };
  cod: number;
};

const API_KEY = '6971acb58fdbe71863cbeabfcba1eb96';

export default function WeatherScreen() {
  const [city, setCity] = useState<string>('');
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string>('');

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
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TextInput
          style={styles.input}
          placeholder="Pesquisar cidade"
          placeholderTextColor="#888"
          value={city}
          onChangeText={(text) => setCity(text)}
          onSubmitEditing={fetchWeather}
        />
        <TouchableOpacity style={styles.searchButton} onPress={fetchWeather}>
          <Text style={styles.searchButtonText}>Buscar</Text>
        </TouchableOpacity>
      </View>

      {/* Weather Data */}
      {weatherData && (
        <View style={styles.weatherContainer}>
          <Text style={styles.cityName}>{weatherData.name}</Text>
          <Image
            style={styles.weatherIcon}
            source={{
              uri: `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`,
            }}
          />
          <Text style={styles.temperature}>
            {Math.round(weatherData.main.temp)}°
          </Text>
          <Text style={styles.description}>
            {weatherData.weather[0].description}
          </Text>
          <Text style={styles.info}>
            <Text style={styles.label}>Vento:</Text> {weatherData.wind.speed} km/h
          </Text>
          <Text style={styles.info}>
            <Text style={styles.label}>Umidade:</Text> {weatherData.main.humidity}%
          </Text>
        </View>
      )}

      {/* Error */}
      {error !== '' && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F9FC',
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    marginBottom: 30,
    alignItems: 'center',
    gap: 10,
  },
  input: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 8,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  searchButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  searchButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  weatherContainer: {
    backgroundColor: '#fff',
    padding: 25,
    borderRadius: 20,
    alignItems: 'center',
    width: '100%',
    elevation: 5,
    shadowColor: '#000',
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
  info: {
    fontSize: 16,
    color: '#333',
  },
  label: {
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    marginTop: 20,
  },
});
