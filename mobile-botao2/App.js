import React, { useState } from 'react';
import { Text, SafeAreaView, StyleSheet, View, TouchableOpacity } from 'react-native';

export default function App() {
  const [corTexto, setCorTexto] = useState(''); // Guardar a cor clicada

  const clicarCor = (nomeCor, corVisual) => {
    setCorTexto({ nome: nomeCor, cor: corVisual }); // Mudar a cor e o nome no texto
  };

  return (
    <SafeAreaView style={estilos.container}>
      <View style={estilos.cantoEsquerdoSuperior}>
        <TouchableOpacity
          style={[estilos.botao, { backgroundColor: 'navy' }]}
          onPress={() => clicarCor('Azul-Escuro', 'navy')} 
        />
      </View>

      <View style={estilos.cantoDireitoSuperior}>
        <TouchableOpacity
          style={[estilos.botao, { backgroundColor: 'indigo' }]}
          onPress={() => clicarCor('Roxo', 'indigo')}
        />
      </View>

      <View style={estilos.cantoEsquerdoInferior}>
        <TouchableOpacity
          style={[estilos.botao, { backgroundColor: 'blueviolet' }]}
          onPress={() => clicarCor('Lilás', 'blueviolet')}
        />
      </View>

      <View style={estilos.cantoDireitoInferior}>
        <TouchableOpacity
          style={[estilos.botao, { backgroundColor: 'magenta' }]}
          onPress={() => clicarCor('Rosa', 'magenta')}
        />
      </View>

      <View style={estilos.centralizado}>
        <Text style={[estilos.textoCor, { color: corTexto.cor }]}>
          {corTexto ? `Você clicou em ${corTexto.nome}` : 'Clique em uma cor'}
        </Text>
      </View>
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
  },
  botao: {
    width: 100,
    height: 100, 
  },
  cantoEsquerdoSuperior: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
  cantoDireitoSuperior: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  cantoEsquerdoInferior: {
    position: 'absolute',
    bottom: 20,
    left: 20,
  },
  cantoDireitoInferior: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  centralizado: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textoCor: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
