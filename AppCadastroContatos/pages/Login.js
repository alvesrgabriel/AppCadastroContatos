import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { auth } from './Firebase';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      await auth().signInWithEmailAndPassword(email, password);
      navigation.replace('Home');
    } catch (err) {
      setError('Erro ao fazer login. Verifique suas credenciais.');
    }
  };

  const handlePasswordReset = async () => {
    if (!email) {
      Alert.alert('Atenção', 'Informe seu email para recuperar a senha.');
      return;
    }

    try {
      await auth().sendPasswordResetEmail(email);
      Alert.alert('Sucesso', 'Email de recuperação enviado. Verifique sua caixa de entrada.');
    } catch (err) {
      Alert.alert('Erro', 'Não foi possível enviar o email de recuperação.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
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
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <View style={styles.buttonContainer}>
        <Button title="Entrar" onPress={handleLogin} />
        <Button title="Cadastrar" onPress={() => navigation.navigate('Registro')} />
        <Button title="Esqueci a senha" onPress={handlePasswordReset} />
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
  error: { 
    color: 'red',
    marginBottom: 10
  },
  buttonContainer: {
    width: '100%',
    gap: 10,
    marginTop: 10
  }
});

export default LoginScreen;