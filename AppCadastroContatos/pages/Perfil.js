import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TextInput, Button, Alert, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { auth, db } from './Firebase';

const Perfil = ({ navigation }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth().currentUser;
      if (user) {
        const userDoc = await db.collection('users').doc(user.uid).get();
        if (userDoc.exists) {
          const data = userDoc.data();
          setUserData(data);
          setName(data.name || '');
          setBio(data.bio || '');
        }
      }
      setLoading(false);
    };

    fetchUserData();
  }, []);

  const handleSave = async () => {
    try {
      const user = auth().currentUser;
      if (user) {
        await db.collection('users').doc(user.uid).update({ 
          name, 
          bio 
        });
        setUserData({ ...userData, name, bio });
        setIsEditing(false);
        Alert.alert('Sucesso', 'Dados atualizados com sucesso!');
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível atualizar os dados.');
    }
  };

  const pickImageAndUpload = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
        base64: true,
      });
      
      if (!result.canceled) {
        const base64Img = `data:image/jpg;base64,${result.assets[0].base64}`;
        // Dados para o Cloudinary
        const data = {
          file: base64Img,
          upload_preset: 'preset_publico',
          cloud_name: 'dhq2o20io',
        };
        
        const res = await fetch('https://api.cloudinary.com/v1_1/dhq2o20io/image/upload', {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            'content-type': 'application/json',
          },
        });
        
        const json = await res.json();
  
        if (json.secure_url) {
          const user = auth().currentUser;
          await db.collection('users').doc(user.uid).update({
            photoURL: json.secure_url,
          });
          setUserData(prev => ({ ...prev, photoURL: json.secure_url }));
          Alert.alert('Sucesso', 'Foto de perfil atualizada!');
        } else {
          Alert.alert('Erro', 'Erro ao enviar imagem. Verifique se o preset está correto.');
        }
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Algo deu errado ao tentar fazer o upload.');
    }
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : userData ? (
        <>
          <Text style={styles.title}>Perfil do Usuário</Text>
          
          {/* Exibe a foto se existir */}
          {userData.photoURL ? (
            <Image
              source={{ uri: userData.photoURL }}
              style={styles.profileImage}
            />
          ) : (
            <Text style={styles.info}>Nenhuma foto cadastrada.</Text>
          )}
          <Button title="Editar Foto de Perfil" onPress={pickImageAndUpload} />

          {isEditing ? (
            <>
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="Nome"
              />
              <TextInput
                style={styles.input}
                value={bio}
                onChangeText={setBio}
                placeholder="Bio"
              />
              <View style={styles.buttonContainer}>
                <Button title="Salvar" onPress={handleSave} />
                <Button title="Cancelar" onPress={() => setIsEditing(false)} color="#888" />
              </View>
            </>
          ) : (
            <>
              <Text style={styles.info}>Nome: {userData.name}</Text>
              <Text style={styles.info}>Bio: {userData.bio}</Text>
              <Button title="Editar" onPress={() => setIsEditing(true)} />
            </>
          )}
        </>
      ) : (
        <Text>Usuário não encontrado.</Text>
      )}
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
  info: { 
    fontSize: 18, 
    marginBottom: 10,
    textAlign: 'center'
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 15,
    marginVertical: 8,
    fontSize: 16,
    borderRadius: 5,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  buttonContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  }
});

export default Perfil;