import { View, Text, StyleSheet } from 'react-native';

export default function ResumoFinanceiro({ total, saldo, porCategoria = {} }) {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Resumo Financeiro</Text>
      <View style={styles.linha}>
        <Text style={styles.label}>Total de Gastos:</Text>
        <Text style={styles.valorGasto}>R$ {Number(total).toFixed(2)}</Text>
      </View>
      {saldo !== undefined && (
        <View style={styles.linha}>
          <Text style={styles.label}>Saldo:</Text>
          <Text style={styles.valorSaldo}>R$ {Number(saldo).toFixed(2)}</Text>
        </View>
      )}
      <Text style={styles.subtitulo}>Por Categoria:</Text>
      {Object.entries(porCategoria).map(([categoria, valor]) => (
        <View style={styles.linha} key={categoria}>
          <Text style={styles.categoria}>{categoria}:</Text>
          <Text style={styles.valorCategoria}>R$ {Number(valor).toFixed(2)}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 18,
    margin: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1976d2',
    marginBottom: 10,
    textAlign: 'center',
  },
  linha: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  label: {
    fontSize: 16,
    color: '#222',
  },
  valorGasto: {
    fontSize: 16,
    color: '#d32f2f',
    fontWeight: 'bold',
  },
  valorSaldo: {
    fontSize: 16,
    color: '#388e3c',
    fontWeight: 'bold',
  },
  subtitulo: {
    fontSize: 15,
    color: '#1976d2',
    marginTop: 12,
    marginBottom: 4,
    fontWeight: 'bold',
  },
  categoria: {
    fontSize: 15,
    color: '#555',
  },
  valorCategoria: {
    fontSize: 15,
    color: '#1976d2',
    fontWeight: 'bold',
  },
});