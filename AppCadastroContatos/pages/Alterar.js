import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, Alert, StyleSheet } from 'react-native';
import { updateContato } from './Api';
import Icon from 'react-native-vector-icons/FontAwesome';
 
export default function Alterar({ route, navigation }) {
  const { contato } = route.params;
  const [nome, setNome] = useState(contato.Nome);
  const [idade, setIdade] = useState(contato.idade.toString());
  const [telefone, setTelefone] = useState(contato.telefone);
  const [email, setEmail] = useState(contato.email);
 
  const handleUpdate = () => {
    if (!nome || !idade || !telefone || !email) {
      Alert.alert('Atenção', 'Preencha todos os campos antes de atualizar.');
      return;
    }

    const updatedData = {
      Nome: nome,
      idade: parseInt(idade),
      telefone,
      email
    };
 
    Alert.alert(
      'Confirmação',
      'Tem certeza de que deseja alterar este contato?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Alterar',
          onPress: () => updateContato(contato.id, updatedData, navigation),
        },
      ]
    );
  };
 
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Editar Contato</Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Nome</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite o nome"
          value={nome}
          onChangeText={setNome}
          placeholderTextColor="#999"
        />

        <Text style={styles.label}>Idade</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite a idade"
          value={idade}
          onChangeText={setIdade}
          keyboardType="numeric"
          placeholderTextColor="#999"
        />

        <Text style={styles.label}>Telefone</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite o telefone"
          value={telefone}
          onChangeText={setTelefone}
          keyboardType="phone-pad"
          placeholderTextColor="#999"
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite o email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholderTextColor="#999"
        />

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={() => navigation.navigate('Home')}>
            <Icon name="times" size={20} color="#FFF" style={styles.icon} />
            <Text style={styles.buttonText}>Cancelar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.button, styles.updateButton]} onPress={handleUpdate}>
            <Icon name="check" size={20} color="#FFF" style={styles.icon} />
            <Text style={styles.buttonText}>Atualizar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f1f1',
  },
  header: {
    backgroundColor: '#C170FF',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  form: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#C170FF',
    marginBottom: 8,
  },
  input: {
    height: 50,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#f1f1f1',
    marginBottom: 20,
    fontSize: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 2,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  button: {
    flex: 1,
    height: 50,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cancelButton: {
    backgroundColor: '#FF97EE',
  },
  updateButton: {
    backgroundColor: '#C170FF',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  icon: {
    marginRight: 5,
  }
});
 