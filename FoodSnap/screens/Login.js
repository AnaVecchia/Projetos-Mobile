import React, { useState } from 'react'; 
import { StyleSheet, View, Text, TextInput, Button, Alert, Image, TouchableOpacity } from 'react-native'; 
import { database } from '../firebase'; 
import { ref, get } from 'firebase/database'; 

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = () => {
    // Verifica se ambos os campos foram preenchidos
    if (!email || !senha) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    // Referência ao local do banco de dados onde os dados do usuário estão armazenados
    const userRef = ref(database, 'usuarios/' + email.replace('.', '_'));

    // Recupera dados do usuário no Firebase com base no e-mail fornecido
    get(userRef).then((snapshot) => {
      if (snapshot.exists()) {
        // Se o usuário existe, verifica a senha
        const userData = snapshot.val();
        if (userData.senha === senha) {
          Alert.alert('Sucesso', 'Login realizado com sucesso!');
          navigation.navigate('Home'); 
        } else {
          Alert.alert('Erro', 'Senha incorreta.');
        }
      } else {
        Alert.alert('Erro', 'E-mail não cadastrado.');
      }
    }).catch((error) => {
      Alert.alert('Erro', 'Erro ao verificar usuário: ' + error.message); 
    });
  };

  // Retorno JSX - Define a estrutura visual da tela de login
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/login.jpg')} 
        style={styles.image}
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
        secureTextEntry // Oculta a senha ao digitar
      />
      <Button title="Entrar" onPress={handleLogin} color="#DA291C" />

      <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}>
        <Text style={styles.registerText}>Ainda não tem uma conta? Cadastre-se</Text>
      </TouchableOpacity>
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
    paddingTop: 0,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
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
  registerText: {
    color: '#DA291C',
    marginTop: 15,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Login;
