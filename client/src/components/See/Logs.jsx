import React, { useState, useEffect } from 'react';
import api from '../../config/api';
import './styleSee.css';
import Loading from '../Loading/Loading';

function Logs() {
  const [logs, setlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    api.get('/logs')
      .then((response) => {
        setlogs(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error al obtener registros de inventario en Logs:', error);
      });
  }, []);

const logsInvert = [...logs].reverse();

  return (
    <div className="Logs-container">
      <h1>Auditorías</h1>
      {logs.length > 0 ? (
        <ul>
          {logsInvert.map((record) => (
            <li key={record.id}>
              Tabla Afectada: <strong>{record.affected_table}</strong>,
              Acción: <strong>{record.action_type}</strong>,
              Fecha: <strong>{record.action_date}</strong>
            </li>
          ))}
        </ul>
      ) : (
        <p>No hay registros en Logs.</p>
      )}
        <Loading isLoading={isLoading} />
    </div>
  );
}

export default Logs;
