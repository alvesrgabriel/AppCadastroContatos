import React, { useState, useEffect } from 'react';
import { View, Text, Alert, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { fetchContatos, deleteContato } from './Api';

export default function Home({ navigation }) {
  const [registro, setRegistros] = useState([]);
 
  useEffect(() => {
    const loadContatos = () => {
      fetchContatos((result) => {
        setRegistros(result);
        console.log('Estado atualizado:', result);
      });
    };

    loadContatos();
    const unsubscribe = navigation.addListener('focus', loadContatos);
    return () => unsubscribe();
  }, [navigation]);
 
  const handleDelete = (id) => {
    Alert.alert(
      'Confirmação',
      'Tem certeza de que deseja deletar este contato?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Deletar',
          onPress: () => deleteContato(id, setRegistros),
        },
      ]
    );
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Contatos</Text>
        <TouchableOpacity
          style={styles.profileButton}
          onPress={() => navigation.navigate('Perfil')}
        >
          <Icon name="user" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={registro}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <View style={styles.itemHeader}>
              <View style={styles.contactInfo}>
                <Text style={styles.contactName}>{item.Nome}</Text>
                <Text style={styles.contactDetails}>{item.email}</Text>
                <Text style={styles.contactDetails}>{item.telefone}</Text>
                <Text style={styles.contactAge}>Idade: {item.idade} anos</Text>
              </View>
              <View style={styles.buttonRow}>
                <TouchableOpacity
                  style={[styles.button, styles.editButton]}
                  onPress={() => navigation.navigate('Alterar', { contato: item })}
                >
                  <Icon name="edit" size={16} color="#fff" />
                  <Text style={styles.buttonText}>Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, styles.deleteButton]}
                  onPress={() => handleDelete(item.id)}
                >
                  <Icon name="trash" size={16} color="#fff" />
                  <Text style={styles.buttonText}>Excluir</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.itemFooter}>
              <Text style={styles.dateText}>
                Criado em: {formatDate(item.created_at)}
              </Text>
              <Text style={styles.dateText}>
                Atualizado em: {formatDate(item.updated_at)}
              </Text>
            </View>
          </View>
        )}
      />

      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => navigation.navigate('Cadastro')}
      >
        <Icon name="plus" size={24} color="#FFF" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#fff',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  listContainer: {
    padding: 15,
  },
  itemContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
    overflow: 'hidden',
  },
  itemHeader: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  contactInfo: {
    marginBottom: 15,
  },
  contactName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  contactDetails: {
    fontSize: 16,
    color: '#666',
    marginBottom: 2,
  },
  contactAge: {
    fontSize: 14,
    color: '#888',
    marginTop: 5,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  deleteButton: {
    backgroundColor: '#e74c3c',
  },
  editButton: {
    backgroundColor: '#3498db',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
    marginLeft: 5,
  },
  itemFooter: {
    padding: 12,
    backgroundColor: '#fafafa',
  },
  dateText: {
    color: '#666',
    fontSize: 12,
    marginBottom: 2,
  },
  floatingButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#2ecc71',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  profileButton: {
    position: 'absolute',
    right: 20,
    top: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2.22,
    elevation: 3,
  },
});
 
 