import { View, Text, Button, StyleSheet, Alert } from 'react-native';

export default function ExcluirPerfil({ navigation, route }) {
  const { perfilId, perfis, removerPerfil } = route.params;

  const perfil = perfis.find(p => p.id === perfilId);

  const handleDelete = () => {
    Alert.alert('Excluir Perfil', `Tem certeza que deseja excluir o perfil de ${perfil.nome}?`, [
      {
        text: 'Cancelar',
        style: 'cancel',
        onPress: () => navigation.navigate('ListaDePerfis', { perfis }), // Volta para a lista de perfis
      },
      {
        text: 'Excluir',
        onPress: () => {
          removerPerfil(perfilId); // Remove o perfil
          navigation.navigate('ListaDePerfis', { perfis }); // Volta para a lista de perfis
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Excluir Perfil</Text>
      <Text style={styles.message}>Você está prestes a excluir o perfil de:</Text>
      <Text style={styles.nome}>{perfil.nome}</Text>
      <Button title="Confirmar Exclusão" color="red" onPress={handleDelete} />
      <Button title="Cancelar" onPress={() => navigation.navigate('ListaDePerfis', { perfis })} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffebee',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#c62828',
  },
  message: {
    fontSize: 18,
    marginBottom: 20,
    color: '#b71c1c',
  },
  nome: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 20,
    color: '#b71c1c',
  },
});
