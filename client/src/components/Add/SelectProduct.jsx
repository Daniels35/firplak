import React, { useState, useEffect } from 'react';
import api from '../../config/api';

function SelectProduct({ handleProductSelect }) {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  
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
  
  const handleSelectProduct = (selectedProductId) => {
    console.log("GGGGG: ", selectedProductId);
    const selectedProduct = products.find(product => product.id === selectedProductId);
    if (selectedProduct) {
      setSelectedProduct(selectedProduct);
      handleProductSelect(selectedProduct, quantity);
    }
  };
  
  const handleQuantityChange = (e) => {
    const inputQuantity = e.target.value;
    if (/^\d{0,2}$/.test(inputQuantity)) {
      setQuantity(inputQuantity);
      handleProductSelect(selectedProduct, inputQuantity);
    }
  };

  return (
    <div className="select-product-container">
      <h4>Seleccionar Producto</h4>
      <select value={selectedProduct ? selectedProduct.id : ''} onChange={(e) => handleSelectProduct(e.target.value)}>
        <option value="">Seleccionar Producto</option>
        {products.map((product) => (
          <option key={product.id} value={product.id}>
            {product.name}
          </option>
        ))}
      </select>
      {selectedProduct && (
        <div className='container-cantidad'>
          <label>Cantidad</label>
          <br></br>
          <input
            type="number"
            value={quantity}
            onChange={handleQuantityChange}
            className='selectProducto-inputQuantity'
          />
        </div>
      )}
    </div>
  );
}

export default SelectProduct;
