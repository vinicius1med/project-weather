import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import {
  useNavigation,
  DrawerActions,
  CompositeNavigationProp,
} from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { DrawerParamList, StackParamList } from '../App';
import Footer from './footer/Footer';
import { useTheme } from '../components/context/ThemeContext';
import { darkColors, lightColors } from '../components/ui/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { updateUser } from '../components/utils/api';
import { SafeAreaView } from 'react-native-safe-area-context';

type ProfileScreenNavigationProp = CompositeNavigationProp<
  DrawerNavigationProp<DrawerParamList, 'Profile'>,
  NativeStackNavigationProp<StackParamList>
>;

export default function ProfileScreen() {
  const navigation = useNavigation<ProfileScreenNavigationProp>();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const colors = isDark ? darkColors : lightColors;

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const handleSave = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');

      if (!userId) {
        Alert.alert('Erro', 'ID do usuário não encontrado.');
        return;
      }

      await updateUser(userId, { name, password });

      Alert.alert('Sucesso', 'Dados atualizados com sucesso!');
    } catch (error) {
      console.error('Erro na atualização:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao atualizar os dados.');
    }
  };

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
          Perfil do Usuário
        </Text>
      </View>

      <View style={styles.content}>
        <Text
          style={[
            styles.label,
            { color: colors.primaryText },
            { fontWeight: 'bold' },
            { paddingBottom: 10 },
          ]}
        >
          Editar informações de login:
        </Text>
        <Text style={[styles.label, { color: colors.primaryText }]}>
          Nome de Usuário
        </Text>
        <TextInput
          style={[
            styles.input,
            { color: colors.primaryText, borderColor: colors.borders },
          ]}
          placeholder="Digite seu nome"
          value={name}
          onChangeText={setName}
          placeholderTextColor={colors.primaryText}
        />

        <Text style={[styles.label, { color: colors.primaryText }]}>
          Senha
        </Text>
        <TextInput
          style={[
            styles.input,
            { color: colors.primaryText, borderColor: colors.borders },
          ]}
          placeholder="Digite sua senha"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          placeholderTextColor={colors.primaryText}
        />

        <TouchableOpacity
          style={[styles.saveButton, { backgroundColor: colors.buttons }]}
          onPress={handleSave}
        >
          <Text style={styles.saveButtonText}>Salvar</Text>
        </TouchableOpacity>
      </View>

      <Footer
        customButton={{
          icon: <Feather name="cloud" size={24} color={colors.primaryText} />,
          label: 'Clima',
          onPress: () =>
            navigation.navigate('MainStack', { screen: 'Weather' }),
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
    width: '90%',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    fontSize: 16,
    opacity: 0.6,
  },
  saveButton: {
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
