import React, { useState, useEffect } from 'react';
import api from '../../config/api';
import CreateInventory from '../Add/CreateInventory';
import Modal from '../Modal/Modal';
import InventoryDetails from './InventoryDetails';

function Pto2() {
  const [inventoryRecords, setInventoryRecords] = useState([]);
  const [isInventoryDetailsModalVisible, setInventoryDetailsModalVisible] = useState(false);

  useEffect(() => {
    fetchInventoryRecords()
  }, []);

  function fetchInventoryRecords() {
    api.get('/inventories-pto2')
      .then((response) => {
        setInventoryRecords(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener registros de inventario en Pto2:', error);
      });
  }

  function closeModalInventory () {
    setInventoryDetailsModalVisible(false)
  }

  return (
    <div className="pto2-container">
      <CreateInventory onInventoryAdded={fetchInventoryRecords} />
      {inventoryRecords.length > 0 ? (
        <div>
          <h2>Solicitudes Pto2 existentes:</h2>
          <ul>
            {inventoryRecords.map((record) => (
              <li key={record.id}>
                Producto ID: {record.product_id}, Cantidad: {record.cantidad}, Estado: {record.estado}
                <button onClick={(e) => { e.stopPropagation(); setInventoryDetailsModalVisible(record); console.log("Datos boton: ", record); }}>Ver Detalles</button>

              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No hay registros de inventario en Pto2.</p>
      )}
      <Modal isVisible={isInventoryDetailsModalVisible} onClose={() => setInventoryDetailsModalVisible(false)}>
        <InventoryDetails inventoryData={isInventoryDetailsModalVisible} onUpdate={fetchInventoryRecords} closeModalInventory={closeModalInventory}/>
      </Modal> 
    </div>
  );
}

export default Pto2;
