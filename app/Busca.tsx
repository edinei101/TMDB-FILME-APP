import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, FlatList, Text, Image, ActivityIndicator, Alert } from 'react-native';


import { buscarFilmes , Filme} from '../src/servicos/tmdb';


const Busca = () => {
  const [filme, setFilme] = useState('');
  const [resultados, setResultados] = useState<Filme[]>([]);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState('');

  const buscarFilmesHandler = async () => {
    if (!filme.trim()) {
      Alert.alert('Campo vazio', 'Por favor, digite o nome de um filme.');
      return;
    }

    setCarregando(true);
    setErro('');

    try {
      const filmes = await buscarFilmes(filme);
      if (filmes.length === 0) {
        setErro('Nenhum filme encontrado.');
      }
      setResultados(filmes);
    } catch (error) {
      setErro('Ocorreu um erro ao buscar os filmes. Tente novamente.');
      console.error(error);
    } finally {
      setCarregando(false);
    }
  };

  return (
    <View style={estilos.container}>
      <TextInput
        style={estilos.input}
        placeholder="Digite o nome do filme"
        value={filme}
        onChangeText={setFilme}
      />
      <Button title="Buscar" onPress={buscarFilmesHandler} />

      {carregando && <ActivityIndicator size="large" color="#6200ee" style={estilos.carregando} />}

      {erro ? (
        <Text style={estilos.erro}>{erro}</Text>
      ) : (
        <FlatList
          data={resultados}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={estilos.item}>
              <Image
                source={{ uri: `https://image.tmdb.org/t/p/w200${item.poster_path}` }}
                style={estilos.poster}
              />
              <View style={estilos.info}>
                <Text style={estilos.titulo}>{item.title}</Text>
                <Text style={estilos.data}>{item.release_date}</Text>
                <Text numberOfLines={3} style={estilos.sinopse}>
                  {item.overview}
                </Text>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
};

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  item: {
    flexDirection: 'row',
    padding: 16,
    marginBottom: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  poster: {
    width: 100,
    height: 150,
    borderRadius: 8,
  },
  info: {
    flex: 1,
    marginLeft: 16,
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  data: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  sinopse: {
    fontSize: 14,
    color: '#444',
  },
  carregando: {
    marginTop: 20,
  },
  erro: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
});

export default Busca;