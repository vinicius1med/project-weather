import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  LayoutAnimation,
  UIManager,
  Platform,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import Footer from './footer/Footer';
import {
  useNavigation,
  CompositeNavigationProp,
  DrawerActions,
} from '@react-navigation/native';
import {
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import {
  DrawerNavigationProp,
} from '@react-navigation/drawer';
import { StackParamList, DrawerParamList } from '../App';
import { useTheme } from '../components/context/ThemeContext';
import { darkColors, lightColors } from '../components/ui/colors';
import { getHistory } from '../components/utils/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';

type HistoryScreenNavigationProp = CompositeNavigationProp<
  DrawerNavigationProp<DrawerParamList, 'MainStack'>,
  NativeStackNavigationProp<StackParamList, 'Details'>
>;

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function HistoryScreen() {
  const navigation = useNavigation<HistoryScreenNavigationProp>();
  const [history, setHistory] = useState<any[]>([]);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const colors = isDark ? darkColors : lightColors;

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const userId = await AsyncStorage.getItem('userId');
        const data = await getHistory(userId);
        setHistory(data);
      } catch (error) {
        console.error('Erro ao carregar histórico:', error);
      }
    };
    fetchHistory();
  }, []);

  const toggleExpand = (id: number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedId(expandedId === id ? null : id);
  };

  const renderItem = ({ item }: { item: any }) => (
    <View style={[styles.item, { borderColor: colors.borders }]}>
      <TouchableOpacity
        style={styles.row}
        onPress={() => toggleExpand(item.id)}
      >
        <Text style={[styles.itemText, { color: colors.primaryText }]}>
          {item.city} {item.country} - {Math.round(item.temperature)}°
        </Text>
        <Feather
          name={expandedId === item.id ? 'chevron-up' : 'chevron-down'}
          size={24}
          color={isDark ? darkColors.buttons : lightColors.buttons}
        />
      </TouchableOpacity>

      {expandedId === item.id && (
        <View style={styles.expandedSection}>
          <Text style={[styles.expandedText, { color: colors.primaryText }]}>
            Clima: {item.weatherDescription}
          </Text>
          <Text style={[styles.expandedText, { color: colors.primaryText }]}>
            Vento: {item.windSpeed} km/h
          </Text>
          <Text style={[styles.expandedText, { color: colors.primaryText }]}>
            Localização: Lon {item.lon}, Lat {item.lat}
          </Text>
          <Text style={[styles.expandedText, { color: colors.primaryText }]}>
            Data: {new Date(item.date).toLocaleString()}
          </Text>
        </View>
      )}
    </View>
  );

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
          <Feather name="align-justify" size={24} color={colors.primaryText} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: colors.primaryText }]}>
          Histórico
        </Text>
      </View>

      <FlatList
        data={history}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderItem}
      />

      <Footer
        customButton={{
          icon: <Feather name="cloud" size={24} color={colors.primaryText} />,
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
  item: {
    padding: 15,
    borderBottomWidth: 1,
    width: 300,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemText: {
    fontSize: 16,
  },
  expandedSection: {
    marginTop: 10,
  },
  expandedText: {
    fontSize: 14,
    marginBottom: 4,
  },
});
