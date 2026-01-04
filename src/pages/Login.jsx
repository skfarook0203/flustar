import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const [identifier, setIdentifier] = useState(''); // Email or mobile
  const [password, setPassword] = useState('');
  const [useOTP, setUseOTP] = useState(false); // Toggle between password and OTP
  const [otp, setOtp] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  // Handle login with email/mobile + password
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', { identifier, password });
      login(res.data.token); // Store token in context
      navigate('/'); // Redirect to home after login
    } catch (err) {
      alert('Login failed: ' + (err.response?.data?.message || 'Unknown error'));
    }
  };

  // Send OTP to mobile
  const handleSendOTP = async () => {
    if (!identifier) {
      alert('Please enter your mobile number');
      return;
    }
    try {
      await api.post('/auth/send-otp', { mobile: identifier });
      alert('OTP sent to your mobile');
    } catch (err) {
      alert('Failed to send OTP: ' + (err.response?.data?.message || 'Unknown error'));
    }
  };

  // Verify OTP and login
  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/verify-otp', { mobile: identifier, otp });
      login(res.data.token); // Store token in context
      navigate('/'); // Redirect to home after login
    } catch (err) {
      alert('OTP verification failed: ' + (err.response?.data?.message || 'Unknown error'));
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
      <h1>Login</h1>
      <form onSubmit={useOTP ? handleVerifyOTP : handleLogin}>
        <input
          type="text"
          placeholder="Email or Mobile Number"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          required
          style={{ width: '100%', marginBottom: '10px' }}
        />
        {!useOTP && (
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: '100%', marginBottom: '10px' }}
          />
        )}
        {useOTP && (
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
            style={{ width: '100%', marginBottom: '10px' }}
          />
        )}
        <button type="button" onClick={() => setUseOTP(!useOTP)} style={{ marginRight: '10px' }}>
          {useOTP ? 'Use Password Instead' : 'Use OTP Instead'}
        </button>
        {useOTP && (
          <button type="button" onClick={handleSendOTP} style={{ marginRight: '10px' }}>
            Send OTP
          </button>
        )}
        <button type="submit">{useOTP ? 'Verify OTP & Login' : 'Login'}</button>
      </form>
      <p>Don't have an account? <a href="/register">Register here</a></p>
    </div>
  );
};

export default Login;
