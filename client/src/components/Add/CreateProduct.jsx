import React, { useState, useEffect } from 'react';
import api from '../../config/api';
import './styleAdd.css';
import ProductDetails from '../See/ProductDetails';
import Modal from '../Modal/Modal';

function CreateProduct() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category_id, setCategory] = useState('');
  const [color_id, setColor] = useState('');
  const [image, setImage] = useState(null);
  const [categories, setCategories] = useState([]);
  const [colors, setColors] = useState([]);
  const [products, setProducts] = useState([]);
  const [isProductDetailsModalVisible, setProductDetailsModalVisible] = useState(false);

  useEffect(() => {
    api.get('/categorias')
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error('Error al cargar categorías:', error);
      });

    api.get('/colors')
      .then((response) => {
        setColors(response.data);
      })
      .catch((error) => {
        console.error('Error al cargar colores:', error);
      });

      api.get('/products')
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error('Error al cargar productos:', error);
      });
  }, []);

  const handleCreateProduct = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('price', price);
      formData.append('category_id', category_id);
      formData.append('color_id', color_id);
      formData.append('image', image);

      const response = await api.post('/products', formData);

      const { message, error, product } = response.data;

      if (message) {
        alert(message);
        setName('');
        setDescription('');
        setPrice('');
        setCategory('');
        setColor('');
        setImage(null);
        setProducts([...products, product]);
      } else if (error) {
        alert(error);
      }
    } catch (error) {
      console.error('Error al crear el producto:', error);
    }
  };

  return (
    <div className='create-products-container'>
      <h1>Crear Producto</h1>
      <form onSubmit={handleCreateProduct}>
        <label>Nombre del producto:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        <label>Descripción:</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
        <label>Precio:</label>
        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
        <label>Categoría:</label>
        <select value={category_id} onChange={(e) => setCategory(e.target.value)}>
            <option value="">Selecciona una categoría</option>
            {categories.map((category) => (
            <option key={category.id} value={category.id}>
                {category.name}
            </option>
            ))}
        </select>
        <label>Color:</label>
        <select value={color_id} onChange={(e) => setColor(e.target.value)}>
            <option value="">Selecciona un color</option>
            {colors.map((color) => (
            <option key={color.id} value={color.id}>
                {color.name1} / {color.name2} ({color.code})
            </option>
            ))}
        </select>
        <label>Imagen del producto:</label>
        <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
        {image && (
          <img
            src={URL.createObjectURL(image)}
            alt="Vista previa de la imagen"
            style={{ maxWidth: '200px', maxHeight: '200px' }}
          />
        )}
        <button type="submit">Guardar Producto</button>
      </form>
      <h2>Lista de Productos</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <strong>Nombre:</strong> {product.name}<br />
            <strong>Precio:</strong> ${product.price}<br />
            <strong>Categoría:</strong> {categories.find(cat => cat.id === product.category_id)?.name || 'N/A'}<br />
            <strong>Color:</strong> {colors.find(col => col.id === product.color_id)?.name1 || 'N/A'}<br />
            <button onClick={(e) => { e.stopPropagation(); setProductDetailsModalVisible({ isOpen: true, productId: product.id }) }}>Ver Detalles</button>
          </li>
        ))}
      </ul>
      <Modal isVisible={isProductDetailsModalVisible} onClose={() => setProductDetailsModalVisible(false)}>
        <ProductDetails productId={isProductDetailsModalVisible.productId} />
      </Modal> 
    </div>
  );
}

export default CreateProduct;
