import React, { useState } from 'react';
import axios from 'axios'; // Certifique-se de ter o axios instalado: npm install axios

const CreateRolePage = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const createRole = async () => {
    try {
      // Substitua 'seu_token_aqui' pelo token real que você obteve após a autenticação
      const token = 'seu_token_aqui';

      const config = {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      };

      const data = {
        name,
        description
      };

      const response = await axios.post('http://localhost:3030/roles', data, config);
      console.log('Role criada:', response.data);
      // Lógica para redirecionar ou mostrar uma mensagem de sucesso
    } catch (error) {
      // Trate os erros, como falta de permissão, falha na requisição, etc.
      console.error('Erro ao criar a Role:', error);
    }
  };

  return (
    <div>
      <h1>Cadastro de Role</h1>
      <input
        type="text"
        placeholder="Nome da Role"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Descrição"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button onClick={createRole}>Criar Role</button>
    </div>
  );
};

export default CreateRolePage;
