import React, { useEffect, useState } from 'react';
import api from '../../config/api';
import './styleSee.css';

function PodDetails(podId) {
  const id = podId.podId;
  const [podDetails, setPodDetails] = useState(null);

  useEffect(() => {
    api.get(`/pods/${id}`)
      .then((response) => {
        setPodDetails(response.data);
      })
      .catch((error) => {
        console.error(`Error al obtener los detalles del POD con ID ${id}:`, error);
      });
  }, [id]);

  if (!podDetails) {
    return <p>Cargando detalles del POD...</p>;
  }

  return (
    <div className='pod-details-component'>
      <h2>Detalles del POD para la orden de entrega con ID {podDetails.orders_document_id}</h2>
      <p>Estado: {podDetails.state}</p>
      <p>Observaciones: {podDetails.observations || 'Ninguna'}</p>
      <h5>Imagen Prueba Firma</h5>
      <img src={podDetails.image || ''} alt="image" className='image-podDetails'/>
      {podDetails.test_image && (
        <div>
            <h5>Imagen Prueba observaciones o Rechazo</h5>
            <img src={podDetails.test_image} alt="image" className='image-podDetails' />
        </div>
        )}
    </div>
  );
}

export default PodDetails;
