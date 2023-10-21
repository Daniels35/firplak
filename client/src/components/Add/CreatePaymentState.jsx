import React, { useState, useEffect } from 'react';
import api from '../../config/api';
import './styleAdd.css';

function CreatePaymentState() {
  const [paymentStateName, setPaymentStateName] = useState('');
  const [paymentStates, setPaymentStates] = useState([]);

  const handlePaymentStateNameChange = (e) => {
    setPaymentStateName(e.target.value);
  };

  const handleCreatePaymentState = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post('/payment-states', { name_state: paymentStateName });
      const { message, error, paymentState } = response.data;

      if (message) {
        alert(message);
        setPaymentStateName('');
        setPaymentStates([...paymentStates, paymentState]);
      } else if (error) {
        alert(error);
      }
    } catch (error) {
      console.error('Error al crear el estado de pago:', error);
    }
  };

  useEffect(() => {
    async function fetchPaymentStates() {
      try {
        const response = await api.get('/payment-states');
        const paymentStatesData = response.data;
        setPaymentStates(paymentStatesData);
      } catch (error) {
        console.error('Error al obtener los estados de pago:', error);
      }
    }

    fetchPaymentStates();
  }, []);

  return (
    <div className='payment-state-container'>
      <h1>Crear Estado de Pago</h1>
      <form onSubmit={handleCreatePaymentState}>
        <label>Nombre del Estado de Pago:</label>
        <input
          type="text"
          value={paymentStateName}
          onChange={handlePaymentStateNameChange}
        />
        <button type="submit">Guardar</button>
      </form>
      <div>
        {paymentStates.length > 0 && (
          <div>
            <h2>Estados de Pago existentes:</h2>
            <ul>
              {paymentStates.map((paymentState) => (
                <li key={paymentState.id}>{paymentState.name_state}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default CreatePaymentState;
