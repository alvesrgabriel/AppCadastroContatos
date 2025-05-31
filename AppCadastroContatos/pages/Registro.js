import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { auth, db } from './Firebase';

const RegistroScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');

  const handleRegister = async () => {
    try {
      const userCredential = await auth().createUserWithEmailAndPassword(email, password);
      const user = userCredential.user;

      // Salvar nome e bio no Firestore
      await db.collection('users').doc(user.uid).set({
        name,
        bio
      });

      Alert.alert('Sucesso! 🎉', 'Usuário cadastrado com sucesso!', [
        { text: 'OK', onPress: () => navigation.replace('Home') }
      ]);
    } catch (err) {
      Alert.alert('Erro', 'Não foi possível cadastrar. Tente novamente.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro</Text>
      <TextInput 
        style={styles.input} 
        placeholder="Nome" 
        value={name} 
        onChangeText={setName}
      />
      <TextInput 
        style={styles.input} 
        placeholder="Bio" 
        value={bio} 
        onChangeText={setBio}
      />
      <TextInput 
        style={styles.input} 
        placeholder="Email" 
        value={email} 
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput 
        style={styles.input} 
        placeholder="Senha" 
        secureTextEntry 
        value={password} 
        onChangeText={setPassword}
      />
      <View style={styles.buttonContainer}>
        <Button title="Cadastrar" onPress={handleRegister} />
        <Button title="Voltar" onPress={() => navigation.goBack()} color="#666" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20
  },
  input: { 
    width: '100%', 
    padding: 15, 
    borderWidth: 1, 
    marginVertical: 8,
    borderRadius: 5,
    borderColor: '#ddd'
  },
  buttonContainer: {
    width: '100%',
    gap: 10,
    marginTop: 10
  }
});

export default RegistroScreen;