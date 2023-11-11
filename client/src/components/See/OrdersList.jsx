import React, { useState, useEffect } from 'react';
import api from '../../config/api';
import Loading from '../Loading/Loading';

function OrdersList() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchOrders() {
      try {
        setIsLoading(true);
        const response = await api.get('/orders');
        const ordersData = response.data;
        setOrders(ordersData);
        setIsLoading(false);
      } catch (error) {
        console.error('Error al obtener las órdenes:', error);
      }
    }

    fetchOrders();
  }, []);

  const generateDeliveryPreview = async (orderId) => {
    try {
      const response = await api.get(`/orders/${orderId}/delivery/preview`, { responseType: 'blob' });
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      window.open(url, '_blank');
    } catch (error) {
      console.error('Error al generar la vista previa de la orden:', error);
    }
  };

  return (
    <div className='orders-contain'>
      <h1>Órdenes</h1>
      <div className='info-container-order-list'>
       <p>El código <strong>QR</strong> y la <strong>información</strong> que se genera en cada orden de entrega son únicos.</p>
      </div>
      <div>
      <Loading isLoading={isLoading} />
      <ul>
        {orders.map((order) => (
          <li key={order.id}>
            ID de la orden: {order.id}
            <br />
            Nombre del Cliente: {order.client_name}
            <br />
            <button onClick={(e) => {e.stopPropagation(); e.preventDefault(); generateDeliveryPreview(order.id)}}>Ver Orden de Entrega</button>
          </li>
        ))}
      </ul>
        </div>
    </div>
  );
}

export default OrdersList;
