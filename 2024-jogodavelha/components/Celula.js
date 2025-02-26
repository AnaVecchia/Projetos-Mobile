import React from 'react';
import { Pressable, Text, View } from 'react-native';

export default function Celula({ player, jogada }) {
  return (
    <Pressable
      onPress={jogada}
      style={{
        width: 100,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#000',
      }}
    >
      <Text style={{ fontSize: 40, fontWeight: 'bold' }}>{player}</Text>
    </Pressable>
  );
}
