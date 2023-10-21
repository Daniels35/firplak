import React, { useState, useEffect } from 'react';
import api from '../../config/api';
import './styleAdd.css';

function CreateUser() {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userRole, setUserRole] = useState('vendedor');
  const [users, setUsers] = useState([]);

  const handleUserNameChange = (e) => {
    setUserName(e.target.value);
  };

  const handleUserEmailChange = (e) => {
    setUserEmail(e.target.value);
  };

  const handleUserRoleChange = (e) => {
    setUserRole(e.target.value);
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
  
    try {
      const response = await api.post('/users', {
        name: userName,
        email: userEmail,
        role: userRole,
      });
      const { message, error, user } = response.data;
  
      if (message) {
        alert(message);
        setUserName('');
        setUserEmail('');
        setUserRole('vendedor');
        setUsers([...users, user]);
      } else if (error) {
        alert(error);
      }
    } catch (error) {
      console.error('Error al crear el usuario:', error);
    }
  };
  
  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await api.get('/users');
        const usersData = response.data;
        setUsers(usersData);
      } catch (error) {
        console.error('Error al obtener los usuarios:', error);
      }
    }
  
    fetchUsers();
  }, []);
  
  return (
    <div className='user-container'>
      <h1>Crear Usuario</h1>
      <form onSubmit={handleCreateUser}>
        <label>Nombre del usuario:</label>
        <input
          type="text"
          value={userName}
          onChange={handleUserNameChange}
        />
        <label>Correo electrónico:</label>
        <input
          type="email"
          value={userEmail}
          onChange={handleUserEmailChange}
        />
        <label>Rol:</label>
        <select value={userRole} onChange={handleUserRoleChange}>
          <option value="vendedor">Vendedor</option>
          <option value="admin">Admin</option>
          <option value="observador">Observador</option>
        </select>
        <button type="submit">Guardar</button>
      </form>
      <div>
        {users.length > 0 && (
          <div>
            <h2>Usuarios existentes:</h2>
            <ul>
              {users.map((user) => (
                <li key={user.id}>{`${user.name} (${user.email}) - Rol: ${user.role}`}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default CreateUser;
