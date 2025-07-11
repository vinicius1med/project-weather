import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation, CompositeNavigationProp } from '@react-navigation/native';
import { DrawerActions } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { useRoute, RouteProp } from '@react-navigation/native';
import Footer from './footer/Footer';
import { StackParamList, DrawerParamList } from '../App';

type SettingsScreenNavigationProp = CompositeNavigationProp<
  DrawerNavigationProp<DrawerParamList, 'MainStack'>,
  NativeStackNavigationProp<StackParamList, 'Details'>
>;

type DetailsScreenRouteProp = RouteProp<StackParamList, 'Details'>;

const DetailsScreen = () => {
  const navigation = useNavigation<SettingsScreenNavigationProp>();
  const route = useRoute<DetailsScreenRouteProp>();
  const { weatherData } = route.params;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        >
          <Feather name="align-justify" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>Detalhes</Text>
      </View>

      <ScrollView style={styles.scroll}>
        <Text style={styles.cityName}>
          {weatherData.name}, {weatherData.sys.country}
        </Text>
        <Image
          style={styles.weatherIcon}
          source={{
            uri: `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png`,
          }}
        />
        <Text style={styles.temperature}>
          {Math.round(weatherData.main.temp)}°
        </Text>
        <Text style={styles.description}>
          {weatherData.weather[0].description}
        </Text>
        <View style={styles.additionalInfo}>
          <Text style={styles.info}>
            <Text style={styles.label}>Pressão:</Text>{' '}
            {weatherData.main.pressure} hPa
          </Text>
          <Text style={styles.info}>
            <Text style={styles.label}>Umidade:</Text>{' '}
            {weatherData.main.humidity}%
          </Text>
          <Text style={styles.info}>
            <Text style={styles.label}>Vento:</Text> {weatherData.wind.speed}{' '}
            km/h
          </Text>
          <Text style={styles.info}>
            <Text style={styles.label}>Longitude:</Text> {weatherData.coord.lon}
          </Text>
          <Text style={styles.info}>
            <Text style={styles.label}>Latitude:</Text> {weatherData.coord.lat}
          </Text>
          <Text style={styles.info}>
            <Text style={styles.label}>Nascer do sol:</Text>{' '}
            {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString()}  {/* convertendo para formato de horas 00:00:00 */}
          </Text>
          <Text style={styles.info}>
            <Text style={styles.label}>Pôr do sol:</Text>{' '}
            {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString()}
          </Text>
        </View>
      </ScrollView>

      <Footer
        customButton={{
          icon: <Feather name="cloud" size={24} color="black" />,
          label: 'Clima',
          onPress: () => navigation.navigate('Weather'),
        }}
      />
    </View>
  );
};

export default DetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    alignItems: 'center',
    backgroundColor: '#fff',
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    width: '100%',
  },
  menuButton: {
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  scroll: {
    width: '100%',
    padding: 20,
  },
  jsonText: {
    fontSize: 14,
    fontFamily: 'monospace',
  },
  cityName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  weatherIcon: {
    width: 150,
    height: 150,
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
    marginBottom: 4,
  },
  label: {
    fontWeight: 'bold',
  },
});
