import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';

const Header = () => {
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear the user state and any relevant tokens (like JWT) from localStorage
    setUser(null);
    localStorage.removeItem('token');
    navigate('/login'); // Redirect to login after logging out
  };
  const userRole = user && user.role ? user.role : "customer";
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
            {userRole === 'admin' || userRole === 'superuser' ? (
              <li>
                <Link to="/addProduct" className="hover:underline">Add Product</Link>
              </li>
          ) : (
            <li></li>
          )}
          </ul>
        </nav>
        <div className='flex gap-x-4'>
          <Link to="/cart" className="hover:underline text-xl flex items-center space-x-2">
            <FontAwesomeIcon icon={faCartPlus} />
          </Link>
          {user ? (
            <div className="relative group">
              <span className="cursor-pointer">
                {user.name} {/* Display the logged-in user's name */}
              </span>
              <div className="absolute hidden group-hover:block bg-white border mt-1 p-2 rounded">
                <button onClick={handleLogout} className="text-red-600 hover:underline">Logout</button>
              </div>
            </div>
          ) : (
            <li><Link to="/login" className="hover:underline">Login</Link></li>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
