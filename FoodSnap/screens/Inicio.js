import React from 'react';
import { StyleSheet, View, Text, Button, Image, TouchableOpacity } from 'react-native';

const Inicio = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image 
        source={require('../assets/logo.webp')} 
        style={styles.logo} 
      />
      <Text style={styles.title}>Bem-vindo ao App!</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => navigation.navigate('Login')} 
        >
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => navigation.navigate('Cadastro')} 
        >
          <Text style={styles.buttonText}>Cadastre-se</Text>
        </TouchableOpacity>
      </View>
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
  logo: {
    width: 150,
    height: 150,
    borderRadius: 75, 
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#DA291C', 
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#DA291C', 
    marginBottom: 30,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#DA291C', 
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30, 
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
    elevation: 5, 
  },
  buttonText: {
    color: '#fff', 
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Inicio;
