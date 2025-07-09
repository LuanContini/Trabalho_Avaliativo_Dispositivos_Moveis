import React, { useEffect, useState } from "react";
import { ScrollView, View, StyleSheet, Dimensions, Text } from "react-native";
import { PieChart } from "react-native-chart-kit";
import * as Progress from "react-native-progress";
import { useFocusEffect } from "@react-navigation/native";

import ResumoFinanceiro from "../components/resumoFinanceiroComponent";


const API_URL = 'https://trabalho-avaliativo-dispositivos-moveis.onrender.com';

export default function ResumoScreen() {
  const [gastos, setGastos] = useState([]);
  const [totalDespesas, setTotalDespesas] = useState(0);
  const [totalReceitas, setTotalReceitas] = useState(0);
  const [porCategoria, setPorCategoria] = useState({});

  const fetchResumo = async () => {
    try {
      const response = await fetch(`${API_URL}/gastos`);
      if (!response.ok) {
        console.log("Erro na resposta da API:", response.status);
        setGastos([]);
        setTotalDespesas(0);
        setTotalReceitas(0);
        setPorCategoria({});
        return;
      }
      const data = await response.json();
      setGastos(data);
      console.log("Gastos recebidos:", data);

      // Calcula totais
      let despesas = 0;
      let receitas = 0;
      let categorias = {};

      data.forEach((gasto) => {
        const valorNum =
          typeof gasto.valor === "string"
            ? parseFloat(gasto.valor)
            : gasto.valor;
        if (valorNum >= 0) {
          receitas += valorNum;
        } else {
          despesas += Math.abs(valorNum);
        }
        // Soma por categoria
        if (!categorias[gasto.categoria]) categorias[gasto.categoria] = 0;
        categorias[gasto.categoria] += valorNum;
      });

      setTotalDespesas(despesas);
      setTotalReceitas(receitas);
      setPorCategoria(categorias);
    } catch (error) {
      console.log("Erro ao buscar resumo:", error);
      setGastos([]);
      setTotalDespesas(0);
      setTotalReceitas(0);
      setPorCategoria({});
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchResumo();
    }, [])
  );

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

  // Dados para o gráfico de pizza
  const chartData = Object.entries(porCategoria).map(
    ([categoria, valor], i) => ({
      name: capitalizeWords(categoria),
      population: Math.abs(valor),
      color: ["#1976d2", "#388e3c", "#d32f2f", "#ffa726", "#8e24aa"][i % 5],
      legendFontColor: "#222",
      legendFontSize: 14,
    })
  );

  // Calcule o total de gastos (soma de todos os valores, positivos e negativos)
  const totalGastos = gastos.reduce((acc, gasto) => {
    const valorNum =
      typeof gasto.valor === "string" ? parseFloat(gasto.valor) : gasto.valor;
    return acc + valorNum;
  }, 0);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ResumoFinanceiro
        total={totalGastos}
        porCategoria={Object.fromEntries(
          Object.entries(porCategoria).map(([cat, val]) => [
            capitalizeWords(cat),
            val,
          ])
        )}
      />

      {Object.keys(porCategoria).length > 0 && (
        <PieChart
          data={chartData}
          width={Dimensions.get("window").width - 32}
          height={180}
          chartConfig={{
            color: () => "#888",
          }}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="16"
          absolute
        />
      )}

      <View style={{ alignItems: "center", marginTop: 24 }}>
        <Text style={{ marginBottom: 8 }}>
          Progresso dos Gastos (Despesas / Receitas)
        </Text>
        <Progress.Bar
          progress={totalDespesas / (totalReceitas || 1)}
          width={220}
          color="#d32f2f"
          unfilledColor="#eee"
          borderWidth={0}
          height={16}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    paddingHorizontal: 8,
  },
  container: {
    paddingVertical: 16,
    paddingHorizontal: 8,
  },
});
