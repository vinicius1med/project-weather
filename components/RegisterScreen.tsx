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
import { registerUser } from '../components/utils/api';

type RegisterScreenNavigationProp = NativeStackNavigationProp<
  StackParamList,
  'Register'
>;

export default function RegisterScreen() {
  const navigation = useNavigation<RegisterScreenNavigationProp>();
  const [nome, setNome] = useState<string>('');
  const [pass, setPass] = useState<string>('');
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');

  async function handleRegisterPress() {
    if (nome !== '' && pass !== '') {
      try {
        const response = await registerUser(nome, pass);

        if (response && response.id) {
          setNome('');
          setPass('');
          setMessage('Cadastro realizado com sucesso!');
          setIsSuccess(true);

          setTimeout(() => {
            navigation.navigate('Login');
          }, 1500);
        } else {
          setMessage('Erro ao cadastrar usuário.');
          setIsSuccess(false);
        }
      } catch (error: any) {
        if (error.response && error.response.status === 409) {
          setMessage('Usuário já existe.');
          setIsSuccess(false);
        } else {
          setMessage('Erro ao conectar à API.');
          console.error(error);
          setIsSuccess(false);
        }
      }
    } else {
      setMessage('Por favor, preencha nome e senha.');
      setIsSuccess(false);
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
          <Text style={styles.top}>Cadastro</Text>

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

          <Text
            style={[styles.messageText, { color: isSuccess ? 'green' : 'red' }]}
          >
            {message}
          </Text>

          <TouchableOpacity
            style={styles.appButtonContainer}
            activeOpacity={0.8}
            onPress={handleRegisterPress}
          >
            <Text style={styles.appButtonText}>Registrar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.appButtonContainer,
              { marginTop: 10, backgroundColor: '#555' },
            ]}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={styles.appButtonText}>Voltar para Login</Text>
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
    textAlign: 'center',
    marginBottom: 10,
  },
});
