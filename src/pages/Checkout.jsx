import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { CartContext } from '../context/CartContext';

const Checkout = () => {
  const { cart } = useContext(CartContext);
  const [address, setAddress] = useState({ name: '', street: '', city: '', state: '', zip: '' });
  const [paymentMethod, setPaymentMethod] = useState('COD');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const products = cart.map(item => ({ product: item._id, quantity: item.quantity, size: item.size, color: item.color }));
    await api.post('/orders', { products, totalAmount, address, paymentMethod });
    alert('Order placed!');
    navigate('/');
  };

  return (
    <div>
      <h1>Checkout</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" value={address.name} onChange={(e) => setAddress({ ...address, name: e.target.value })} required />
        <input type="text" placeholder="Street" value={address.street} onChange={(e) => setAddress({ ...address, street: e.target.value })} required />
        <input type="text" placeholder="City" value={address.city} onChange={(e) => setAddress({ ...address, city: e.target.value })} required />
        <input type="text" placeholder="State" value={address.state} onChange={(e) => setAddress({ ...address, state: e.target.value })} required />
        <input type="text" placeholder="Zip" value={address.zip} onChange={(e) => setAddress({ ...address, zip: e.target.value })} required />
        <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
          <option value="COD">Cash on Delivery</option>
          <option value="UPI">UPI / Net Banking</option>
        </select>
        <button type="submit">Place Order</button>
      </form>
    </div>
  );
};

export default Checkout;
