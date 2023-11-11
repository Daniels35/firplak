import React, { useState, useEffect } from 'react';
import api from '../../config/api';
import SelectProduct from './SelectProduct';

function CreateInventory({onInventoryAdded}) {
  const [product_id, setProductID] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [estado, setEstado] = useState('pendiente');
  const [inventories, setInventories] = useState([]);
  const [usuario, setUsuario] = useState([]);
  const [usuarioId, setUsuarioId] = useState([]);

  const handleProductSelect = (product, quantity) => {
    setProductID(product.id);
    setCantidad(quantity);
  };


  const handleEstadoChange = (e) => {
    setEstado(e.target.value);
  };

  const handleUsuarioChange = (e) => {
    setUsuarioId(e.target.value);
  };

  const handleCreateInventory = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (cantidad === "0") {
      alert('La cantidad debe ser mayor a 0.');
      return;
    }

    if (usuarioId.length === 0) {
      alert('Debes seleccionar un usuario.');
      return;
    }

        if (!product_id.trim() || !cantidad || !estado.trim() || !usuarioId) {
      alert('Los campos Producto, cantidad, estado y usuario no pueden estar vacío.');
      return;
    }

    try {
      const newInventory = {
        product_id,
        cantidad,
        estado,
        user_id: usuarioId,
      };

      console.log("Datos que se van enviar: ", newInventory);

      const response = await api.post('/inventories-pto2', newInventory);
      const { message, error, inventory } = response.data;

      if (message) {
        alert(message);
        setProductID('');
        setCantidad('');
        setEstado('pendiente');
        setUsuarioId([]);
        setInventories([...inventories, inventory]);
        onInventoryAdded();
      } else if (error) {
        alert(error);
      }
    } catch (error) {
      console.error('Error al crear el inventario:', error);
    }
  };

  useEffect(() => {
    async function fetchInventories() {
      try {
        const response = await api.get('/inventories-pto2');
        const inventoriesData = response.data;
        setInventories(inventoriesData);
      } catch (error) {
        console.error('Error al obtener los inventarios:', error);
      }
    }

    async function fetchUsuarios() {
        try {
          const response = await api.get('/users');
          const usuariosData = response.data;
          setUsuario(usuariosData);
        } catch (error) {
          console.error('Error al obtener la lista de usuarios:', error);
        }
      }

    fetchInventories();
    fetchUsuarios();
  }, []);

  return (
    <div className='inventory-container'>
      <h1>Ingresar reposición PTO2</h1>
        <SelectProduct handleProductSelect={handleProductSelect} />
      <form >
        <label>Estado:</label>
        <select value={estado} onChange={handleEstadoChange}>
          <option value="pendiente">Pendiente</option>
          <option value="procesando">Procesando</option>
          <option value="completada">Completada</option>
        </select>
        <label>Usuario:</label>
        <select value={usuarioId} onChange= {handleUsuarioChange}>
          <option value="">Seleccionar Usuario</option>
          {usuario.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
        <button type="submit" onClick={handleCreateInventory}>Guardar</button>
      </form>
    </div>
  );
}

export default CreateInventory;
