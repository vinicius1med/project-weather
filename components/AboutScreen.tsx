import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import Footer from './footer/Footer';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { useTheme } from '../components/context/ThemeContext';
import { darkColors, lightColors } from '../components/ui/colors';

type RootStackParamList = {
  Weather: undefined;
};

export default function AboutScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <View style={[styles.container, { backgroundColor: isDark ? darkColors.background : lightColors.background }]}>
      <Text style={[styles.text, { color: isDark ? darkColors.primaryText : lightColors.primaryText }]}>
        Sobre o aplicativo
      </Text>

      <ScrollView contentContainerStyle={{ padding: 20 }}>
        {/* Conteúdo adicional pode ir aqui, exemplo: */}
        <Text style={{ color: isDark ? darkColors.primaryText : lightColors.primaryText, fontSize: 16, lineHeight: 24 }}>
          Este aplicativo foi desenvolvido para fornecer previsões do tempo, histórico, calendário e outras funcionalidades relacionadas ao clima, tudo adaptado para temas claro e escuro.
        </Text>
      </ScrollView>

      <Footer
        customButton={{
          icon: (
            <Feather
              name="cloud"
              size={24}
              color={isDark ? darkColors.primaryText : lightColors.primaryText}
            />
          ),
          label: 'Clima',
          onPress: () => navigation.navigate('Weather'),
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'flex-start', alignItems: 'center' },
  text: { fontSize: 18, fontWeight: 'bold', marginTop: 20, marginBottom: 10 },
});
