import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamList } from '../App';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginUser } from '../components/utils/api';

type LoginScreenNavigationProp = NativeStackNavigationProp<
  StackParamList,
  'Login'
>;

export default function LoginScreen() {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const [nome, setNome] = useState<string>('');
  const [pass, setPass] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  async function handleLoginPress() {
    if (nome !== '' && pass !== '') {
      try {
        const response = await loginUser(nome, pass);

        if (response && response.id) {
          await AsyncStorage.setItem('userId', String(response.id));
          await AsyncStorage.setItem('userName', response.name);

          setNome('');
          setPass('');
          setMessage('');
          navigation.navigate('Weather');
        } else {
          setMessage('Nome ou senha incorretos.');
        }
      } catch (error: any) {
        if (error.response && error.response.status === 401) {
          setMessage('Nome ou senha incorretos.');
        } else {
          setMessage('Erro ao conectar à API.');
          console.error(error);
        }
      }
    } else {
      setMessage('Por favor, preencha nome e senha.');
    }
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
    >
      <ScrollView
        contentContainerStyle={styles.screen}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.container}>
          <Text style={styles.top}>Login</Text>

          <View style={styles.box}>
            <Text style={styles.label}>Nome</Text>
            <TextInput
              style={styles.input}
              value={nome}
              onChangeText={setNome}
              placeholder="Digite seu nome"
              placeholderTextColor="#999"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.box}>
            <Text style={styles.label}>Senha</Text>
            <TextInput
              style={styles.input}
              value={pass}
              onChangeText={setPass}
              placeholder="Digite sua senha"
              placeholderTextColor="#999"
              secureTextEntry={true}
            />
          </View>

          <TouchableOpacity
            onPress={() => navigation.navigate('Register')}
            style={styles.linkContainer}
          >
            <Text style={styles.linkText}>Criar conta</Text>
          </TouchableOpacity>

          {message !== '' && <Text style={styles.messageText}>{message}</Text>}

          <TouchableOpacity
            style={styles.appButtonContainer}
            activeOpacity={0.8}
            onPress={handleLoginPress}
          >
            <Text style={styles.appButtonText}>Entrar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 16,
    margin: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  screen: {
    flexGrow: 1,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    padding: 16,
  },
  top: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 24,
    color: '#333',
  },
  box: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    color: '#555',
    marginBottom: 6,
    marginLeft: 4,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    color: '#000',
    backgroundColor: '#f9f9f9',
  },
  appButtonContainer: {
    elevation: 4,
    backgroundColor: '#A52A2A',
    borderRadius: 6,
    paddingVertical: 10,
    paddingHorizontal: 12,

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  appButtonText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold',
    alignSelf: 'center',
    textTransform: 'uppercase',
  },
  messageText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  },
  linkContainer: {
    alignSelf: 'flex-end',
    marginBottom: 12,
  },
  linkText: {
    color: '#555',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});
