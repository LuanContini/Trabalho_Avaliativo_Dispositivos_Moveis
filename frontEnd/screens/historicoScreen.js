import React, { useEffect, useState } from "react";
import { StyleSheet, ScrollView, View, Text } from "react-native";
import { API_URL } from "@env";
import { useFocusEffect } from "@react-navigation/native";

import GastoCard from "../components/cardGastosComponent";

function capitalizeWords(str) {
  return str
    ? str
        .toLowerCase()
        .replace(/\s+/g, " ")
        .trim()
        .split(" ")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ")
    : "";
}

export default function HistoricoScreen() {
  const [gastos, setGastos] = useState([]);

  const fetchGastos = async () => {
    try {
      const response = await fetch(`${API_URL}/gastos`);
      if (!response.ok) {
        console.log("Erro na resposta da API:", response.status);
        setGastos([]);
        return;
      }
      const data = await response.json();
      setGastos(data);
      console.log("Gastos recebidos:", data);
    } catch (error) {
      console.log("Erro ao buscar gastos:", error);
      setGastos([]);
    }
  };

  useFocusEffect(
    // useCallback previne loops infinitos
    React.useCallback(() => {
      fetchGastos();
    }, [])
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Histórico de Gastos</Text>
      {gastos.length === 0 && (
        <Text style={styles.semGastos}>Nenhum gasto cadastrado.</Text>
      )}
      {gastos.map((gasto) => (
        <GastoCard
          key={gasto.id}
          descricao={capitalizeWords(gasto.descricao)}
          valor={gasto.valor}
          categoria={capitalizeWords(gasto.categoria)}
          // Passa a cor do valor conforme positivo/negativo
          valorStyle={{
            color: gasto.valor >= 0 ? "#388e3c" : "#d32f2f",
            fontWeight: "bold",
          }}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    paddingHorizontal: 8,
  },
  titulo: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1976d2",
    marginBottom: 12,
    textAlign: "center",
  },
  semGastos: {
    textAlign: "center",
    color: "#888",
    marginTop: 24,
  },
});
