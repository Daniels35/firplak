import React, { useState } from 'react';
import { BsCaretDownFill, BsCaretUpFill } from 'react-icons/bs';
import Modal from '../../components/Modal/Modal';
import './Home.css';
import CreateCategoria from '../../components/Add/CreateCategoria';
import CreateColor from '../../components/Add/CreateColor';
import CreateUser from '../../components/Add/CreateUser';
import OrdersList from '../../components/See/OrdersList';
import CreateProduct from '../../components/Add/CreateProduct';
import CreatePaymentMethod from '../../components/Add/CreatePaymentMethod';
import CreatePaymentState from '../../components/Add/CreatePaymentState';
import Pto1 from '../../components/See/Pto1';
import Pto2 from '../../components/See/Pto2';
import CreateOrder from '../../components/Add/CreateOrder';
import CreateInventory from '../../components/Add/CreateInventory';
import { Link } from 'react-router-dom';

function Home() {
  const [categoriasAbiertas, setCategoriasAbiertas] = useState(false);
  const [verAbierto, setVerAbierto] = useState(false);
  const [otrasAbiertas, setOtrasAbiertas] = useState(false);
  const [isCategoriaModalVisible, setCategoriaModalVisible] = useState(false);
  const [isCreateColorModalVisible, setCreateColorModalVisible] = useState(false);
  const [isCreateUserModalVisible, setCreateUserModalVisible] = useState(false);
  const [isOrdersListModalVisible, setOrdersListModalVisible] = useState(false);
  const [isCreateProductModalVisible, setCreateProductModalVisible] = useState(false);
  const [isCreatePaymentMethodModalVisible, setCreatePaymentMethodModalVisible] = useState(false);
  const [isCreatePaymentStateModalVisible, setCreatePaymentStateModalVisible] = useState(false);
  const [isPto1ModalVisible, setPto1ModalVisible] = useState(false);
  const [isPto2ModalVisible, setPto2ModalVisible] = useState(false);
  const [isCreateOrderModalVisible, setCreateOrderModalVisible] = useState(false);
  const [isCreateInventoryModalVisible, setCreateInventoryModalVisible] = useState(false);

  return (
    <div className="Home-contenedor">
      <div className="form-home-container">
        <div className='saludo-home'>
          <h2>Hola soy Daniel Diaz 
            <img src="https://res.cloudinary.com/dpnj2pchu/image/upload/v1695943375/giphy_kvkclb.webp" alt="saludo" />
          </h2>
        </div>
          <div className="descripcion">
            Este es el Producto Mínimo Viable para el proyecto de <strong>Firplak</strong>. El frontend se realizó con React, y el backend, que es la parte más compleja ya que está muy estructurada, contiene controladores, modelos, rutas, conexiones con Cloudinary, base de datos y nodemailer, se desarrolló con MySQL2.
            <br />
            Dando clic <a href="https://drive.google.com/file/d/1UqntqvUi8OSBWASmecBzF1ykWaAVkp5o/view?usp=sharing" target='_blank'>aquí</a> podrá ver el reto en PDF y el repositorio para ver el código en GitHub dando clic <a href="https://github.com/Daniels35/firplak" target='_blank'>aquí</a>.
           </div>
        <div className="viñeta">
          <h1>Agregar / Ver</h1>
          <div className="descripcion">
            En esta sección podrás agregar y ver de la base de datos Categorías, Colores, Usuarios, Productos, Métodos de pago, Estado de pago, Inventarios en la bodega Pto1 y Pto2, Documentos de entrega, Guías maestras, se recomienda hacerlo con moderación puesto que esto es un proyecto. Haz clic en <BsCaretDownFill className='icon-viñeta-text'/> para abrir la lista completa.
          </div>
          <p onClick={() => setCategoriasAbiertas(!categoriasAbiertas)}>
            {categoriasAbiertas ? <BsCaretUpFill className='icon-viñeta'/> : <BsCaretDownFill className='icon-viñeta'/>}
          </p>
          {categoriasAbiertas && (
            <ul>
              <li onClick={(e) => { e.stopPropagation(); setCategoriaModalVisible(true)}}>Categorías</li>
              <li onClick={(e) => { e.stopPropagation(); setCreateColorModalVisible(true);}}>Colores</li>
              <li onClick={(e) => { e.stopPropagation(); setCreateUserModalVisible(true);}}>Usuarios</li>
              <li onClick={(e) => { e.stopPropagation(); setCreateProductModalVisible(true);}}>Productos</li>
              <li onClick={(e) => { e.stopPropagation(); setCreatePaymentMethodModalVisible(true);}}>Métodos de Pago</li>
              <li onClick={(e) => { e.stopPropagation(); setCreatePaymentStateModalVisible(true);}}>Estado de Pago</li>
              <li onClick={(e) => { e.stopPropagation(); setPto1ModalVisible(true);}}>Agregar inventario en bodega Pto1</li>
              <li onClick={(e) => { e.stopPropagation(); setPto2ModalVisible(true);}}>Agregar inventario en bodega Pto2</li>
              <li onClick={(e) => { e.stopPropagation(); setOrdersListModalVisible(true);}}>Documentos de entrega</li>
              <li>Guías maestras</li>
            </ul>
          )}
        </div>
        <div className="viñeta">
        <h1>Funciones</h1>
          <div className="descripcion">
            Aquí podrás hacer pedidos de compra, enviar prueba POD y más.
          </div>
          <p onClick={() => setOtrasAbiertas(!otrasAbiertas)}>
            {otrasAbiertas ? <BsCaretUpFill className='icon-viñeta'/> : <BsCaretDownFill className='icon-viñeta'/>}
          </p>
          {otrasAbiertas && (
            <ul>
              <li onClick={(e) => { e.stopPropagation(); setCreateOrderModalVisible(true);}}>Pedidos de compra</li>
              <li>
                <Link to="/pod">Pruebas POD</Link>
              </li>
            </ul>
          )}
        </div>
      </div>
      {/* Modales */}
      <Modal isVisible={isCategoriaModalVisible} onClose={() => setCategoriaModalVisible(false)}>
        <CreateCategoria />
      </Modal>
      <Modal isVisible={isCreateColorModalVisible} onClose={() => setCreateColorModalVisible(false)}>
        <CreateColor />
      </Modal>   
      <Modal isVisible={isCreateUserModalVisible} onClose={() => setCreateUserModalVisible(false)}>
        <CreateUser />
      </Modal>     
      <Modal isVisible={isOrdersListModalVisible} onClose={() => setOrdersListModalVisible(false)}>
        <OrdersList />
      </Modal> 
      <Modal isVisible={isCreateProductModalVisible} onClose={() => setCreateProductModalVisible(false)}>
        <CreateProduct />
      </Modal>
      <Modal isVisible={isCreatePaymentMethodModalVisible} onClose={() => setCreatePaymentMethodModalVisible(false)}>
        <CreatePaymentMethod />
      </Modal>  
      <Modal isVisible={isCreatePaymentStateModalVisible} onClose={() => setCreatePaymentStateModalVisible(false)}>
        <CreatePaymentState />
      </Modal>  
      <Modal isVisible={isPto1ModalVisible} onClose={() => setPto1ModalVisible(false)}>
        <Pto1 />
      </Modal>  
      <Modal isVisible={isPto2ModalVisible} onClose={() => setPto2ModalVisible(false)}>
        <Pto2 />
      </Modal> 
      <Modal isVisible={isCreateOrderModalVisible} onClose={() => setCreateOrderModalVisible(false)}>
        <CreateOrder />
      </Modal> 
      <Modal isVisible={isCreateInventoryModalVisible} onClose={() => setCreateInventoryModalVisible(false)}>
        <CreateInventory />
      </Modal> 
    </div>
  );
}

export default Home;
