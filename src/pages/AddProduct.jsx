import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const AddProduct = () => {
  const [form, setForm] = useState({ name: '', description: '', price: '', category: '', sizes: '', colors: '', isNew: false, onOffer: false });
  const [images, setImages] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(form).forEach(key => formData.append(key, form[key]));
    images.forEach(img => formData.append('images', img));
    await api.post('/admin/products', formData);
    navigate('/admin');
  };

  return (
    <div>
      <h1>Add Product</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
        <textarea placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required />
        <input type="number" placeholder="Price" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} required />
        <input type="text" placeholder="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} required />
        <input type="text" placeholder="Sizes (comma separated)" value={form.sizes} onChange={(e) => setForm({ ...form, sizes: e.target.value })} />
        <input type="text" placeholder="Colors (comma separated)" value={form.colors} onChange={(e) => setForm({ ...form, colors: e.target.value })} />
        <input type="file" multiple onChange={(e) => setImages([...e.target.files])} />
        <label><input type="checkbox" checked={form.isNew} onChange={(e) => setForm({ ...form, isNew: e.target.checked })} /> New</label>
        <label><input type="checkbox" checked={form.onOffer} onChange={(e) => setForm({ ...form, onOffer: e.target.checked })} /> On Offer</label>
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
