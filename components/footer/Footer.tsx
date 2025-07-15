import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../context/ThemeContext';
import { darkColors, lightColors } from '../ui/colors';
import { DrawerParamList } from '../../App';

type RootNavigatorParamList = DrawerParamList;
type FooterNavigationProp = NavigationProp<RootNavigatorParamList>;

type FooterButton = {
  icon: React.ReactNode;
  label: string;
  onPress: () => void;
};

type FooterProps = {
  customButton?: FooterButton;
};

export default function Footer({ customButton }: FooterProps) {
  const navigation = useNavigation<FooterNavigationProp>();
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const backgroundColor = isDark ? darkColors.background : lightColors.background;
  const iconColor = isDark ? darkColors.primaryText : lightColors.primaryText;

  return (
    <View
      style={[
        styles.footer,
        {
          paddingBottom: insets.bottom || 10,
          backgroundColor: backgroundColor,
          borderTopWidth: 1,
          borderTopColor: isDark ? darkColors.borders : lightColors.borders,
        },
      ]}
    >
      <TouchableOpacity
        style={styles.footerButton}
        onPress={
          customButton
            ? customButton.onPress
            : () => navigation.navigate('MainStack', { screen: 'Details' })
        }
      >
        {customButton ? (
          <>
            {customButton.icon}
            <Text style={[styles.footerButtonText, { color: iconColor }]}>
              {customButton.label}
            </Text>
          </>
        ) : (
          <>
            <Feather name="thermometer" size={24} color={iconColor} />
            <Text style={[styles.footerButtonText, { color: iconColor }]}>
              +Detalhes
            </Text>
          </>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.footerButton}
        onPress={() => navigation.navigate('MainStack', { screen: 'History' })}
      >
        <Feather name="clock" size={24} color={iconColor} />
        <Text style={[styles.footerButtonText, { color: iconColor }]}>Histórico</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.footerButton}
        onPress={() => navigation.navigate('MainStack', { screen: 'Calendar' })}
      >
        <Feather name="calendar" size={24} color={iconColor} />
        <Text style={[styles.footerButtonText, { color: iconColor }]}>Calendário</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.footerButton}
        onPress={() => navigation.navigate('MainStack', { screen: 'Settings' })}
      >
        <Feather name="settings" size={24} color={iconColor} />
        <Text style={[styles.footerButtonText, { color: iconColor }]}>Ajustes</Text>
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
    width: '100%',
    paddingTop: 10,
  },
  footerButton: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerButtonText: {
    fontSize: 12,
    marginTop: 2,
    fontWeight: 'bold',
  },
});