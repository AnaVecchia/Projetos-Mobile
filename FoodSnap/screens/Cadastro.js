import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button, Alert, Image } from 'react-native';
import { database } from '../firebase';
import { ref, set, get } from 'firebase/database';

const Cadastro = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const isValidEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const handleCadastro = () => {
    if (!nome || !email || !senha) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    if (!isValidEmail(email)) {
      Alert.alert('Erro', 'Por favor, insira um e-mail válido.');
      return;
    }

    const userRef = ref(database, 'usuarios/' + email.replace('.', '_'));

    get(userRef).then((snapshot) => {
      if (snapshot.exists()) {
        Alert.alert('Erro', 'E-mail já cadastrado. Tente outro.');
      } else {
        set(userRef, {
          nome: nome,
          email: email,
          senha: senha,
        })
        .then(() => {
          Alert.alert('Cadastro', 'Usuário cadastrado com sucesso!');
          setNome('');
          setEmail('');
          setSenha('');
        })
        .catch((error) => {
          Alert.alert('Erro', 'Erro ao cadastrar usuário: ' + error.message);
        });
      }
    }).catch((error) => {
      Alert.alert('Erro', 'Erro ao verificar e-mail: ' + error.message);
    });
  };

  return (
    <View style={styles.container}>
      <Image
        source={require ('../assets/cadastro.png')} // Substitua pela URL da sua imagem
        style={styles.image}
      />
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
      />
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />
      <Button title="Cadastrar" onPress={handleCadastro} color="#DA291C" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFCC00',
    padding: 20,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 50, // Torna a imagem redonda
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    color: '#DA291C',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  input: {
    height: 50,
    borderColor: '#DA291C',
    borderWidth: 2,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
    width: '100%',
    backgroundColor: '#fff',
  },
});

export default Cadastro;
