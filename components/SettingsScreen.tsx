import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import {
  useNavigation,
  CompositeNavigationProp,
  DrawerActions,
} from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { StackParamList, DrawerParamList } from '../App';
import Footer from './footer/Footer';
import { useTheme } from '../components/context/ThemeContext';
import { darkColors, lightColors } from '../components/ui/colors';
import { SafeAreaView } from 'react-native-safe-area-context';

type SettingsScreenNavigationProp = CompositeNavigationProp<
  DrawerNavigationProp<DrawerParamList, 'MainStack'>,
  NativeStackNavigationProp<StackParamList, 'Settings'>
>;

export default function SettingsScreen() {
  const navigation = useNavigation<SettingsScreenNavigationProp>();
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';
  const colors = isDark ? darkColors : lightColors;

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
      edges={['top', 'bottom']}
    >
      <View style={[styles.header, { borderColor: colors.borders }]}>
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        >
          <Feather
            name="align-justify"
            size={24}
            color={colors.primaryText}
          />
        </TouchableOpacity>
        <Text style={[styles.title, { color: colors.primaryText }]}>
          Ajustes
        </Text>
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
            <Feather name="cloud" size={24} color={colors.primaryText} />
          ),
          label: 'Clima',
          onPress: () => navigation.navigate('Weather'),
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
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
    marginTop: 15,
    width: '80%',
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
