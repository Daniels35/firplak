import React, { useState, useEffect } from 'react';
import api from '../../config/api';

function Pto2() {
  const [inventoryRecords, setInventoryRecords] = useState([]);

  useEffect(() => {
    api.get('/inventories-pto2')
      .then((response) => {
        setInventoryRecords(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener registros de inventario en Pto2:', error);
      });
  }, []);

  return (
    <div className="pto2-container">
      <h1>Registros de Inventario en Pto2</h1>
      <ul>
        {inventoryRecords.map((record) => (
          <li key={record.id}>
            <p>Producto:</p> {record.product_id}
            <p>Cantidad:</p> {record.cantidad}
            <p>Estado:</p> {record.estado}
            <p>Fecha de Solicitud:</p> {record.fecha_solicitud}
            <p>Nombre del Usuario:</p> <UserName userId={record.user_id} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function UserName({ userId }) {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    api.get(`/users/${userId}`)
      .then((response) => {
        setUserName(response.data[0].name);
      })
      .catch((error) => {
        console.error('Error al obtener el nombre del usuario:', error);
      });
  }, [userId]);

  return <span>{userName}</span>;
}

export default Pto2;
