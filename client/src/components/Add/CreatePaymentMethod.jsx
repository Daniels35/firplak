import React, { useState, useEffect } from 'react';
import api from '../../config/api';
import Loading from '../Loading/Loading';
import './styleAdd.css';

function CreatePaymentMethod() {
  const [paymentMethodName, setPaymentMethodName] = useState('');
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handlePaymentMethodNameChange = (e) => {
    setPaymentMethodName(e.target.value);
  };

  const handleCreatePaymentMethod = async (e) => {
    e.preventDefault();

    if (!paymentMethodName.trim()) {
      alert('Debes ingresar un metodo de pago.')
      return;
    }

    try {
      const response = await api.post('/payment-methods', { name_payment: paymentMethodName });
      const { message, error, paymentMethod } = response.data;

      if (message) {
        alert(message);
        setPaymentMethodName('');
        setPaymentMethods([...paymentMethods, paymentMethod]);
      } else if (error) {
        alert(error);
      }
    } catch (error) {
      console.error('Error al crear el método de pago:', error);
    }
  };

  useEffect(() => {
    async function fetchPaymentMethods() {
      try {
        setIsLoading(true);
        const response = await api.get('/payment-methods');
        const paymentMethodsData = response.data;
        setPaymentMethods(paymentMethodsData);
        setIsLoading(false);
      } catch (error) {
        console.error('Error al obtener los métodos de pago:', error);
      }
    }

    fetchPaymentMethods();
  }, []);

  return (
    <div className='payment-method-container'>
      <h1>Crear Método de Pago</h1>
      <form onSubmit={handleCreatePaymentMethod}>
        <label>Nombre del Método de Pago:</label>
        <input
          type="text"
          value={paymentMethodName}
          onChange={handlePaymentMethodNameChange}
        />
        <button type="submit">Guardar</button>
      </form>
      <div>
        {paymentMethods.length > 0 && (
          <div>
            <h2>Métodos de Pago existentes:</h2>
            <ul>
              {paymentMethods.map((paymentMethod) => (
                <li key={paymentMethod.id}>{paymentMethod.name_payment}</li>
              ))}
            </ul>
          </div>
        )}
        <Loading isLoading={isLoading} />
      </div>
    </div>
  );
}

export default CreatePaymentMethod;
