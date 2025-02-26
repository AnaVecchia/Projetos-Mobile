import { View, Text, Button, StyleSheet } from 'react-native';

export default function TelaInicial({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Olá, Joven!</Text>
      <Text style={styles.description}>Se for novo por aqui, clique em "Criar Novo Perfil"!</Text>

      <Button 
        title="Ver Meus Perfis" 
        onPress={() => navigation.navigate('ListaDePerfis')} 
        color="#00796b" 
      />
      <View style={styles.separator} />
      <Button 
        title="Criar Novo Perfil" 
        onPress={() => navigation.navigate('CriarPerfil')} 
        color="#e65100" 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fce4ec',
    padding: 30,
  },
  heading: {
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 15,
    color: '#880e4f',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    color: '#4a148c',
  },
  separator: {
    height: 20,
  },
});
