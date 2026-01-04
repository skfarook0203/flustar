import React, { useEffect, useState } from 'react';
import api from '../services/api';
import ProductCard from '../components/ProductCard';

const Home = () => {
  const [newProducts, setNewProducts] = useState([]);
  const [offerProducts, setOfferProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await api.get('/products');
      const products = res.data;
      setNewProducts(products.filter(p => p.isNew));
      setOfferProducts(products.filter(p => p.onOffer));
    };
    fetchProducts();
  }, []);

  return (
    <div>
      <h1>Welcome to FLUSTAR</h1>
      <h2>Newly Added Products</h2>
      <div className="grid">
        {newProducts.length ? newProducts.map(p => <ProductCard key={p._id} product={p} />) : <p>No products available</p>}
      </div>
      <h2>Products on Offer</h2>
      <div className="grid">
        {offerProducts.length ? offerProducts.map(p => <ProductCard key={p._id} product={p} />) : <p>No products available</p>}
      </div>
    </div>
  );
};

export default Home;
