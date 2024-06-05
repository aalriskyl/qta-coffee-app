import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link separately
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import menuOptions from '../components/menuOption'; // Ensure the path and export from menuOption is correct

const Menu = () => {
  const [alias, setAlias] = useState('');
  const [category, setCategory] = useState('');
  const [cart, setCart] = useState([]);
  const [amountPaid, setAmountPaid] = useState(''); // State for the amount paid

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleAddToCart = (item) => {
    const newItem = { category, name: item.name, price: item.price, quantity: 1 };
    setCart([...cart, newItem]);
  };

  const handleSubmitOrder = async () => {
    if (!alias || cart.length === 0) {
      alert('Alias and cart items are required');
      return;
    }

    try {
      const orderData = {
        alias,
        items: cart
      };

      const response = await axios.post('http://localhost:5000/orders', orderData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Order placed:', response.data);
      setAlias('');
      setCart([]);
      setAmountPaid(''); // Reset amount paid
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Error placing order: ' + error.message);
    }
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const calculateChange = () => {
    const total = calculateTotal();
    const paid = parseFloat(amountPaid);
    return paid >= total ? paid - total : 0;
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto">
        <div className="flex items-center mb-4">
          <Link to="/dashboard" className="mr-4">
            <FontAwesomeIcon icon={faArrowLeft} size="lg" />
          </Link>
          <h2 className="text-2xl font-semibold text-center flex-grow">Place Order</h2>
        </div>
        <form onSubmit={(e) => { e.preventDefault(); handleAddToCart(); }} className="space-y-4">
          <div>
            <label htmlFor="alias" className="block text-sm font-medium text-gray-700">Alias:</label>
            <input
              type="text"
              id="alias"
              value={alias}
              onChange={(e) => setAlias(e.target.value)}
              className="mt-1 p-2 block w-full rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category:</label>
            <select
              id="category"
              value={category}
              onChange={handleCategoryChange}
              className="mt-1 p-2 block w-full rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500"
            >
              <option value="">Select Category</option>
              {Object.keys(menuOptions).map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </form>

        {category && (
          <div>
            <h2 className="text-xl font-semibold mt-8 mb-4 text-center">Menu</h2>
            <div className="grid grid-cols-1 gap-4">
              {menuOptions[category].map((item) => (
                <div key={item.name} className="bg-white shadow-md rounded-lg p-4 flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">{item.name}</h3>
                    <p className="text-sm text-gray-600">Price: {item.price.toLocaleString('id-ID')}</p>
                  </div>
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="bg-indigo-500 text-white py-1 px-2 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
                  >
                    Add to Cart
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <h2 className="text-xl font-semibold mt-8 mb-4 text-center">Cart</h2>
        <div className="space-y-4">
          {cart.map((item, index) => (
            <div key={index} className="bg-white shadow-md rounded-lg p-4 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-sm text-gray-600">{item.category}</p>
                <p className="text-sm text-gray-600">Price: {item.price.toLocaleString('id-ID')}</p>
                <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 text-xl font-semibold text-center">Total: {calculateTotal().toLocaleString('id-ID')}</div>

        <div className="mt-4">
          <label htmlFor="amountPaid" className="block text-sm font-medium text-gray-700">Amount Paid:</label>
          <input
            type="number"
            id="amountPaid"
            value={amountPaid}
            onChange={(e) => setAmountPaid(e.target.value)}
            className="mt-1 p-2 block w-full rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500"
          />
        </div>
        <div className="mt-4 text-xl font-semibold text-center">Change: {calculateChange().toLocaleString('id-ID')}</div>

        <button onClick={handleSubmitOrder} className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600 mt-4 w-full">
          Place Order
        </button>
      </div>
    </div>
  );
};

export default Menu;
