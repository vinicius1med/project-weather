import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamList } from '../App';

type LoginScreenNavigationProp = NativeStackNavigationProp<StackParamList, 'Login'>;

export default function LoginScreen() {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const [nome, setNome] = useState<string>('');
  const [pass, setPass] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  function handleLoginPress() {
    if (nome !== '' && pass !== '') {
      if (nome.toLowerCase() === 'admin' && pass === 'admin') {
        setNome('');
        setPass('');
        navigation.navigate('Weather');
      } else {
        setMessage('Nome ou senha incorretos.');
      }
    } else {
      setMessage('Por favor, preencha nome e senha.');
    }
  }

  return (
    <View style={styles.screen}>
      <View style={styles.container}>
        <Text style={styles.top}>Login</Text>

        <View style={styles.box}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            value={nome}
            onChangeText={setNome}
            placeholder="Digite seu nome"
            placeholderTextColor="#999"
          />
        </View>

        <View style={styles.box}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            value={pass}
            onChangeText={setPass}
            placeholder="Your Password"
            placeholderTextColor="#999"
            secureTextEntry={true}
          />
        </View>

        {message !== '' && <Text style={styles.messageText}>{message}</Text>}

        <TouchableOpacity
          style={styles.appButtonContainer}
          activeOpacity={0.8}
          onPress={handleLoginPress}
        >
          <Text style={styles.appButtonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
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
    flex: 1,
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
});