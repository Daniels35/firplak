import React, { useState, useEffect } from 'react';
import api from '../../config/api';

function OrdersList() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const response = await api.get('/orders');
        const ordersData = response.data;
        setOrders(ordersData);
      } catch (error) {
        console.error('Error al obtener las órdenes:', error);
      }
    }

    fetchOrders();
  }, []);

  const generateDeliveryPreview = async (orderId) => {
    try {
      // Realiza una solicitud GET al servidor para generar la vista previa del documento de entrega
      const response = await api.get(`/orders/${orderId}/delivery/preview`, { responseType: 'blob' });
      // Crea una URL para el blob de respuesta
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      // Abre la vista previa en una nueva pestaña o ventana del navegador
      window.open(url, '_blank');
    } catch (error) {
      console.error('Error al generar la vista previa de la orden:', error);
    }
  };

  return (
    <div className='orders-contain'>
      <h1>Órdenes</h1>
      <ul>
        {orders.map((order) => (
          <li key={order.id}>
            ID de la orden: {order.id}
            <br />
            Nombre del Cliente: {order.client_name}
            <br />
            <button onClick={() => generateDeliveryPreview(order.id)}>Ver Orden de Entrega</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default OrdersList;
