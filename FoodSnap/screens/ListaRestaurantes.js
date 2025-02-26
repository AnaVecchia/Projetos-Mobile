import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Alert, Modal, TextInput, Button, Image } from 'react-native';
import { database } from '../firebase'; 
import { ref, onValue, update, remove } from 'firebase/database';
import * as ImagePicker from 'expo-image-picker'; //Para acessar a câmera e a galeria de imagens do dispositivo.

const ListaRestaurantes = () => {
  const [restaurantes, setRestaurantes] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedRestaurante, setSelectedRestaurante] = useState(null);
  const [nome, setNome] = useState('');
  const [localizacao, setLocalizacao] = useState('');
  const [data, setData] = useState('');
  const [novaImagem, setNovaImagem] = useState(null);

  useEffect(() => {
    // Referência ao nó "restaurantes" no banco de dados Firebase
    const restaurantesRef = ref(database, 'restaurantes/');

    // Ouve mudanças no banco de dados e atualiza a lista de restaurantes
    onValue(restaurantesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        // Transforma os dados em um array para serem exibidos na FlatList
        const restaurantesList = Object.entries(data).map(([key, value]) => ({
          id: key,
          ...value,
        }));
        setRestaurantes(restaurantesList);
      } else {
        setRestaurantes([]);
      }
    });
  }, []);

  // Função para renderizar cada item da lista de restaurantes
  const renderRestaurante = ({ item }) => (
    <TouchableOpacity style={styles.item} onPress={() => handlePress(item)}>
      <Text style={styles.itemText}>{item.nome}</Text>
      <Text style={styles.itemText}>{item.localizacao}</Text>
      <Text style={styles.itemText}>{item.data}</Text>
      <Image source={{ uri: item.imagem }} style={styles.itemImage} />
      <Button title="Editar" onPress={() => openEditModal(item)} />
      <Button title="Excluir" onPress={() => handleDelete(item.id)} color="red" />
    </TouchableOpacity>
  );

  // Exibe um alerta com detalhes do restaurante ao clicar em um item
  const handlePress = (restaurante) => {
    Alert.alert('Detalhes do Restaurante', `Nome: ${restaurante.nome}\nLocalização: ${restaurante.localizacao}\nData: ${restaurante.data}`);
  };

  // Abre o modal de edição e preenche os campos com dados do restaurante selecionado
  const openEditModal = (restaurante) => {
    setSelectedRestaurante(restaurante);
    setNome(restaurante.nome);
    setLocalizacao(restaurante.localizacao);
    setData(restaurante.data);
    setNovaImagem(restaurante.imagem); 
    setModalVisible(true);
  };

  // Remove o restaurante do banco de dados
  const handleDelete = (id) => {
    const restauranteRef = ref(database, `restaurantes/${id}`);
    remove(restauranteRef)
      .then(() => {
        Alert.alert('Sucesso', 'Restaurante excluído com sucesso!');
      })
      .catch((error) => {
        Alert.alert('Erro', 'Erro ao excluir restaurante: ' + error.message);
      });
  };

  // Atualiza os dados do restaurante no banco de dados
  const handleUpdate = () => {
    if (selectedRestaurante) {
      const restauranteRef = ref(database, `restaurantes/${selectedRestaurante.id}`);
      const updatedData = {
        nome,
        localizacao,
        data,
        imagem: novaImagem, 
      };

      update(restauranteRef, updatedData)
        .then(() => {
          Alert.alert('Sucesso', 'Restaurante atualizado com sucesso!');
          setModalVisible(false);
        })
        .catch((error) => {
          Alert.alert('Erro', 'Erro ao atualizar restaurante: ' + error.message);
        });
    }
  };

  // Abre o seletor de imagem para tirar uma foto ou escolher da galeria
  const handleImagePick = async () => {
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
                setNovaImagem(cameraResult.assets[0].uri);
              }
            },
          },
          {
            text: options[1],
            onPress: async () => {
              const galleryResult = await ImagePicker.launchImageLibraryAsync();
              if (!galleryResult.canceled) {
                setNovaImagem(galleryResult.assets[0].uri);
              }
            },
          },
          { text: options[2], style: 'cancel' },
        ]
      );
    } else {
      Alert.alert('Permissão para acessar a câmera foi negada.');
    }
  };

  return (
    <View style={styles.container}>
      {/* Lista de restaurantes usando FlatList */}
      <FlatList
        data={restaurantes}
        renderItem={renderRestaurante}
        keyExtractor={(item) => item.id}
      />
      
      {/* Modal para edição dos dados do restaurante */}
      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Editar Restaurante</Text>
          <TextInput
            style={styles.input}
            placeholder="Nome do Restaurante"
            value={nome}
            onChangeText={setNome}
          />
          <TextInput
            style={styles.input}
            placeholder="Localização"
            value={localizacao}
            onChangeText={setLocalizacao}
          />
          <TextInput
            style={styles.input}
            placeholder="DD/MM/AAAA"
            value={data}
            onChangeText={setData}
            keyboardType="numeric"
            maxLength={10}
          />
          <Button title="Escolher Nova Imagem" onPress={handleImagePick} color="#FFC300" />
          
          {novaImagem && (
            <View style={styles.imageContainer}>
              <Image source={{ uri: novaImagem }} style={styles.image} />
            </View>
          )}
          
          <Button title="Atualizar" onPress={handleUpdate} color="#DA291C" />
          <Button title="Fechar" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFCC00',
  },
  item: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#DA291C',
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  itemText: {
    fontSize: 18,
    color: '#DA291C',
  },
  itemImage: {
    width: 100,
    height: 100,
    marginVertical: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFCC00',
    padding: 20,
  },
  modalTitle: {
    fontSize: 24,
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
  imageContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 5,
  },
});

export default ListaRestaurantes;
