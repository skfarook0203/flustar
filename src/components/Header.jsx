import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const { cart } = useContext(CartContext);

  return (
    <header style={{ backgroundColor: 'var(--primary)', color: 'var(--secondary)', padding: '10px' }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to="/" style={{ color: 'var(--secondary)', textDecoration: 'none', fontSize: '24px' }}>FLUSTAR</Link>
        <nav>
          <Link to="/products" style={{ margin: '0 10px', color: 'var(--secondary)' }}>Products</Link>
          <Link to="/cart" style={{ margin: '0 10px', color: 'var(--secondary)' }}>Cart ({cart.length})</Link>
          {user ? (
            <>
              {user.role === 'ADMIN' && <Link to="/admin" style={{ margin: '0 10px', color: 'var(--secondary)' }}>Admin</Link>}
              <button onClick={logout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" style={{ margin: '0 10px', color: 'var(--secondary)' }}>Login</Link>
              <Link to="/register" style={{ margin: '0 10px', color: 'var(--secondary)' }}>Register</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
