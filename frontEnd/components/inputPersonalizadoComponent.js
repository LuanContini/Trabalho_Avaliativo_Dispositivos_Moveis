import { TextInput, StyleSheet, View, Text } from 'react-native';

export default function CustomInput({ label, value, onChangeText, placeholder, style, ...props }) {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={[styles.input, style]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        {...props}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    width: '100%',
  },
  label: {
    marginBottom: 4,
    fontSize: 14,
    color: '#1976d2',
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderColor: '#1976d2',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 16,
    backgroundColor: '#fff',
  },
});