import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList,} from 'react-native';
import { Feather } from '@expo/vector-icons';
import Footer from './footer/Footer';
import { useNavigation, CompositeNavigationProp } from '@react-navigation/native';
import { DrawerActions } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { StackParamList, DrawerParamList } from '../App';  

type SettingsScreenNavigationProp = CompositeNavigationProp<
  DrawerNavigationProp<DrawerParamList, 'MainStack'>,
  NativeStackNavigationProp<StackParamList, 'Details'>
>;

export default function HistoryScreen() {
  const navigation = useNavigation<SettingsScreenNavigationProp>();
  const history = ['São Paulo', 'Rio de Janeiro', 'Salvador', 'Fortaleza'];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        >
          <Feather name="align-justify" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>Histórico</Text>
      </View>

      <FlatList
        data={history}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemText}>{item}</Text>
          </View>
        )}
      />

      <Footer
        customButton={{
          icon: <Feather name="cloud" size={24} color="black" />,
          label: 'Clima',
          onPress: () => navigation.navigate('Weather'),
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    alignItems: 'center',
    backgroundColor: '#fff',
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
    borderColor: '#ccc',
  },
  menuButton: {
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  item: {
    padding: 15,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    width: '100%',
  },
  itemText: {
    fontSize: 16,
  },
});
