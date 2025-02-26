import React, { useState } from 'react';
import { Platform, StyleSheet, View, Text, TextInput, Button, Alert, Image, TouchableOpacity } from 'react-native';
import { ref, set } from 'firebase/database'; // Importa o banco de dados do Firebase
import { database } from '../firebase'; // Importa a instância do Firebase configurada
import * as ImagePicker from 'expo-image-picker'; // Biblioteca para selecionar imagens
import * as Location from 'expo-location'; // Biblioteca para obter localização do dispositivo

const AdicionarRestaurante = () => {
  // Declaração de estados para nome, localização, data e imagem
  const [nomeRestaurante, setNomeRestaurante] = useState('');
  const [localizacao, setLocalizacao] = useState('');
  const [data, setData] = useState('');
  const [imagem, setImagem] = useState(null);

  // Função para lidar com a seleção de imagens
  const handleImagePick = async () => {
    if (Platform.OS === 'web') {
      // Solução para seleção de imagens na Web
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      input.onchange = (event) => {
        const file = event.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = () => {
            setImagem(reader.result); 
          };
          reader.readAsDataURL(file);
        }
      };
      input.click();
    } else {
      // Para mobile: usa ImagePicker para abrir câmera ou galeria
      const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
      if (permissionResult.granted) {
        const options = ['Tirar Foto', 'Escolher da Galeria', 'Cancelar'];
        Alert.alert(
          'Escolha uma opção',
          'Você deseja tirar uma foto ou escolher uma imagem da galeria?',
          [
            {
              text: options[0],
              onPress: async () => {
                const cameraResult = await ImagePicker.launchCameraAsync();
                if (!cameraResult.canceled) {
                  setImagem(cameraResult.assets[0].uri);
                }
              },
            },
            {
              text: options[1],
              onPress: async () => {
                const galleryResult = await ImagePicker.launchImageLibraryAsync();
                if (!galleryResult.canceled) {
                  setImagem(galleryResult.assets[0].uri);
                }
              },
            },
            { text: options[2], style: 'cancel' },
          ]
        );
      } else {
        Alert.alert('Permissão para acessar a câmera foi negada.');
      }
    }
  };

  // Função para obter a localização do dispositivo
  const handleLocalizacao = async () => {
    if (Platform.OS === 'web') {
      // Geolocalização para web
      if (!navigator.geolocation) {
        Alert.alert('Erro', 'Geolocalização não é suportada no seu navegador.');
        return;
      }
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocalizacao(`${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
        },
        (error) => Alert.alert('Erro', 'Não foi possível obter a localização.')
      );
    } else {
      // Geolocalização para mobile
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permissão para acessar a localização foi negada.');
        return;
      }
      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      const response = await Location.reverseGeocodeAsync({ latitude, longitude });
      if (response.length > 0) {
        const cidade = response[0].city || response[0].subregion || response[0].region;
        const estado = response[0].region;
        setLocalizacao(`${cidade}, ${estado}`);
      } else {
        Alert.alert('Erro', 'Não foi possível obter o nome da cidade.');
      }
    }
  };

  // Função para formatar a data de entrada do usuário
  const formatarData = (input) => {
    const apenasNumeros = input.replace(/\D/g, '');
    const partes = [];
    if (apenasNumeros.length > 0) partes.push(apenasNumeros.slice(0, 2)); 
    if (apenasNumeros.length > 2) partes.push(apenasNumeros.slice(2, 4)); 
    if (apenasNumeros.length > 4) partes.push(apenasNumeros.slice(4, 8)); 
    return partes.join('/');
  };

  // Função para lidar com a alteração no campo de data
  const handleDataChange = (input) => {
    const dataFormatada = formatarData(input);
    setData(dataFormatada);
  };

  // Função para enviar os dados ao banco de dados Firebase
  const handleSubmit = () => {
    // Verifica se todos os campos estão preenchidos
    if (!nomeRestaurante || !localizacao || !data || !imagem) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos e escolha uma imagem.');
      return;
    }
    // Configura a referência e envia os dados ao Firebase
    const restauranteRef = ref(database, 'restaurantes/' + nomeRestaurante.replace(/\s+/g, '_'));
    set(restauranteRef, {
      nome: nomeRestaurante,
      localizacao: localizacao,
      data: data,
      imagem: imagem,
    })
      .then(() => {
        Alert.alert('Sucesso', 'Restaurante adicionado com sucesso!');
        // Limpa os campos após o envio bem-sucedido
        setNomeRestaurante('');
        setLocalizacao('');
        setData('');
        setImagem(null);
      })
      .catch((error) => {
        Alert.alert('Erro', 'Erro ao adicionar restaurante: ' + error.message);
      });
  };

  // Função para remover a imagem selecionada
  const handleRemoveImage = () => {
    setImagem(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Adicionar Restaurante</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome do Restaurante"
        value={nomeRestaurante}
        onChangeText={setNomeRestaurante}
      />
      <TextInput
        style={styles.input}
        placeholder="DD/MM/AAAA"
        value={data}
        onChangeText={handleDataChange}
        keyboardType="numeric"
        maxLength={10}
      />
      <Button title="Obter Localização" onPress={handleLocalizacao} color="#FFC300" />
      <Text style={styles.localizacaoText}>{localizacao}</Text>
      <Button title="Escolher Imagem" onPress={handleImagePick} color="#FFC300" />
      {imagem && (
        <View style={styles.imageContainer}>
          <Image source={{ uri: imagem }} style={styles.image} />
          <TouchableOpacity onPress={handleRemoveImage} style={styles.removeImageButton}>
            <Text style={styles.removeImageText}>X</Text>
          </TouchableOpacity>
        </View>
      )}
      <Button title="Adicionar" onPress={handleSubmit} color="#DA291C" />
    </View>
  );
};

// Estilos para os elementos da interface
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFCC00',
    padding: 20,
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
  localizacaoText: {
    marginTop: 10,
    marginBottom: 15,
    fontSize: 16,
    color: '#DA291C', 
  },
  imageContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 5,
  },
  removeImageButton: {
    backgroundColor: '#DA291C',
    borderRadius: 5,
    padding: 5,
  },
  removeImageText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default AdicionarRestaurante;
