const API_URL = 'http://10.0.2.2:8000/api/contato';
import { Alert } from 'react-native';

// Função para buscar os contatos
export const fetchContatos = async (setRegistros) => {
  try {
    console.log('Iniciando requisição para:', API_URL);
    console.log('Método: GET');
    
    const response = await fetch(API_URL);
    console.log('Status da resposta:', response.status);
    console.log('Headers da resposta:', response.headers);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Erro na resposta da API - Status:', response.status);
      console.error('Corpo da resposta de erro:', errorText);
      throw new Error(`Erro ao buscar contatos: ${response.status} - ${errorText}`);
    }
    
    const result = await response.json();
    console.log('Dados recebidos com sucesso:', result);
    setRegistros(result.data);
  } catch (error) {
    console.error('Erro completo:', error);
    console.error('Nome do erro:', error.name);
    console.error('Mensagem do erro:', error.message);
    console.error('Stack trace:', error.stack);
    Alert.alert('Erro', `Não foi possível carregar os contatos: ${error.message}`);
    throw error;
  }
};

// Função para criar um contato
export const createContato = async (contatoData) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contatoData),
    });

    if (response.status === 201 || response.status === 200) {
      return true;
    }

    const textResponse = await response.text();
    let responseData;
    try {
      responseData = JSON.parse(textResponse);
    } catch (error) {
      console.warn('A resposta não é um JSON válido:', textResponse);
      throw new Error('Erro ao processar resposta da API');
    }

    if (!responseData) {
      throw new Error('Resposta vazia da API');
    }

    if (!response.ok) {
      throw new Error(responseData.message || 'Erro desconhecido na API');
    }

    return responseData.success;
  } catch (error) {
    console.error('Erro ao cadastrar contato:', error.message);
    Alert.alert('Erro ao cadastrar', `Detalhes: ${error.message}`);
    return false;
  }
};

// Função para deletar um contato
export const deleteContato = async (contatoId, setRegistros) => {
  try {
    const response = await fetch(`${API_URL}/${contatoId}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      const responseData = await response.json();
      if (responseData.success) {
        Alert.alert('Sucesso!', responseData.message);
        setRegistros((prevRegistros) => {
          const novaLista = prevRegistros.filter((contato) => contato.id !== contatoId);
          return novaLista;
        });
      } else {
        Alert.alert('Erro', responseData.message);
      }
    } else {
      const textResponse = await response.text();
      let responseData = null;

      try {
        responseData = JSON.parse(textResponse);
      } catch (error) {
        console.warn('A resposta não é um JSON válido.');
      }

      throw new Error(responseData?.message || 'Erro desconhecido ao excluir o contato');
    }
  } catch (error) {
    console.error('Erro ao excluir contato:', error.message);
    Alert.alert('Erro ao excluir', `Detalhes: ${error.message}`);
  }
};

// Função para atualizar um contato
export const updateContato = async (contatoId, updatedData, navigation) => {
  try {
    const response = await fetch(`${API_URL}/${contatoId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    });

    if (response.status === 200) {
      Alert.alert('Sucesso!', 'Contato atualizado com sucesso!');
      navigation.navigate('Home');
      return;
    }

    const textResponse = await response.text();
    let responseData;
    try {
      responseData = JSON.parse(textResponse);
    } catch (error) {
      console.warn('A resposta não é um JSON válido.');
      throw new Error('Erro ao processar resposta da API');
    }

    throw new Error(responseData?.message || 'Erro desconhecido ao atualizar o contato');
  } catch (error) {
    console.error('Erro ao atualizar contato:', error.message);
    Alert.alert('Erro ao atualizar', `Detalhes: ${error.message}`);
  }
};