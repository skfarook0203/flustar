import React, { useEffect, useState } from 'react';
import api from '../services/api';
import ProductCard from '../components/ProductCard';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await api.get('/products');
      setProducts(res.data);
      setFilteredProducts(res.data);
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    let filtered = products;
    if (search) filtered = filtered.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
    if (category) filtered = filtered.filter(p => p.category === category);
    setFilteredProducts(filtered);
  }, [search, category, products]);

  const categories = [...new Set(products.map(p => p.category))];

  return (
    <div>
      <h1>Products</h1>
      <input type="text" placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)} />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="">All Categories</option>
        {categories.map(c => <option key={c} value={c}>{c}</option>)}
      </select>
      <div className="grid">
        {filteredProducts.map(p => <ProductCard key={p._id} product={p} />)}
      </div>
    </div>
  );
};

export default Products;
