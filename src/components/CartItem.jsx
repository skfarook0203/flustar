import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useContext(CartContext);

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #ccc', padding: '10px' }}>
      <img src={`https://your-render-backend-url.com/uploads/${item.images[0]}`} alt={item.name} style={{ width: '50px', height: '50px', objectFit: 'cover' }} />
      <div>
        <h4>{item.name}</h4>
        <p>₹{item.price}</p>
        <p>Size: {item.size}, Color: {item.color}</p>
      </div>
      <div>
        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} disabled={item.quantity <= 1}>-</button>
        <span>{item.quantity}</span>
        <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
        <button onClick={() => removeFromCart(item.id)}>Remove</button>
      </div>
    </div>
  );
};

export default CartItem;
