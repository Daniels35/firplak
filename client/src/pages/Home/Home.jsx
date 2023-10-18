import React, { useState } from 'react';
import { BsCaretDownFill, BsCaretUpFill } from 'react-icons/bs';
import './Home.css';

function Home() {
  const [categoriasAbiertas, setCategoriasAbiertas] = useState(false);
  const [verAbierto, setVerAbierto] = useState(false);
  const [otrasAbiertas, setOtrasAbiertas] = useState(false);

  return (
    <div className="Home-contenedor">
      <div className="form-home-container">
        <div className="viñeta">
          <h1>Agregar</h1>
          <div className="descripcion">
            En esta sección podrás agregar a la base de datos Categorías, Colores, Usuarios, Productos, Métodos de pago, Estado de pago, Inventarios en la bodega Pto1 y Pto2, se recomienda hacerlo con moderación puesto que esto es un proyecto. Haz clic en <BsCaretDownFill className='icon-viñeta-text'/> para abrir la lista completa..
          </div>
          <button onClick={() => setCategoriasAbiertas(!categoriasAbiertas)}>
            {categoriasAbiertas ? <BsCaretUpFill className='icon-viñeta'/> : <BsCaretDownFill className='icon-viñeta'/>}
          </button>
          {categoriasAbiertas && (
            <ul>
              <li>Categorías</li>
              <li>Colores</li>
              <li>Usuarios</li>
              <li>Productos</li>
              <li>Métodos de Pago</li>
              <li>Estado de Pago</li>
              <li>Agregar inventario en bodega Pto1</li>
              <li>Agregar inventario en bodega Pto2</li>
            </ul>
          )}
        </div>
        <div className="viñeta">
          <h1>Ver</h1>
          <div className="descripcion">
            Aquí podrás ver toda la información que se tiene en la base de datos, Documentos de entrega, guías maestras, métodos de pago, categorías, colores, productos, inventarios en bodega Pto1 y Pto2, usuarios, estados de pago.
          </div>
          <button onClick={() => setVerAbierto(!verAbierto)}>
            {verAbierto ? <BsCaretUpFill className='icon-viñeta'/> : <BsCaretDownFill className='icon-viñeta'/>}
          </button>
          {verAbierto && (
            <ul>
              <li>Documentos de entrega</li>
              <li>Guías maestras</li>
              <li>Métodos de pago</li>
              <li>Categorías</li>
              <li>Colores</li>
              <li>Usuarios</li>
              <li>Productos</li>
              <li>Estado de Pago</li>
              <li>Inventario en bodega Pto1</li>
              <li>Inventario en bodega Pto2</li>
            </ul>
          )}
        </div>
        <div className="viñeta">
        <h1>Funciones</h1>
          <div className="descripcion">
            Aquí podrás hacer pedidos de compra, enviar prueba POD y más.
          </div>
          <button onClick={() => setOtrasAbiertas(!otrasAbiertas)}>
            {otrasAbiertas ? <BsCaretUpFill className='icon-viñeta'/> : <BsCaretDownFill className='icon-viñeta'/>}
          </button>
          {otrasAbiertas && (
            <ul>
              <li>Pedidos de compra</li>
              <li>Enviar prueba POD</li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
