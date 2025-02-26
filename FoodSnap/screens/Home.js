import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';

const Home = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image 
        source={require('../assets/logo.webp')} 
        style={styles.logo} 
      />
      <Text style={styles.title}>Seja Bem-Vindo!</Text>
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate('ListaRestaurantes')} 
      >
        <Text style={styles.buttonText}>Acessar Restaurantes Cadastrados</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate('AdicionarRestaurante')}
      >
        <Text style={styles.buttonText}>Cadastrar Novo Restaurante</Text>
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
  },
  logo: {
    width: 150, 
    height: 150, 
    borderRadius: 75, 
    marginBottom: 20, 
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#DA291C', 
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#DA291C', 
    paddingVertical: 15,
    paddingHorizontal: 30,
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

export default Home;
