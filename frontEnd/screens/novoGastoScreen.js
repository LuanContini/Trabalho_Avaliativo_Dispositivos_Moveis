import { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { API_URL } from "@env";

import CustomInput from "../components/inputPersonalizadoComponent";
import CustomButton from "../components/botaoCustomizadoComponent";
import { useNavigation } from "@react-navigation/native";

export default function NovoGastoScreen() {
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");
  const [categoria, setCategoria] = useState("");
  const navigation = useNavigation();

  function capitalizeWords(str) {
    return str
      .toLowerCase()
      .replace(/\s+/g, " ")
      .trim()
      .split(" ")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
  }

  const adicionarGasto = async () => {
    // Remove espaços e normaliza
    const desc = capitalizeWords(descricao);
    const cat = capitalizeWords(categoria);
    const val = valor.trim();

    if (!desc || !val || !cat) {
      Alert.alert("Preencha todos os campos!");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/gastos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          descricao: desc,
          valor: parseFloat(val),
          categoria: cat,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.log("Erro ao adicionar gasto:", response.status, errorText);
        throw new Error("Erro ao adicionar gasto");
      }

      Alert.alert("Gasto adicionado com sucesso!");
      navigation.navigate("Historico");
    } catch (error) {
      console.log("Erro no fetch:", error);
      Alert.alert("Erro", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <CustomInput
        label="Descrição"
        value={descricao}
        onChangeText={setDescricao}
        placeholder="Ex: Supermercado"
      />
      <CustomInput
        label="Valor"
        value={valor}
        onChangeText={setValor}
        placeholder="Ex: 100.50"
        keyboardType="numeric"
      />
      <CustomInput
        label="Categoria"
        value={categoria}
        onChangeText={setCategoria}
        placeholder="Ex: Alimentação"
      />
      <CustomButton title="Adicionar Gasto" onPress={adicionarGasto} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
});
