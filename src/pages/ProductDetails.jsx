import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import { CartContext } from '../context/CartContext';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await api.get(`/products/${id}`);
      setProduct(res.data);
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    addToCart({ ...product, id: product._id, size: selectedSize, color: selectedColor, quantity: 1 });
  };

  if (!product) return <p>Loading...</p>;

  return (
    <div>
      <h1>{product.name}</h1>
      <div style={{ display: 'flex' }}>
        {product.images.map(img => <img key={img} src={`https://your-render-backend-url.com/uploads/${img}`} alt={product.name} style={{ width: '200px', margin: '10px' }} />)}
      </div>
      <p>₹{product.price}</p>
      <p>{product.description}</p>
      <select value={selectedSize} onChange={(e) => setSelectedSize(e.target.value)}>
        <option value="">Select Size</option>
        {product.sizes.map(s => <option key={s} value={s}>{s}</option>)}
      </select>
      <select value={selectedColor} onChange={(e) => setSelectedColor(e.target.value)}>
        <option value="">Select Color</option>
        {product.colors.map(c => <option key={c} value={c}>{c}</option>)}
      </select>
      <button onClick={handleAddToCart}>Add to Cart</button>
      <button>Buy Now</button>
    </div>
  );
};

export default ProductDetails;
