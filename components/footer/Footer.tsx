import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation, NavigationProp } from '@react-navigation/native';

type RootStackParamList = {
  History: undefined;
  Details: undefined;
  Calendar: undefined;
  Settings: undefined;
};

type FooterButton = {
  icon: React.ReactNode;
  label: string;
  onPress: () => void;
};

type FooterProps = {
  customButton?: FooterButton;
};


export default function Footer({ customButton }: FooterProps) {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <View style={styles.footer}>
      <TouchableOpacity
        style={styles.footerButton}
        onPress={customButton? customButton.onPress : () => navigation.navigate('Details')}
      >
        {customButton ? (
          <>
            {customButton.icon}
            <Text style={styles.footerButtonText}>{customButton.label}</Text>
          </>
        ) : (
          <>
            <Feather name="thermometer" size={24} color="black" />
            <Text style={styles.footerButtonText}>+Detalhes</Text>
          </>
        )}
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
    height: 120,
    width: '100%',
    backgroundColor: '#ccc',
    paddingBottom: 50,
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
