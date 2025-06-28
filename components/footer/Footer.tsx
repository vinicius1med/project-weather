import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation, NavigationProp } from '@react-navigation/native';

type RootStackParamList = {
  History: undefined;
  Details: { weatherData: any };
  Calendar: undefined;
  Settings: undefined;
};

type Props = {
  weatherData?: any;
};


export default function Footer({ weatherData }: Props) {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <View style={styles.footer}>
      <TouchableOpacity
        style={styles.footerButton}
        onPress={() => {
          if (weatherData) {
            navigation.navigate('Details', { weatherData });
          } else {
            alert('Nenhuma previsão disponível!');
          }}
        }
      >
        <Feather name="thermometer" size={24} color="black" />
        <Text style={styles.footerButtonText}>+Detalhes</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.footerButton}
        onPress={() => navigation.navigate('History')}
      >
        <Feather name="clock" size={24} color="black" />
        <Text style={styles.footerButtonText}>Histórico</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.footerButton}
        onPress={() => navigation.navigate('Calendar')}
      >
        <Feather name="calendar" size={24} color="black" />
        <Text style={styles.footerButtonText}>Calendário</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.footerButton}
        onPress={() => navigation.navigate('Settings')}
      >
        <Feather name="settings" size={24} color="black" />
        <Text style={styles.footerButtonText}>Ajustes</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    position: 'absolute',
    bottom: 0,
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'center',
    height: 70,
    width: '100%',
    backgroundColor: '#ccc',
  },
  footerButton: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerButtonText: {
    fontSize: 12,
    color: 'black',
    marginTop: 2,
    fontWeight: 'bold',
  },
});
