import React, {useState, useEffect} from "react";

import "./styles.css";

import api from './services/api';

function App() {
  const [repositories, setRepositories] = useState([]);
  async function handleAddRepository() {
    const newRepo = {
      title:`New Repository ${Date.now()}`,
      url:"http://github.com/repo",
      techs:["ReactJS"]
    }
    const response = await api.post('/repositories', newRepo);
    setRepositories([...repositories, response.data]);
  }

  useEffect(() =>{
    api.get("/repositories").then((response) => {
      setRepositories(response.data)
    })
  }, []);

  async function handleRemoveRepository(id) {
    api.delete(`/repositories/${id}`).then((response) => {
      if (response.status === 204){
        setRepositories(repositories.filter(repo => repo.id !== id))
      }
    })
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repo => (
          <li key={repo.id}>{repo.title}
            <button onClick={() => handleRemoveRepository(repo.id)}>
              Remover
            </button>
          </li>
          )
        )}
        {/* <li>
          Repositório 1

          <button onClick={() => handleRemoveRepository(1)}>
            Remover
          </button>
        </li> */}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
