import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../config/api';

import './PodsDetail.css';

function PodsDetail() {
  const { id } = useParams(); 
  const [orderData, setOrderData] = useState(null);
  const [image, setImage] = useState(null);
  const [testImage, setTestImage] = useState(null);
  const [observations, setObservations] = useState('');
  const [state, setState] = useState('entregado');
  const [imagePreview, setImagePreview] = useState(null);
  const [testImagePreview, setTestImagePreview] = useState(null);

  useEffect(() => {
    api.get(`/orders/${id}`)
      .then((response) => {
        setOrderData(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener los datos de la orden:', error);
      });
  }, [id]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
  
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
  
      reader.readAsDataURL(file);
      setImage(file);
    }
  };

  const handleTestImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
  
      reader.onload = (e) => {
        setTestImagePreview(e.target.result);
      };
  
      reader.readAsDataURL(file);
      setTestImage(file);
    }
  };

  const handleObservationsChange = (e) => {
    setObservations(e.target.value);
  };

  const handleStateChange = (e) => {
    setState(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const formData = new FormData();
      formData.append('orders_document_id', id);
      formData.append('state', state);
      formData.append('observations', observations);
      formData.append('image', image);

      if (state === 'observacion' || state === 'rechazado') {
        formData.append('test_image', testImage);
      }

      const response = await api.post('/pods', formData);
      
      if (response.data.message) {
        alert(response.data.message);
        setImage(null);
        setTestImage(null);
        setImagePreview(null);
        setTestImagePreview(null);
        setObservations('');
        setState('entregado');
      } else {
        alert('Error al enviar POD.');
      }
    } catch (error) {
      console.error('Error al enviar POD:', error);
    }
  };

  return (
    <div className="PodsDetail-container">
      <h2>Enviar POD para la orden de entrega con ID {id}</h2>
        <h3>Información de la Orden de entrega</h3>

        {orderData ? (
      <div className='PodsDetail-container-inf'>
        <h5>Nombre cliente: <span className='PodsDetail-item'>{orderData.client_name}</span></h5>
        <h5>Dirección: <span className='PodsDetail-item'>{orderData.delivery_address}</span></h5>
        <h5>Fecha estimada de entrega: <span className='PodsDetail-item'>{orderData.delivery_date}</span></h5>
      </div>
    ) : (
      <p>Cargando datos de la orden...</p>
    )}
      <div>
        <form onSubmit={handleSubmit}>
          <span className='item-observations'>Imagen prueba de entrega</span>
          <input type="file" onChange={handleImageChange} />
          {imagePreview && (
            <div className="image-container-pods">
            <img src={imagePreview} alt="img" className='imagenPreview'/>
            <h4 onClick={() => {setImagePreview(null); setImage(null)}} className='button-close-pods'>X</h4>
            </div>
          )}
          <select value={state} onChange={handleStateChange}>
            <option value="entregado">Entregado</option>
            <option value="observacion">Observación</option>
            <option value="rechazado">Rechazado</option>
          </select>
          {state === 'observacion' || state === 'rechazado' ? (
            <>
            {state === 'observacion' ? (
              <span className='item-observations'>Imagen prueba observación</span>
            ) : state === 'rechazado' ? (
              <span className='item-observations'>Imagen prueba de rechazo</span>
            ) : null}
            <input type="file" onChange={handleTestImageChange} />
            {testImagePreview && (
              <div className="image-container-pods">
              <img src={testImagePreview} alt="Vista previa de la imagen de prueba" className='imagenPreview'/>
              <h4 onClick={() => {setTestImagePreview(null); setTestImage(null)}} className='button-close-pods'>X</h4>
              </div>
            )}
            <span className='item-observations'>
              {state === 'observacion' ? 'Observaciones' : 'Observaciones de rechazo'}
            </span>
            <textarea value={observations} onChange={handleObservationsChange} />
            </>
          ) : null}
          <button type="submit">Enviar POD</button>
        </form>
      </div>
    </div>
  );
}

export default PodsDetail;
