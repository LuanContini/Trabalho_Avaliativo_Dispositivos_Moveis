import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import { Button, View, StyleSheet, TextInput } from 'react-native';
import AvatarComponent from '../components/avatarComponent';

export default function PerfilScreen() {
  const [avatar, setAvatar] = useState(null);
  const [nome, setNome] = useState('');

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setAvatar(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <AvatarComponent avatarUrl={avatar} name={nome || 'Seu Nome'} />
      <Button title="Escolher Avatar" onPress={pickImage} />
      <TextInput
        style={styles.input}
        placeholder="Digite seu nome"
        value={nome}
        onChangeText={setNome}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  input: {
    width: 200,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginTop: 16,
    fontSize: 16,
  },
});