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
import { darkColors, lightColors } from '../components/ui/colors';

type SettingsScreenNavigationProp = CompositeNavigationProp<
  DrawerNavigationProp<DrawerParamList, 'MainStack'>,
  NativeStackNavigationProp<StackParamList, 'Settings'>
>;

const SettingsScreen = () => {
  const navigation = useNavigation<SettingsScreenNavigationProp>();
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';
  const colors = isDark ? darkColors : lightColors;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { borderColor: colors.borders }]}>
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        >
          <Feather name="align-justify" size={24} color={colors.primaryText} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: colors.primaryText }]}>Ajustes</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.settingRow}>
          <Text style={[styles.settingText, { color: colors.primaryText }]}>
            Tema Escuro
          </Text>
          <Switch
            value={isDark}
            onValueChange={toggleTheme}
            trackColor={{ false: '#767577', true: colors.buttons }}
            thumbColor={isDark ? colors.buttons : '#f4f3f4'}
          />
        </View>
      </View>

      <Footer
        customButton={{
          icon: (
            <Feather
              name="cloud"
              size={24}
              color={colors.primaryText}
            />
          ),
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
