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
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
      <div className='info-container-pod'>
        <h2>POD</h2>
        <p>Aquí podrás encontrar las POD (Pruebas de Entrega) de las órdenes de entrega. Para ingresar las POD, ve a la página de inicio y haz clic en <strong>"Documentos de Entrega"</strong>. Luego, selecciona la opción <strong>"Ver Orden de Entrega"</strong>, escanea el código <strong>QR</strong> con tu celular e ingresa la POD. Este código de QR es único para cada Documento de Entrega.</p>
      </div>
      <h3>Pods Generadas</h3>
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
