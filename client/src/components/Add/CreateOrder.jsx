import React, { useState, useEffect } from 'react';
import api from '../../config/api';
import './styleAdd.css';
import ProductsList from './ProductsList';
import  PhoneInput  from  'react-phone-number-input'; 
import  'react-phone-number-input/style.css';

function CreateOrder() {
  const [clientName, setClientName] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [paymentMethodId, setPaymentMethodId] = useState('');
  const [paymentStatusId, setPaymentStatusId] = useState('');
  const [userId, setUserId] = useState('');
  const [price, setPrice] = useState(0);
  const [deliveryDate, setDeliveryDate] = useState('');
  const [dispatchDate, setDispatchDate] = useState('');
  const [products, setProducts] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [paymentStatuses, setPaymentStatuses] = useState([]);
  const [users, setUsers] = useState([]);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [clearSelectedProducts, setClearSelectedProducts] = useState(false);

  const updatePrice = (newPrice) => {
    setPrice(newPrice);
  }

  const handleSaveProducts = (selectedProducts) => {
    const simplifiedProducts = selectedProducts.map(({ product, quantity }) => ({
      id_product: product.id,
      quantity: quantity,
    }));
    setProducts(simplifiedProducts);
  };
  
  const handleCreateOrder = async (e) => {
    e.preventDefault();

  if (
    !clientName ||
    !deliveryAddress ||
    !paymentMethodId ||
    !paymentStatusId ||
    !userId ||
    !price ||
    !phoneNumber ||
    !email
  ) {
    alert('Por favor, completa todos los campos obligatorios.');
    return;
  }

    try {
      const newOrder = {
        client_name: clientName,
        delivery_address: deliveryAddress,
        products: products,
        payment_method_id: paymentMethodId,
        payment_status_id: paymentStatusId,
        user_id: userId,
        price: price,
        delivery_date: deliveryDate,
        dispatch_date: dispatchDate,
        phone_number: phoneNumber,
        email: email,
      };

      console.log('Nueva Orden:', newOrder);
      
      const response = await api.post('/orders', newOrder);
      const { message, error, order } = response.data;

      if (message) {
        alert(message);
        setClearSelectedProducts(true);
        setClientName('');
        setDeliveryAddress('');
        setPaymentMethodId('');
        setPaymentStatusId('');
        setUserId('');
        setPrice(0);
        setDeliveryDate('');
        setDispatchDate('');
        setPhoneNumber('');
        setEmail('');
      } else if (error) {
        console.log(error);
      }
    } catch (error) {
      console.error('Error al crear la orden:', error);
    }
  };

  useEffect(() => {
    async function fetchPaymentMethods() {
      try {
        const response = await api.get('/payment-methods');
        const paymentMethodsData = response.data;
        setPaymentMethods(paymentMethodsData);
      } catch (error) {
        console.error('Error al obtener métodos de pago:', error);
      }
    }

    async function fetchPaymentStatuses() {
      try {
        const response = await api.get('/payment-states');
        const paymentStatusesData = response.data;
        setPaymentStatuses(paymentStatusesData);
      } catch (error) {
        console.error('Error al obtener estados de pago:', error);
      }
    }

    async function fetchUsers() {
      try {
        const response = await api.get('/users');
        const usersData = response.data;
        setUsers(usersData);
      } catch (error) {
        console.error('Error al obtener usuarios:', error);
      }
    }
    fetchPaymentMethods();
    fetchPaymentStatuses();
    fetchUsers();
  }, []);

  return (
    <div className='order-container'>
      <h1>Crear Orden</h1>
      <form onSubmit={handleCreateOrder}>
        <label>Nombre del Cliente:</label>
        <input type="text" value={clientName} onChange={(e) => setClientName(e.target.value)} />
        <label>Dirección de Entrega:</label>
        <input type="text" value={deliveryAddress} onChange={(e) => setDeliveryAddress(e.target.value)} />
        <ProductsList clearSelectedProducts={clearSelectedProducts} setClearSelectedProducts={setClearSelectedProducts} setPrice={setPrice} updatePrice={updatePrice} handleSaveProducts={handleSaveProducts}/>
        <label>Correo Electrónico:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <label>Número Contacto:</label>
        <PhoneInput
            international
            maxLength={15}
            defaultCountry="CO"
            placeholder="Número de contacto"
            value={phoneNumber}
            onChange={(value) => setPhoneNumber(value)}
            className='input-phoneNumber'/>
        <label>Método de Pago:</label>
        <select value={paymentMethodId} onChange={(e) => setPaymentMethodId(e.target.value)}>
          <option value="">Selecciona un método de pago</option>
          {paymentMethods.map((method) => (
            <option key={method.id} value={method.id}>
              {method.name_payment}
            </option>
          ))}
        </select>
        <label>Estado de Pago:</label>
        <select value={paymentStatusId} onChange={(e) => setPaymentStatusId(e.target.value)}>
          <option value="">Selecciona un estado de pago</option>
          {paymentStatuses.map((status) => (
            <option key={status.id} value={status.id}>
              {status.name_state}
            </option>
          ))}
        </select>
        <label>Usuario:</label>
        <select value={userId} onChange={(e) => setUserId(e.target.value)}>
          <option value="">Selecciona un usuario</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
        <label>Precio Total:</label>
        <input type="text" value={price} readOnly className='total-price'/>
        <button type="submit">Guardar Orden</button>
      </form>
    </div>
  );
}

export default CreateOrder;
