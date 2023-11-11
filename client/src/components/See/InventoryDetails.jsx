import React, { useState, useEffect } from 'react';
import api from '../../config/api';

function InventoryDetails({ inventoryData, onUpdate, closeModalInventory }) {
  const [updatedStatus, setUpdatedStatus] = useState(inventoryData.estado);

  const handleStatusChange = (e) => {
    setUpdatedStatus(e.target.value);
  };

  const updateInventoryStatus = () => {

    api.put(`/inventories-pto2/${inventoryData.id}`, { estado: updatedStatus })
      .then((response) => {
        const { message, inventory, error } = response.data;
        if (message) {
          alert(message);
          onUpdate();
          setUpdatedStatus(inventory.estado);
        } else if (error) {
          alert('Error al actualizar el estado del inventario');
        }
      })
      .catch((error) => {
        console.error('Error al actualizar el estado del inventario:', error);
        alert('Error al actualizar el estado del inventario');
      });
  };

  const moveInventoryToPto1 = () => {
    if (updatedStatus !== 'completada') {
      alert("La solicitud debe estar completada, para poder mover el inventario a la bodega Pto1");
      return;
    }

    const confirmation = window.confirm(
      `¿Estás seguro de que deseas trasladar el inventario a Pto1 desde Pto2?`
    );

    if (confirmation) {
      moveInventoryApiCall(); // Llama a la función para mover el inventario
    }
  };

  const moveInventoryApiCall = async () => {
    try {
      const response = await api.put(`/inventories/moveProductsToPto1/${inventoryData.id}`);
      const { message, error } = response.data;
      if (message) {
        alert(message);
        onUpdate();
        closeModalInventory();
      } else if (error) {
        alert('Error al mover el inventario a Pto1', error);
      }
    } catch (error) {
      console.error('Error al mover el inventario a Pto1:', error);
      alert('Error al mover el inventario a Pto1');
    }
  };

  return (
    <div>
      <h2>Detalles del Pedido PTO2</h2>
      <p>Producto ID: {inventoryData.product_id}</p>
      <p>Cantidad: {inventoryData.cantidad}</p>
      <p>Estado:
        <select value={updatedStatus} onChange={handleStatusChange}>
          <option value="pendiente">Pendiente</option>
          <option value="procesando">Procesando</option>
          <option value="completada">Completada</option>
        </select>
        <button onClick={updateInventoryStatus}>Actualizar Estado</button>
      </p>
      <p>Fecha de Solicitud: {inventoryData.fecha_solicitud}</p>
      <p>Fecha Estimada de Entrega: {inventoryData.date_estimated}</p>
      <button onClick={moveInventoryToPto1} className='button-movepto1'>Mover a Bodega Pto1</button>
    </div>
  );
}

export default InventoryDetails;
