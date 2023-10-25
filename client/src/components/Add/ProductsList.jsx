import React, { useState, useEffect } from 'react';
import api from '../../config/api';

function ProductsList({ updatePrice, handleSaveProducts, clearSelectedProducts, setClearSelectedProducts }) {
  const [products, setProducts] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [showAllProducts, setShowAllProducts] = useState(false);
  const [pto1Inventories, setPto1Inventories] = useState([]);

  useEffect(() => {
    async function fetchPto1Inventories() {
      try {
        const response = await api.get('/inventories-pto1');
        const pto1InventoriesData = response.data;
        setPto1Inventories(pto1InventoriesData);
      } catch (error) {
        console.error('Error al obtener las existencias en Pto1:', error);
      }
    }
  
    fetchPto1Inventories();
  }, []);
  
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
    const productIndex = selectedProducts.findIndex((p) => p.product.id === product.id);
    const newSelectedProducts = [...selectedProducts];
  
    const hasInventoryInPto1 = getPto1InventoryCount(product.id) > 0;
  
    if (productIndex === -1) {
      if (hasInventoryInPto1) {
        newSelectedProducts.push({ product, quantity: 1 });
        setSelectedProducts(newSelectedProducts);
      } else {
        alert('Este producto no tiene existencias en la bodega Pto1. Genere la solicitud a la bodega Pto2.');
      }
    } else {
      newSelectedProducts.splice(productIndex, 1);
      setSelectedProducts(newSelectedProducts);
    }
  };
  
  const handleQuantityChange = (productId, newQuantity) => {
    const productIndex = selectedProducts.findIndex((p) => p.product.id === productId);
    const newSelectedProducts = [...selectedProducts];
    console.log("Cambio de producto cantidad: ", newSelectedProducts);

    if (productIndex !== -1) {
      newSelectedProducts[productIndex].quantity = newQuantity;
      setSelectedProducts(newSelectedProducts);
    }
  };

  useEffect(() => {
    const newTotalPrice = selectedProducts.reduce((total, { product, quantity }) => {
      return total + parseFloat(product.price) * quantity;
    }, 0);

    setTotalPrice(newTotalPrice);
    updatePrice(newTotalPrice);
    handleSaveProducts(selectedProducts);
  }, [selectedProducts]);

  const filteredProducts = products.filter((product) => {
    const productName = product.name.toLowerCase();
    return productName.includes(searchText.toLowerCase()) || selectedProducts.some((p) => p.product.id === product.id);
  });

  const showFilteredProducts = (showAllProducts || searchText);

  useEffect(() => {
    handleSaveProducts(selectedProducts);
  }, [selectedProducts]);

  useEffect(() => {
    if (clearSelectedProducts) {
      setSelectedProducts([]);
      setShowAllProducts(false);
      setClearSelectedProducts(false);
    }
  }, [clearSelectedProducts]);

  const getPto1InventoryCount = (productId) => {
    const inventory = pto1Inventories.find((inv) => inv.product_id === productId);
    return inventory ? inventory.cantidad : 0;
  };
  
  return (
    <div className="products-list-container">
      <h1>Lista de Productos</h1>
      <input
        type="text"
        placeholder="Buscar por nombre"
        value={searchText}
        onChange={handleSearch}
      />
      <h4>Productos seleccionados</h4>
      <ul className='container-products-showList'>
        {selectedProducts.map(({ product, quantity }) => (
          <li key={product.id}>
            <input
              type="checkbox"
              checked={true}
              onClick={() => handleProductSelect(product)}
            />
            {product.name} - Precio: {product.price} c/u
            <select
              value={quantity}
              onChange={(e) => handleQuantityChange(product.id, parseInt(e.target.value))}
            >
              {[1, 2, 3, 4, 5].map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </li>
        ))}
      </ul>
      {showFilteredProducts && (
        <>
          <h4>Productos Base de datos</h4>
          <span className='inventory-productList-pto1'>▝ Productos en Bodega Pto1</span>
            <ul className='container-products-showAll'>
              {filteredProducts
                .filter((product) => !selectedProducts.some((p) => p.product.id === product.id))
                .map((product) => (
                  <li key={product.id}>
                    <input
                      type="checkbox"
                      checked={selectedProducts.some((p) => p.product.id === product.id)}
                      onChange={(e) => { e.stopPropagation(); e.preventDefault(); handleProductSelect(product)}}
                    />
                    {product.name} - Precio: {product.price} c/u
                      <span className={`inventory-productList-pto1 ${getPto1InventoryCount(product.id) === 0 ? 'red-text' : ''}`}>
                      ▝ {getPto1InventoryCount(product.id)}
                    </span>
                  </li>
                ))}
            </ul>
        </>
      )}
      {!searchText && (
        <button onClick={(e) => { e.stopPropagation(); e.preventDefault(); setShowAllProducts(!showAllProducts); }}>
          {showAllProducts ? 'Ocultar lista de productos' : 'Mostrar lista de productos'}
        </button>
      )}
      <div>
        <p>Precio Total: {totalPrice}</p>
      </div>
    </div>
  );
}

export default ProductsList;
