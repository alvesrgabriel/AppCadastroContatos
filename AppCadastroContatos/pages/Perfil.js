import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { auth } from './Firebase';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';

const PerfilScreen = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const db = getFirestore();

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
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
      const user = auth.currentUser;
      if (user) {
        const docRef = doc(db, 'users', user.uid);
        await updateDoc(docRef, { name, bio });
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
          cloud_name: 'dgsffmd9f',
        };

        const res = await fetch(
          'https://api.cloudinary.com/v1_1/dgsffmd9f/image/upload',
          {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
              'content-type': 'application/json',
            },
          }
        );

        const json = await res.json();

        if (json.secure_url) {
          const user = auth.currentUser;
          await updateDoc(doc(db, 'users', user.uid), {
            photoURL: json.secure_url,
          });
          setUserData(prev => ({ ...prev, photoURL: json.secure_url }));
          Alert.alert('Sucesso', 'Foto de perfil atualizada!');
        } else {
          Alert.alert(
            'Erro',
            'Erro ao enviar imagem. Verifique se o preset está correto.'
          );
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
        <ActivityIndicator size="large" color="#C170FF" />
      ) : userData ? (
        <>
          <Text style={styles.title}>Perfil do Usuário</Text>

          {userData.photoURL ? (
            <Image source={{ uri: userData.photoURL }} style={styles.profileImage} />
          ) : (
            <View style={[styles.profileImage, styles.noPhoto]}>
              <Text style={styles.noPhotoText}>Sem foto</Text>
            </View>
          )}

          <TouchableOpacity style={styles.button} onPress={pickImageAndUpload}>
            <Text style={styles.buttonText}>Editar Foto de Perfil</Text>
          </TouchableOpacity>

          {isEditing ? (
            <>
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="Nome"
                placeholderTextColor="#999"
              />
              <TextInput
                style={[styles.input, { height: 80 }]}
                value={bio}
                onChangeText={setBio}
                placeholder="Bio"
                placeholderTextColor="#999"
                multiline
              />

              <View style={styles.buttonRow}>
                <TouchableOpacity style={[styles.button, styles.saveButton]} onPress={handleSave}>
                  <Text style={styles.buttonText}>Salvar</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.button, styles.cancelButton]}
                  onPress={() => setIsEditing(false)}
                >
                  <Text style={[styles.buttonText, { color: '#555' }]}>Cancelar</Text>
                </TouchableOpacity>
              </View>
            </>
          ) : (
            <>
              <Text style={styles.info}>Nome: {userData.name}</Text>
              <Text style={styles.info}>Bio: {userData.bio}</Text>

              <TouchableOpacity style={styles.button} onPress={() => setIsEditing(true)}>
                <Text style={styles.buttonText}>Editar</Text>
              </TouchableOpacity>
            </>
          )}
        </>
      ) : (
        <Text style={styles.info}>Usuário não encontrado.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f1f1',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#C170FF',
    marginBottom: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 15,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  noPhoto: {
    backgroundColor: '#eee',
  },
  noPhotoText: {
    color: '#888',
    fontSize: 16,
  },
  info: {
    fontSize: 18,
    color: '#444',
    marginBottom: 10,
    width: '100%',
  },
  input: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#C170FF',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
    color: '#333',
  },
  button: {
    backgroundColor: '#C170FF',
    paddingVertical: 14,
    paddingHorizontal: 25,
    borderRadius: 12,
    alignItems: 'center',
    marginVertical: 5,
    shadowColor: '#C170FF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 5,
    width: '100%',
  },
  saveButton: {
    flex: 1,
    marginRight: 10,
  },
  cancelButton: {
    backgroundColor: '#eee',
    shadowColor: 'transparent',
    elevation: 0,
    flex: 1,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  buttonRow: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: 10,
  },
});

export default PerfilScreen;
