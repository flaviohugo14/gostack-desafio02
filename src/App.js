import React, { useState, useEffect } from "react";

import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    async function loadRepositories() {
      const response = await api.get('repositories');
  
      setRepositories(response.data);
    }
    
    loadRepositories();
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: "Desafio React",
      url: "https://github.com/flaviohugo14/gostack-desafio02",
      techs: ["ReactJS", "Jest"]
    });

    const repository = response.data;

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);
    
    const newRepositories = repositories.filter(repository => repository.id !== id);
    
    setRepositories(newRepositories);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {
          repositories.map(repository => (
            <li key={String(repository.id)}>
              {repository.title}
              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>
            </li>
          ))
        }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
