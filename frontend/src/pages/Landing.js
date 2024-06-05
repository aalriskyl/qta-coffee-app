import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BgCoffee from '../assets/img/bg-coffee.jpg';
import axios from 'axios';

const Landing = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:5000/user/login', {
        username,
        password
      });
  
      if (response.status === 201) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('role', response.data.role); // Store user role
  
        // Redirect to dashboard upon successful login
        window.location.href = '/dashboard'; 
      } else {
        console.error('Login failed:', response.data.message);
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };
  

  return (
    <div className="relative h-screen">
      <div className="absolute inset-0 z-0">
        <img
          src={BgCoffee}
          alt="background"
          className="w-full h-full object-cover filter brightness-75"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black opacity-50"></div>
      </div>
      <div className="relative z-10 flex justify-center items-center h-full">
        <div className="bg-gradient-to-r from-[#0C0C0C] to-[#0C0C0C] p-6 rounded-lg shadow-md">
          <h1 className="text-3xl text-center mb-4 text-white">Login</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="username" className="block text-white mb-2">
                Username
              </label>
              <input
                type="text"
                id="username"
                className="w-full px-3 py-2 border rounded-md bg-transparent text-white focus:outline-none focus:border-primary"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-white mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full px-3 py-2 border rounded-md bg-transparent text-white focus:outline-none focus:border-primary"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="block w-full py-2 px-4 mb-4 bg-gradient-to-r from-[#322C2B] to-[#803D3B] hover:from-[#AF8260] hover:to-[#E4C59E] text-white rounded-md focus:outline-none"
            >
              Login
            </button>
        <a href="/register" className="text-white py-4 cursor-pointer">Register now</a>

          </form>
        </div>
      </div>
    </div>
  );
};

export default Landing;
