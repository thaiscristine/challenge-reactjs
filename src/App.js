import React, { useEffect, useState } from "react";
import api from "./services/api";
import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);

  // Listing all the repositories registered in the API when component is loaded
  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);

  // adding random new repository to the API
  async function handleAddRepository() {
    const newRepository = await api.post('repositories', {
      title: `Frontend with ReactJs${Date.now()}`,
      url: `https://github.com/thaiscristine`,
      techs: [
        "NodeJS",
        "ReactJs"
      ]
    });
    // setting mutated value to the repositories list on frontend
    setRepositories([...repositories, newRepository.data]);

    // api.post('repositories', newRepository).then(response => {
    //   const newRepository2 = response.data
    //   setRepositories([...repositories, newRepository2])}
    // );
  }

  // removing repository from the API within the id sent
  async function handleRemoveRepository(id) {
    try {
      await api.delete(`repositories/${id}`)
      // filtering repositories to remove the item with the id sent
      const repositoriesFiltered = repositories.filter(repository => repository.id !== id);
      // setting new mudated to the repositories const
      setRepositories(repositoriesFiltered);
    } catch(error) {
      alert('Error when trying to delete this repository')
    } 
  }

  return (
    <div>
      <ul data-testid="repository-list">
        { repositories &&
        repositories.map(repository => {
          return (
            <li key={repository.id}>
              { repository.title }
              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>
            </li>
          )}
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
