import React, { useState } from 'react';
import { View, Text, Alert, StyleSheet } from 'react-native';
import TelaDeSelecao from './TelaDeSelecao';
import Celula from './Celula'; 

export default function Page() {
  const [playerEscolhido, setPlayerEscolhido] = useState(null); 
  const [jogo, setJogo] = useState(['', '', '', '', '', '', '', '', '']); 
  const [player, setPlayer] = useState('X'); 
  const [vencedor, setVencedor] = useState(null); 

  // Função que verifica se há um vencedor
  const verificarVencedor = (novoJogo) => {
    const combinacoesVitoria = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], 
      [0, 3, 6], [1, 4, 7], [2, 5, 8], 
      [0, 4, 8], [2, 4, 6]             
    ];

    for (let combinacao of combinacoesVitoria) {
      const [a, b, c] = combinacao;
      if (novoJogo[a] && novoJogo[a] === novoJogo[b] && novoJogo[a] === novoJogo[c]) {
        return novoJogo[a];
      }
    }
    return null;
  };

  // Função para executar jogadas
  const jogar = (index) => {
    if (jogo[index] !== '' || vencedor) return; 

    const novoJogo = [...jogo];
    novoJogo[index] = player;

    setJogo(novoJogo);

    const ganhador = verificarVencedor(novoJogo);
    if (ganhador) {
      setVencedor(ganhador);
      Alert.alert(`Jogador ${ganhador} venceu!`);
    } else if (!novoJogo.includes('')) {
      Alert.alert('Empate!');
    } else {
      // Alterna o jogador
      setPlayer(player === 'X' ? 'O' : 'X');
    }
  };

  const iniciarJogo = (escolha) => {
    setPlayerEscolhido(escolha);
    setPlayer(escolha);
    setJogo(['', '', '', '', '', '', '', '', '']); 
    setVencedor(null); 
  };

  if (playerEscolhido === null) {
    return <TelaDeSelecao onEscolher={iniciarJogo} />;
  }

  return (
    <View style={styles.container}>
      {vencedor ? (
        <Text style={styles.status}>Jogador {vencedor} venceu!</Text>
      ) : (
        <Text style={styles.status}>Vez do jogador {player}</Text>
      )}
      
      <View style={styles.tabuleiro}>
        {jogo.map((valor, index) => (
          <Celula
            key={index}
            player={valor}
            jogada={() => jogar(index)}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabuleiro: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 300,
    height: 300,
  },
  status: {
    fontSize: 24,
    marginBottom: 20,
  },
});
