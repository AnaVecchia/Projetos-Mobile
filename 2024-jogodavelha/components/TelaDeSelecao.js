import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function TelaDeSelecao({ onEscolher }) {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Escolha X ou O:</Text>
      <View style={styles.botoes}>
        <Button title="X" onPress={() => onEscolher('X')} />
        <Button title="O" onPress={() => onEscolher('O')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titulo: {
    fontSize: 50,
    marginBottom: 30,
  },
  botoes: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '50%',
  },
});
