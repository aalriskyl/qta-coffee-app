import React, { useState, useEffect } from 'react';
import { Link, Routes, Route, useNavigate } from 'react-router-dom';
import Pemesanan from '../components/Pemesanan';
import HistoryPenjualan from '../components/HistoriPenjualan';
import PendapatanPerharian from '../components/PendapatanHarian';

const Dashboard = () => {
  const [orders, setOrders] = useState([]);
  const [role, setRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('role');
    setRole(userRole);

    if (!token) {
      alert("Harus Login");
      window.location.href = '/';
    }
  }, []);

  const addOrder = (order) => {
    setOrders([...orders, order]);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    window.location.href = '/';
  };

  if (!role) {
    return null; // or a loading spinner
  }

  return (
    <div className="min-h-screen bg-brown-100 flex flex-col">
      <header className="bg-brown-800 text-white w-full p-4 text-center shadow-md">
        <h1 className="text-3xl font-bold">Coffee Shop Dashboard</h1>
      </header>
      <main className="flex flex-col items-center w-full p-4">
        <div className={`grid gap-4 mt-8 w-full ${role === 'admin' ? 'grid-cols-2 max-w-xl' : 'grid-cols-1 max-w-md'}`}>
          <button
            onClick={() => navigate('/menu')}
            className="bg-brown-800 text-white px-4 py-2 rounded-lg hover:bg-brown-700 h-32 flex items-center justify-center w-full"
          >
            Pemesanan
          </button>
          <button
            onClick={() => navigate('/history')}
            className="bg-brown-800 text-white px-4 py-2 rounded-lg hover:bg-brown-700 h-32 flex items-center justify-center w-full"
          >
            History Penjualan
          </button>
          {role === 'admin' && (
            <button
              onClick={() => navigate('/pendapatan')}
              className="bg-brown-800 text-white px-4 py-2 rounded-lg hover:bg-brown-700 h-32 flex items-center justify-center w-full"
            >
              Pendapatan Perharian
            </button>
          )}
          {role === 'staff' && (
            <div className="col-span-2 flex justify-center">
              <button
                onClick={handleLogout}
                className="bg-brown-800 text-white px-4 py-2 rounded-lg hover:bg-brown-700 h-32 flex items-center justify-center w-full max-w-sm"
              >
                Logout
              </button>
            </div>
          )}
          {role === 'admin' && (
            <button
              onClick={handleLogout}
              className="bg-brown-800 text-white px-4 py-2 rounded-lg hover:bg-brown-700 h-32 flex items-center justify-center w-full"
            >
              Logout
            </button>
          )}
        </div>
        <div className="w-full mt-8">
          <Routes>
            <Route path="menu" element={<Pemesanan addOrder={addOrder} />} />
            <Route path="history" element={<HistoryPenjualan orders={orders} />} />
            {role === 'admin' && (
              <Route path="pendapatan" element={<PendapatanPerharian orders={orders} />} />
            )}
          </Routes>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
