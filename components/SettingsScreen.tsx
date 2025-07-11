import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation, CompositeNavigationProp } from '@react-navigation/native';
import { DrawerActions } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { StackParamList, DrawerParamList } from '../App';
import Footer from './footer/Footer';
import { useTheme } from '../components/context/ThemeContext';

type SettingsScreenNavigationProp = CompositeNavigationProp<
  DrawerNavigationProp<DrawerParamList, 'MainStack'>,
  NativeStackNavigationProp<StackParamList, 'Settings'>
>;

const SettingsScreen = () => {
  const navigation = useNavigation<SettingsScreenNavigationProp>();
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

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
        <Text style={styles.title}>Ajustes</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.settingRow}>
          <Text style={styles.settingText}>Tema Escuro</Text>
          <Switch
            value={isDark}
            onValueChange={toggleTheme}
          />
        </View>
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
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
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
});