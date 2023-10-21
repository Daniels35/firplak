import React, { useState, useEffect } from 'react';
import api from '../../config/api';

function ProductsList({ handleAddProduct }) {
  const [products, setProducts] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await api.get('/products');
        const productsData = response.data;
        setProducts(productsData);
      } catch (error) {
        console.error('Error al obtener productos:', error);
      }
    }

    fetchProducts();
  }, []);

  const handleSearch = (e) => {
    const text = e.target.value;
    setSearchText(text);
  };

  const handleProductSelect = (product) => {
    const productIndex = selectedProducts.findIndex((p) => p.id === product.id);

    if (productIndex === -1) {
      setSelectedProducts([...selectedProducts, product]);
    } else {
      const newSelectedProducts = [...selectedProducts];
      newSelectedProducts.splice(productIndex, 1);
      setSelectedProducts(newSelectedProducts);
    }
  };

  useEffect(() => {
    const newTotalPrice = selectedProducts.reduce((total, product) => {
      return total + parseFloat(product.price);
    }, 0);

    setTotalPrice(newTotalPrice);
  }, [selectedProducts]);

  return (
    <div className="products-list-container">
      <h1>Lista de Productos</h1>
      <input
        type="text"
        placeholder="Buscar por nombre"
        value={searchText}
        onChange={handleSearch}
      />
      <ul>
        {products
          .filter((product) =>
            product.name.toLowerCase().includes(searchText.toLowerCase())
          )
          .map((product) => (
            <li key={product.id}>
              <input
                type="checkbox"
                checked={selectedProducts.some((p) => p.id === product.id)}
                onChange={() => handleProductSelect(product)}
              />
              {product.name} - Precio: {product.price}
            </li>
          ))}
      </ul>
      {/* <button onClick={() => handleAddProduct(selectedProducts)}>Agregar a la Orden</button> */}
      <div>
        <p>Precio Total: {totalPrice}</p>
      </div>
    </div>
  );
}

export default ProductsList;
