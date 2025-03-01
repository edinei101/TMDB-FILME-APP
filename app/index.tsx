import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Link } from 'expo-router'; // Importe o componente Link para navegação

export default function Index() {
  return (
    <View style={estilos.container}>
      <Text style={estilos.titulo}>Bem-vindo ao TMDB Filmes!</Text>
      <Text style={estilos.subtitulo}>Encontre informações sobre seus filmes favoritos.</Text>

      <Link href="/Busca" asChild>
        <TouchableOpacity style={estilos.botao}>
          <Text style={estilos.textoBotao}>Buscar Filmes</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitulo: {
    fontSize: 16,
    color: '#666',
    marginBottom: 32,
  },
  botao: {
    backgroundColor: '#6200ee',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  textoBotao: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
