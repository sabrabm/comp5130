import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="flex justify-between">
        <Link to="/" className="text-xl font-bold">Clothing Store</Link>
        <nav>
          <ul className="flex justify-center space-x-4">
            <li>
              <Link to="/" className="hover:underline">Home</Link>
            </li>
            <li>
              <Link to="/shop" className="hover:underline">Shop</Link>
            </li>
            <li>
              <Link to="/contact" className="hover:underline">Contact</Link>
            </li>
          </ul>
        </nav>
        <div>
          <Link to="/login" className="hover:underline">Login</Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
