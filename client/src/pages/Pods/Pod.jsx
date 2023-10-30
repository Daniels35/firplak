import React, { useEffect, useState } from 'react';
import './Pod.css';
import api from '../../config/api';
import PodDetails from '../../components/See/PodDetails';
import Modal from '../../components/Modal/Modal';
import './Pod.css';

function Pod() {
  const [pods, setPods] = useState([]);
  const [selectedPodId, setSelectedPodId] = useState(null);
  const [isPodDetailsModalVisible, setPodDetailsModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    api.get('/pods')
      .then((response) => {
        setPods(response.data);
        setIsLoading(false); 
      })
      .catch((error) => {
        console.error('Error al obtener los Pods:', error);
        setIsLoading(false);
      });
  }, []);

  const handleDetailsClick = (podId) => {
    setSelectedPodId(podId);
    setPodDetailsModalVisible(true);
  };

  return (
    <div className="Pod-contenedor">
      <h2>Pods Generadas</h2>
      {isLoading ? (
        <p>Cargando datos...</p>
      ) : (
        <ul>
          {pods.length === 0 ? (
            <p>No hay datos disponibles.</p>
          ) : (
            pods.map((pod) => (
              <li key={pod.id}>
                <p>{`POD para la orden de entrega con ID ${pod.orders_document_id}`}</p>
                <button onClick={() => handleDetailsClick(pod.id)}>Detalles</button>
              </li>
            ))
          )}
        </ul>
      )}
      <Modal isVisible={isPodDetailsModalVisible} onClose={() => setPodDetailsModalVisible(false)}>
        <PodDetails podId={selectedPodId} />
      </Modal>
    </div>
  );
}

export default Pod;
