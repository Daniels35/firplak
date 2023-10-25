import React, { useState, useEffect } from 'react';
import api from '../../config/api';
import './styleSee.css';

function Pto1() {
  const [inventoryRecords, setInventoryRecords] = useState([]);

  useEffect(() => {
    api.get('/inventories-pto1')
      .then((response) => {
        setInventoryRecords(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener registros de inventario en Pto1:', error);
      });
  }, []);

  return (
    <div className="pto1-container">
      <h1>Inventario Pto1</h1>
      {inventoryRecords.length > 0 ? (
        <ul>
          {inventoryRecords.map((record) => (
            <li key={record.id}>
              Producto: {record.product_id},
              Cantidad: {record.cantidad},
              Fecha de Transferencia: {record.transfer_date}
            </li>
          ))}
        </ul>
      ) : (
        <p>No hay registros de inventario en Pto1.</p>
      )}
    </div>
  );
}

export default Pto1;
