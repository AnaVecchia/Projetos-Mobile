import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useState, useEffect } from 'react';

export default function EditarPerfil({ navigation, route }) {
  const { perfilId, perfis, atualizarPerfil } = route.params;

  // Encontrar o perfil atual
  const perfilAtual = perfis.find(perfil => perfil.id === perfilId);

  const [nome, setNome] = useState(perfilAtual.nome);
  const [email, setEmail] = useState(perfilAtual.email);
  const [senha, setSenha] = useState('');

  // Função para atualizar o perfil
  const handleUpdate = () => {
    if (!nome || !email) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }

    // Validação do e-mail
    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!emailValido) {
      Alert.alert('Erro', 'E-mail inválido.');
      return;
    }

    // Atualizar perfil
    const perfilAtualizado = {
      ...perfilAtual,
      nome,
      email,
      senha: senha || perfilAtual.senha, // Mantém a senha antiga se não for alterada
    };

    atualizarPerfil(perfilAtualizado);
    navigation.navigate('ListaDePerfis');
  };

  // Efeito para inicializar os valores dos campos
  useEffect(() => {
    setNome(perfilAtual.nome);
    setEmail(perfilAtual.email);
  }, [perfilAtual]);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Editar Perfil</Text>
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
        placeholder="Senha (deixe vazio para não alterar)" 
        value={senha} 
        onChangeText={setSenha} 
        secureTextEntry 
      />
      <Button 
        title="Atualizar" 
        onPress={handleUpdate} 
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
