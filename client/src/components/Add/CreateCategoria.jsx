import React, { useState, useEffect } from 'react';
import api from '../../config/api';
import './styleAdd.css';

function CreateCategoria() {
  const [categoriaName, setCategoriaName] = useState('');
  const [categorias, setCategorias] = useState([]);

  const handleCategoriaNameChange = (e) => {
    setCategoriaName(e.target.value);
  };

  const handleCreateCategoria = async (e) => {
    e.preventDefault();
  
    try {
      const response = await api.post('/categorias', { name: categoriaName });
      const { message, error, categoria } = response.data;
  
      if (message) {
        alert(message);
        setCategoriaName('');
        setCategorias([...categorias, categoria]);
      } else if (error) {
        alert(error);
      }
    } catch (error) {
      console.error('Error al crear la categoría:', error);
    }
  };
  
  useEffect(() => {
    async function fetchCategorias() {
      try {
        const response = await api.get('/categorias');
        const categoriasData = response.data;
        setCategorias(categoriasData);
      } catch (error) {
        console.error('Error al obtener las categorías:', error);
      }
    }
  
    fetchCategorias();
  }, []);
  
  return (
    <div className='categoria-container'>
      <h1>Crear Categoría</h1>
      <form onSubmit={handleCreateCategoria}>
        <label>Nombre de la categoría:</label>
        <input
          type="text"
          value={categoriaName}
          onChange={handleCategoriaNameChange}
        />
        <button type="submit">Guardar</button>
      </form>
      <div>
        {categorias.length > 0 && (
            <div>
            <h2>Categorías existentes:</h2>
            <ul>
                {categorias.map((categoria) => (
                <li key={categoria.id}>{categoria.name}</li>
                ))}
            </ul>
            </div>
        )}
        </div>
    </div>
  );
}

export default CreateCategoria;
