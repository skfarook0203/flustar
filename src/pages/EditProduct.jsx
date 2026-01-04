import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';

const EditProduct = () => {
  const { id } = useParams();
  const [form, setForm] = useState({ name: '', description: '', price: '', category: '', sizes: '', colors: '', isNew: false, onOffer: false });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await api.get(`/products/${id}`);
      const product = res.data;
      setForm({ ...product, sizes: product.sizes.join(','), colors: product.colors.join(',') });
    };
    fetchProduct();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.put(`/admin/products/${id}`, form);
    navigate('/admin');
  };

  return (
    <div>
      <h1>Edit Product</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
        <textarea placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required />
        <input type="number" placeholder="Price" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} required />
        <input type="text" placeholder="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} required />
        <input type="text" placeholder="Sizes (comma separated)" value={form.sizes} onChange={(e) => setForm({ ...form, sizes: e.target.value })} />
        <input type="text" placeholder="Colors (comma separated)" value={form.colors} onChange={(e) => setForm({ ...form, colors: e.target.value })} />
        <label><input type="checkbox" checked={form.isNew} onChange={(e) => setForm({ ...form, isNew: e.target.checked })} /> New</label>
        <label><input type="checkbox" checked={form.onOffer} onChange={(e) => setForm({ ...form, onOffer: e.target.checked })} /> On Offer</label>
        <button type="submit">Update Product</button>
      </form>
    </div>
  );
};

export default EditProduct;
