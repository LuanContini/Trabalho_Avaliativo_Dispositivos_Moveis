import { View, Text, StyleSheet } from 'react-native';

export default function Footer() {
  return (
    <View style={styles.footer}>
      <Text style={styles.text}>© 2025 IFSP - Luan Contini - Todos os direitos reservados</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    width: '100%',
    padding: 10,
    backgroundColor: '#eee',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    zIndex: 10,
  },
  text: {
    color: '#888',
    fontSize: 12,
  },
});