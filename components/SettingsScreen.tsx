import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import Footer from './footer/Footer';

type RootStackParamList = {
  MenuDrawer: undefined;
  Profile: undefined;
  Weather: undefined;
};

const SettingsScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [darkMode, setDarkMode] = useState(false);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.menuButton} onPress={() => navigation.navigate('MenuDrawer')}>
          <Feather name="align-justify" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>Ajustes</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.settingRow}>
          <Text style={styles.settingText}>Modo Noturno</Text>
          <Switch
            value={darkMode}
            onValueChange={(value) => setDarkMode(value)}
          />
        </View>

        <TouchableOpacity
          style={styles.profileButton}
          onPress={() => navigation.navigate('Profile')}
        >
          <Text style={styles.profileButtonText}>Ir para Perfil</Text>
        </TouchableOpacity>
      </View>

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

export default SettingsScreen;

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
  content: {
    marginTop: 30,
    width: '90%',
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  settingText: {
    fontSize: 18,
  },
  profileButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 15,
    alignItems: 'center',
    borderRadius: 10,
  },
  profileButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
