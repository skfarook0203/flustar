import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const productsRes = await api.get('/products');
      setProducts(productsRes.data);
      const ordersRes = await api.get('/admin/orders');
      setOrders(ordersRes.data);
    };
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    await api.delete(`/admin/products/${id}`);
    setProducts(products.filter(p => p._id !== id));
  };

  const handleOrderStatus = async (id, status) => {
    await api.put(`/admin/orders/${id}`, { status });
    setOrders(orders.map(o => o._id === id ? { ...o, status } : o));
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <Link to="/admin/add-product"><button>Add Product</button></Link>
      <h2>Products</h2>
      <ul>
        {products.map(p => (
          <li key={p._id}>
            {p.name} - ₹{p.price}
            <Link to={`/admin/edit-product/${p._id}`}>Edit</Link>
            <button onClick={() => handleDelete(p._id)}>Delete</button>
          </li>
        ))}
      </ul>
      <h2>Orders</h2>
      <ul>
        {orders.map(o => (
          <li key={o._id}>
            Order by {o.user.email} - Status: {o.status}
            <button onClick={() => handleOrderStatus(o._id, 'Approved')}>Approve</button>
            <button onClick={() => handleOrderStatus(o._id, 'Rejected')}>Reject</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
