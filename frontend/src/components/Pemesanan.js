import React, { useState } from 'react';
import axios from 'axios';

const menuOptions = {
  "Kopi Dingin": [
    { name: "Kopi Q.TA", price: 10000 },
    { name: "Item Q.TA", price: 10000 },
    { name: "Kopi Kami (NEW)", price: 10000 },
    { name: "Kapucino", price: 15000 },
    { name: "Mokacino", price: 15000 },
    { name: "Kopi Latte", price: 15000 },
    { name: "KopiGreentea", price: 15000 },
  ],
  "Kopi Panas": [
    { name: "Kopi QTA", price: 6000 },
    { name: "Item QTA", price: 6000 },
    { name: "Kapucino", price: 13000 },
    { name: "Mokacino", price: 13000 },
    { name: "Kopi Latte", price: 13000 },
    { name: "Kopi Greentea", price: 13000 },
  ],
  "Yang Teh": [
    { name: "Matcha", price: 15000 },
    { name: "Lemon Tea", price: 8000 },
    { name: "Icetea", price: 5000 },
  ],
  "Yang Seger": [
    { name: "Lemonade", price: 10000 },
    { name: "White Punch (Soda)", price: 15000 },
    { name: "Red Punch (Soda)", price: 15000 },
  ],
  "Yang Susu": [
    { name: "Milk Tea", price: 10000 },
    { name: "Fresh Milk", price: 10000 },
  ],
  "Yang Coklat": [
    { name: "Hot Chocolate", price: 10000 },
    { name: "Chocosmoth (Ice)", price: 15000 },
  ],
};

const MenuForm = () => {
  const [category, setCategory] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
    setName('');
    setPrice('');
  };

  const handleNameChange = (event) => {
    const selectedItem = menuOptions[category].find(item => item.name === event.target.value);
    setName(selectedItem.name);
    setPrice(selectedItem.price);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const orderData = {
        category,
        name,
        price
      };

      const response = await axios.post('http://localhost:5000/orders', orderData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Order placed:', response.data);
      setCategory('');
      setName('');
      setPrice('');
    } catch (error) {
      console.error('Error placing order:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">Place Order</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
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
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name:</label>
          <select
            id="name"
            value={name}
            onChange={handleNameChange}
            className="mt-1 p-2 block w-full rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500"
            disabled={!category}
          >
            <option value="">Select Item</option>
            {category && menuOptions[category].map(item => (
              <option key={item.name} value={item.name}>{item.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price:</label>
          <input
            type="text"
            id="price"
            value={price}
            readOnly
            className="mt-1 p-2 block w-full rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500"
          />
        </div>
        <button type="submit" className="bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600">
          Place Order
        </button>
      </form>
    </div>
  );
};

export default MenuForm;
