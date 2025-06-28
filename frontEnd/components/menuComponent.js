import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function Menu() {
  const navigation = useNavigation();

  return (
    <View style={styles.menuContainer}>
      <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Historico')}>
        <Ionicons name="list-outline" size={24} color="black" />
        <Text style={styles.menuText}>Histórico</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('NovoGasto')}>
        <Ionicons name="add-circle-outline" size={24} color="black" />
        <Text style={styles.menuText}>Novo Gasto</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Perfil')}>
        <Ionicons name="person-outline" size={24} color="black" />
        <Text style={styles.menuText}>Perfil</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Resumo')}>
        <Ionicons name="stats-chart-outline" size={24} color="black" />
        <Text style={styles.menuText}>Resumo</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  menuContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#eee',
    paddingVertical: 10,
  },
  menuItem: {
    alignItems: 'center',
  },
  menuText: {
    fontSize: 12,
    marginTop: 2,
  },
});