import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { StackParamList } from '../App';

export default function HomeScreen() {
  const navigation = useNavigation<NavigationProp<StackParamList>>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to my App!</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.buttonText}>Open app</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#2D0000',
    marginBottom: 30,
  },
  button: {
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
  buttonText: {
    fontSize: 14,
    padding: 10,
    color: '#fff',
    fontWeight: 'bold',
    alignSelf: 'center',
    textTransform: 'uppercase',
  },
});
