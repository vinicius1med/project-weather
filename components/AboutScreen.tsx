import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { Feather } from '@expo/vector-icons';
import Footer from './footer/Footer';
import { useNavigation, NavigationProp, DrawerActions } from '@react-navigation/native';
import { useTheme } from '../components/context/ThemeContext';
import { darkColors, lightColors } from '../components/ui/colors';
import { DrawerParamList, StackParamList } from '../App';
import { SafeAreaView } from 'react-native-safe-area-context';

type AboutScreenNavigationProp = NavigationProp<DrawerParamList & StackParamList>;

export default function AboutScreen() {
  const navigation = useNavigation<AboutScreenNavigationProp>();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const colors = isDark ? darkColors : lightColors;

  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          backgroundColor: isDark ? darkColors.background : lightColors.background,
        },
      ]}
      edges={['top', 'bottom']}
    >
      <View style={[styles.header, { borderColor: colors.borders }]}>
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        >
          <Feather name="align-justify" size={24} color={colors.primaryText} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: colors.primaryText }]}>
          Sobre o Aplicativo
        </Text>
      </View>

      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <Text
          style={[
            styles.text,
            { color: colors.primaryText },
          ]}
        >
          Este aplicativo foi desenvolvido como trabalho final da disciplina de Aplicações Mobile,
          com agradecimentos especiais aos professores envolvidos no ensino acadêmico e à instituição
          pelo suporte durante nossa formação.
        </Text>

        <Text
          style={[
            styles.sectionTitle,
            { color: colors.primaryText },
          ]}
        >
          Equipe
        </Text>

        <View style={styles.memberContainer}>
          <Text style={[styles.memberName, { color: colors.primaryText }]}>
            Vinícius Medina
          </Text>
          <View style={styles.iconsContainer}>
            <TouchableOpacity onPress={() => Linking.openURL('https://github.com/vinicius1med')}>
              <Feather name="github" size={24} color={colors.primaryText} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Linking.openURL('https://www.linkedin.com/in/vin%C3%ADciusmedina/')}>
              <Feather name="linkedin" size={24} color={colors.primaryText} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.memberContainer}>
          <Text style={[styles.memberName, { color: colors.primaryText }]}>
            Patrick Dias
          </Text>
          <View style={styles.iconsContainer}>
            <TouchableOpacity onPress={() => Linking.openURL('https://github.com/Patrick510')}>
              <Feather name="github" size={24} color={colors.primaryText} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Linking.openURL('https://www.linkedin.com/in/patrick-d-52a10720a/')}>
              <Feather name="linkedin" size={24} color={colors.primaryText} />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <Footer
        customButton={{
          icon: <Feather name="cloud" size={24} color={colors.primaryText} />,
          label: 'Clima',
          onPress: () => navigation.navigate('MainStack', { screen: 'Weather' }),
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
    paddingTop: 20,
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
  text: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  memberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  memberName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  iconsContainer: {
    flexDirection: 'row',
    gap: 15,
  },
});
