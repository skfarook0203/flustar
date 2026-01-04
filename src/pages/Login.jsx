import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [useOTP, setUseOTP] = useState(false);
  const [otp, setOtp] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', { identifier, password });
      login(res.data.token);
      navigate('/');
    } catch (err) {
      alert('Login failed');
    }
  };

  const handleSendOTP = async () => {
    await api.post('/auth/send-otp', { mobile: identifier });
    alert('OTP sent');
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/
