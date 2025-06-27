import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Platform,
} from 'react-native';
import DatePicker from 'react-native-ui-datepicker';
import dayjs, { Dayjs } from 'dayjs';
import { useDefaultStyles } from 'react-native-ui-datepicker';
import { Feather } from '@expo/vector-icons';
import Footer from './footer/Footer';
import * as Location from 'expo-location';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';

export default function CalendarScreen() {
  const [date, setDate] = useState<Dayjs>(dayjs());
  const defaultStyles = useDefaultStyles();
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // -------------------------------------------------------------------
  // Primeiro uma funcao para pegar a geolocalizacao do usuario
  // Depois uma funcao para usar a lat e lon + data selecionada no calendario
  // e apresentar os dados do clima
  
  useEffect(() => {
    async function getCurrentLocation() {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    }
    getCurrentLocation();
  }, []);

  let text = JSON.stringify(location);
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

// -------------------------------------------------------------------

  const fetchWeather = async () => {

  }

// -------------------------------------------------------------------

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.menuButton}>
          <Feather name="align-justify" size={24} color="black" />
        </TouchableOpacity>
      </View>
      
      <DatePicker
        mode="single"
        date={date}
        onChange={({ date }) => {
          if (date) setDate(dayjs(date));
        }}
        style={styles.datePickerContainer}
        styles={{
        ...defaultStyles,
        today: { borderColor: 'blue', borderWidth: 1 },
        selected: { backgroundColor: 'blue' },
        selected_label: { color: 'white' },
      }}
      />
      {/* <Text>
        Data selecionada: {date.format('DD/MM/YYYY')}
      </Text> */}
      <View >
        <Text>{text}</Text>
      </View>
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 60,
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    marginBottom: 30,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
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
});
