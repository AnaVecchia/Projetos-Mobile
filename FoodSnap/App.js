import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Inicio from './screens/Inicio'; 
import Login from './screens/Login'; 
import Cadastro from './screens/Cadastro'; 
import Home from './screens/Home'; 
import AdicionarRestaurante from './screens/AdicionarRestaurante'; 
import ListaRestaurantes from './screens/ListaRestaurantes'; 

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Inicio"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#FFCC00', 
          },
          headerTintColor: '#DA291C', 
          headerTitleStyle: {
            fontWeight: 'bold', 
          },
        }}
      >
        <Stack.Screen name="Inicio" component={Inicio} options={{ title: 'Bem-vindo' }} />
        <Stack.Screen name="Login" component={Login} options={{ title: 'Login' }} />
        <Stack.Screen name="Cadastro" component={Cadastro} options={{ title: 'Cadastro' }} />
        <Stack.Screen name="Home" component={Home} options={{ title: 'Página Inicial' }} />
        <Stack.Screen name="AdicionarRestaurante" component={AdicionarRestaurante} options={{ title: 'Adicionar Restaurante' }} />
        <Stack.Screen name="ListaRestaurantes" component={ListaRestaurantes} options={{ title: 'Lista de Restaurantes' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
