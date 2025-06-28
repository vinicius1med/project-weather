import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute, RouteProp, NavigationProp } from '@react-navigation/native';
import Footer from './footer/Footer';

type WeatherData = {
  [key: string]: any;
};

type RootStackParamList = {
  MenuDrawer: undefined;
  Details: { weatherData: WeatherData };
};

const DetailsScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, 'Details'>>();
  const { weatherData } = route.params;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.menuButton} onPress={() => navigation.navigate('MenuDrawer')}>
          <Feather name="align-justify" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>Detalhes</Text>
      </View>

      <ScrollView style={styles.scroll}>
        <Text style={styles.jsonText}>{JSON.stringify(weatherData, null, 2)}</Text>
      </ScrollView>

      <Footer />
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
});
