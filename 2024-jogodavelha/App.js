// App.js
import React, { useState } from 'react';
import { Text, SafeAreaView, StyleSheet } from 'react-native';
import Tabuleiro from './components/Tabuleiro';
import TelaDeSelecao from './components/TelaDeSelecao';

export default function App() {
  const [simbolo, setSimbolo] = useState(null);

  const escolherSimbolo = (s) => {
    setSimbolo(s);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>Jogo da Velha</Text>
      {simbolo === null ? (
        <TelaDeSelecao onEscolher={escolherSimbolo} />
      ) : (
        <Tabuleiro simbolo={simbolo} />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
