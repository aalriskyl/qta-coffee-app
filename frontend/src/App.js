import  { BrowserRouter as Router, Routes, Route } from  'react-router-dom';
import Landing from './pages/Landing';
import './App.css';
import Dashboard from './pages/Dashboard';
import HistoryPenjualan from './components/HistoriPenjualan';
import PendapatanHarian from './components/PendapatanHarian';
import Register from './pages/Register';

function App() {
  return (
<Router>
      <Routes>
      <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/history" element={<HistoryPenjualan />} />
        <Route path="/pendapatan" element={<PendapatanHarian />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
