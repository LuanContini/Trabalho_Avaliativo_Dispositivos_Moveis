import { View, Text, StyleSheet } from 'react-native';

export default function GastoCard({ descricao, valor, categoria, valorStyle }) {
  return (
    <View style={styles.card}>
      <Text style={styles.descricao}>{descricao}</Text>
      <Text style={styles.categoria}>{categoria}</Text>
      <Text style={[styles.valor, valorStyle]}>
        R$ {Number(valor).toFixed(2)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  descricao: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 4,
  },
  categoria: {
    fontSize: 14,
    color: '#1976d2',
    marginBottom: 8,
  },
  valor: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#388e3c',
    textAlign: 'right',
  },
});