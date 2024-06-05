import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const HistoryPenjualan = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:5000/orders');
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

  // Calculate total price for all orders
  const totalPriceAllOrders = orders.reduce((total, order) => {
    const orderTotalPrice = order.items.reduce((subTotal, item) => subTotal + (item.price * item.quantity), 0);
    return total + orderTotalPrice;
  }, 0);

  return (
    <div className="flex justify-center px-4">
      <div className="bg-white shadow-lg rounded-lg p-6 m-4 w-full max-w-3xl">
        <div className="flex justify-between items-center mb-4">
          <Link to="/dashboard" className="mr-4">
            <FontAwesomeIcon icon={faArrowLeft} size="lg" />
          </Link>
          <h2 className="text-2xl font-bold text-brown-800">History Penjualan</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Alias</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Price (IDR)</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orders.map((order, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">{order.alias}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{order.items.map(item => item.name).join(', ')}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{formatIDR(order.items.reduce((total, item) => total + (item.price * item.quantity), 0))}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{new Date(order.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
              <tr>
                <td className="px-6 py-4 whitespace-nowrap" colSpan="2">Total Price for All Orders</td>
                <td className="px-6 py-4 whitespace-nowrap">{formatIDR(totalPriceAllOrders)}</td>
                <td className="px-6 py-4 whitespace-nowrap"></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HistoryPenjualan;
