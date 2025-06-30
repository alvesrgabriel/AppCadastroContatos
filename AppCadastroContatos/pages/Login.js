import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from './Firebase';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
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
      await sendPasswordResetEmail(auth, email);
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
        placeholderTextColor="#999"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor="#999"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.secondaryButton]}
        onPress={() => navigation.navigate('Registro')}
      >
        <Text style={[styles.buttonText, styles.secondaryButtonText]}>Cadastrar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.linkButton} onPress={handlePasswordReset}>
        <Text style={styles.linkButtonText}>Esqueci a senha</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f1f1',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#C170FF',
    marginBottom: 30,
  },
  input: {
    width: '100%',
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 12,
    marginBottom: 15,
    fontSize: 16,
    color: '#333',
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#C170FF',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  error: {
    color: 'red',
    marginBottom: 10,
    width: '100%',
    textAlign: 'center',
  },
  button: {
    width: '100%',
    backgroundColor: '#C170FF',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#C170FF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 18,
  },
  secondaryButton: {
    backgroundColor: '#FF97EE',
    marginTop: 15,
  },
  secondaryButtonText: {
    color: '#fff',
  },
  linkButton: {
    marginTop: 20,
  },
  linkButtonText: {
    color: '#C170FF',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;
