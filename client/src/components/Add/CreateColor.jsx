import React, { useState, useEffect } from 'react';
import api from '../../config/api';
import './styleAdd.css';

function CreateColor() {
  const [colorName1, setColorName1] = useState('');
  const [colorName2, setColorName2] = useState('');
  const [colorCode, setColorCode] = useState('');
  const [colores, setColores] = useState([]);

  const handleColorName1Change = (e) => {
    setColorName1(e.target.value);
  };

  const handleColorName2Change = (e) => {
    setColorName2(e.target.value);
  };

  const handleColorCodeChange = (e) => {
    setColorCode(e.target.value);
  };

  const handleCreateColor = async (e) => {
    e.preventDefault();

    if (!colorName1.trim() || !colorCode.trim()) {
      alert('El campo Nombre 1 y Código del color no puede estar vacío.');
      return;
    }
  
    try {
      const response = await api.post('/colors', { name1: colorName1, name2: colorName2, code: colorCode });
      const { message, error, color } = response.data;
  
      if (message) {
        alert(message);
        setColorName1('');
        setColorName2('');
        setColorCode('');
        setColores([...colores, color]);
      } else if (error) {
        alert(error);
      }
    } catch (error) {
      console.error('Error al crear el color:', error);
    }
  };
  
  useEffect(() => {
    async function fetchColores() {
      try {
        const response = await api.get('/colors');
        const coloresData = response.data;
        setColores(coloresData);
      } catch (error) {
        console.error('Error al obtener los colores:', error);
      }
    }
  
    fetchColores();
  }, []);
  
  return (
    <div className='color-container'>
      <h1>Crear Color</h1>
      <form onSubmit={handleCreateColor}>
        <label>Nombre 1 del color:</label>
        <input
          type="text"
          value={colorName1}
          onChange={handleColorName1Change}
        />
        <label>Nombre 2 del color:</label>
        <input
          type="text"
          value={colorName2}
          onChange={handleColorName2Change}
        />
        <label>Código del color:</label>
        <input
          type="text"
          value={colorCode}
          onChange={handleColorCodeChange}
        />
        <button type="submit">Guardar</button>
      </form>
      <div>
        {colores.length > 0 && (
          <div>
            <h2>Colores existentes:</h2>
            <ul>
              {colores.map((color) => (
                <li key={color.id}>{`${color.name1} / ${color.name2} (${color.code})`}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default CreateColor;
