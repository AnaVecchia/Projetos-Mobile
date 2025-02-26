import { View, Text, Button, StyleSheet, FlatList } from 'react-native';

const perfis = [
  { id: '1', nome: 'Perfil 1' },
  { id: '2', nome: 'Perfil 2' },
  { id: '3', nome: 'Perfil 3' },
];

export default function ListaDePerfis({ navigation }) {
  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.itemText}>{item.nome}</Text>
      <Button 
        title="Ver Detalhes" 
        onPress={() => navigation.navigate('EditarPerfil', { perfilId: item.id })} 
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Meus Perfis</Text>
      <FlatList
        data={perfis}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      <Button 
        title="Criar Novo Perfil" 
        onPress={() => navigation.navigate('CriarPerfil')} 
        color="#00796b" 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#e3f2fd',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#0d47a1',
  },
  item: {
    padding: 15,
    marginVertical: 8,
    borderColor: '#0d47a1',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#ffffff',
  },
  itemText: {
    fontSize: 18,
    color: '#424242',
  },
});
