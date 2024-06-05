import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment-timezone';
import { Link, Navigate } from 'react-router-dom'; // Import Navigate for redirection
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const PendapatanHarian = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      // If token doesn't exist, redirect to login page
      return <Navigate to="/" />;
    }

    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:5000/orders', {
          headers: {
            Authorization: `Bearer ${token}` // Attach token to the request headers
          }
        });
        setOrders(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  const formatIDR = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR'
    }).format(amount);
  };

  const ordersByDate = orders.reduce((acc, order) => {
    // Convert to local time
    const localDate = moment(order.createdAt).tz('Asia/Jakarta').format('YYYY-MM-DD');
    const totalPrice = order.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    
    if (!acc[localDate]) {
      acc[localDate] = 0;
    }
    
    acc[localDate] += totalPrice;
    
    return acc;
  }, {});

  return (
    <div className="flex justify-center">
      <div className="bg-white shadow-lg rounded-lg p-6 m-4 w-fit">
      <Link to="/dashboard" className="mr-4">
        <FontAwesomeIcon icon={faArrowLeft} size="lg" />
      </Link>
        <h2 className="text-2xl font-bold mb-4 text-brown-800">Pendapatan Harian</h2>
        <table className="min-w-screen divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Pemasukan</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {Object.entries(ordersByDate).map(([date, total], index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">{date}</td>
                <td className="px-6 py-4 whitespace-nowrap">{formatIDR(total)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PendapatanHarian;
