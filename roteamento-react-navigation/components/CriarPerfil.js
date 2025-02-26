import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useState } from 'react';

export default function CriarPerfil({ navigation, route }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleCreate = () => {
    if (!nome || !email || !senha) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    const novoPerfil = { id: Date.now().toString(), nome, email, senha };
    // Adicionando o novo perfil à lista (usando contexto ou um estado global seria ideal)
    route.params.adicionarPerfil(novoPerfil);

    navigation.navigate('ListaDePerfis');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Criar Novo Perfil</Text>
      <TextInput 
        style={styles.input} 
        placeholder="Nome" 
        value={nome} 
        onChangeText={setNome} 
      />
      <TextInput 
        style={styles.input} 
        placeholder="Email" 
        value={email} 
        onChangeText={setEmail} 
      />
      <TextInput 
        style={styles.input} 
        placeholder="Senha" 
        value={senha} 
        onChangeText={setSenha} 
        secureTextEntry 
      />
      <Button 
        title="Salvar Perfil" 
        onPress={handleCreate} 
        color="#388e3c" 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f1f8e9',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#33691e',
  },
  input: {
    height: 40,
    borderColor: '#388e3c',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
});
