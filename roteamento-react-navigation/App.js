import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Importação das telas
import TelaInicial from './components/TelaInicial';
import ListaDePerfis from './components/ListaDePerfis';
import CriarPerfil from './components/CriarPerfil';
import EditarPerfil from './components/EditarPerfil';
import ExcluirPerfil from './components/ExcluirPerfil';

// Criação do Stack Navigator
const Stack = createStackNavigator();

// Array de telas para simplificar a configuração
const telas = [
  { name: 'TelaInicial', component: TelaInicial, title: 'Página Inicial' },
  { name: 'ListaDePerfis', component: ListaDePerfis, title: 'Meus Perfis' },
  { name: 'CriarPerfil', component: CriarPerfil, title: 'Criar Novo Perfil' },
  { name: 'EditarPerfil', component: EditarPerfil, title: 'Editar Perfil' },
  { name: 'ExcluirPerfil', component: ExcluirPerfil, title: 'Excluir Perfil' }
];

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="TelaInicial">
        {telas.map(({ name, component, title }) => (
          <Stack.Screen 
            key={name} 
            name={name} 
            component={component} 
            options={{ title }} 
          />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
