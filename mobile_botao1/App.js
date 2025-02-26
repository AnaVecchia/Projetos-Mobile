import React, { useState } from 'react';
import { Text, SafeAreaView, StyleSheet, View, TouchableOpacity } from 'react-native';

export default function App() {
  const [corSelecionada, setCorSelecionada] = useState('');

  const selecionarCor = (cor) => {
    setCorSelecionada(cor);
  };

  return (
    <SafeAreaView style={estilos.container}>
      <View style={estilos.linha}>
        <TouchableOpacity 
          style={[estilos.botao, { backgroundColor: 'navy' }]} 
          onPress={() => selecionarCor('Azul-Escuro')}
        >
          <Text style={estilos.textoBotao}>Azul-Escuro</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[estilos.botao, { backgroundColor: 'indigo' }]} 
          onPress={() => selecionarCor('Roxo')}
        >
          <Text style={estilos.textoBotao}>Roxo</Text>
        </TouchableOpacity>
      </View>
      
      <View style={estilos.linha}>
        <TouchableOpacity 
          style={[estilos.botao, { backgroundColor: 'blueviolet' }]} 
          onPress={() => selecionarCor('Lilás')}
        >
          <Text style={estilos.textoBotao}>Lilás</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[estilos.botao, { backgroundColor: 'magenta' }]} 
          onPress={() => selecionarCor('Rosa')}
        >
          <Text style={estilos.textoBotao}>Rosa</Text>
        </TouchableOpacity>
      </View>

      {corSelecionada ? (
        <View style={estilos.mensagem}>
          <Text style={estilos.textoMensagem}>A cor selecionada é {corSelecionada}</Text>
        </View>
      ) : null}
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
  },
  linha: {
    flexDirection: 'row',
    flex: 1,
  },
  botao: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textoBotao: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  mensagem: {
    padding: 16,
    alignItems: 'center',
  },
  textoMensagem: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
