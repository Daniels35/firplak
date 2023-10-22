import React, { useState, useEffect } from 'react';
import api from '../../config/api';
import './styleSee.css';

function ProductDetails({ productId }) {
  const [product, setProduct] = useState(null);
  const [categories, setCategories] = useState([]);
  const [colors, setColors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    
    setLoading(true);

    api.get('/categorias')
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error('Error al cargar categorías:', error);
        setError('Error al cargar categorías');
      });

    api.get('/colors')
      .then((response) => {
        setColors(response.data);
      })
      .catch((error) => {
        console.error('Error al cargar colores:', error);
        setError('Error al cargar colores');
      });

    api.get(`/products/${productId}`)
      .then((response) => {
        setProduct(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error al cargar detalles del producto:', error);
        setError('Error al cargar detalles del producto');
        setLoading(false);
      });
  }, [productId]);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const category = categories.find((category) => category.id === product.category_id);
  const colorData = colors.find((color) => color.id === product.color_id);
  
  let color = 'Desconocido';
  
  if (colorData) {
    
    color = `${colorData.name1} / ${colorData.name2} (${colorData.code})`;
  }
  return (
    <div className='detail-product-contain'>
      <h1>Detalles del Producto</h1>
      <strong>Nombre:</strong> {product.name}<br />
      <strong>Descripción:</strong> {product.description}<br />
      <strong>Precio:</strong> ${product.price}<br />
      <strong>Categoría:</strong> {category ? category.name : 'Desconocida'}<br />
      <strong>Color:</strong> {color}<br />
      <div className='image-detail-product'>
        <img
          src={product.image}
          alt={product.name}
          style={{ maxWidth: '200px', maxHeight: '200px' }}
        />
      </div>
    </div>
  );
}

export default ProductDetails;
