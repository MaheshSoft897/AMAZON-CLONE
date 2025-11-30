import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiSearch, FiShoppingCart, FiUser, FiMenu, FiX } from 'react-icons/fi';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <nav className="bg-amazon-dark text-white sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-amazon-orange">amazon</span>
            <span className="text-xs text-gray-300">.in</span>
          </Link>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-2xl mx-4">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="flex-1 px-4 py-2 text-black rounded-l-md focus:outline-none"
            />
            <button
              type="submit"
              className="bg-amazon-orange px-6 py-2 rounded-r-md hover:bg-orange-600 transition"
            >
              <FiSearch className="text-xl" />
            </button>
          </form>

          {/* Right Menu */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Link to="/orders" className="hidden md:flex items-center space-x-1 hover:text-amazon-orange">
                  <span className="text-sm">Returns</span>
                  <span className="text-sm font-semibold">& Orders</span>
                </Link>
                <Link to="/cart" className="flex items-center space-x-1 hover:text-amazon-orange relative">
                  <FiShoppingCart className="text-2xl" />
                  <span className="text-sm font-semibold hidden md:inline">Cart</span>
                </Link>
                <div className="hidden md:flex items-center space-x-1 hover:text-amazon-orange cursor-pointer" onClick={logout}>
                  <FiUser className="text-xl" />
                  <div className="text-sm">
                    <div className="text-xs text-gray-300">Hello, {user?.name?.split(' ')[0]}</div>
                    <div className="font-semibold">Account</div>
                  </div>
                </div>
                {user?.role === 'admin' && (
                  <Link to="/admin" className="hidden md:block px-3 py-1 bg-amazon-orange rounded hover:bg-orange-600">
                    Admin
                  </Link>
                )}
              </>
            ) : (
              <>
                <Link to="/login" className="px-4 py-2 border border-gray-600 rounded hover:bg-gray-700">
                  Sign In
                </Link>
                <Link to="/register" className="px-4 py-2 bg-amazon-orange rounded hover:bg-orange-600">
                  Sign Up
                </Link>
              </>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2"
            >
              {mobileMenuOpen ? <FiX className="text-2xl" /> : <FiMenu className="text-2xl" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-700">
            <form onSubmit={handleSearch} className="mb-4">
              <div className="flex">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="flex-1 px-4 py-2 text-black rounded-l-md focus:outline-none"
                />
                <button
                  type="submit"
                  className="bg-amazon-orange px-4 py-2 rounded-r-md"
                >
                  <FiSearch />
                </button>
              </div>
            </form>
            {isAuthenticated && (
              <div className="space-y-2">
                <Link to="/orders" className="block py-2 hover:text-amazon-orange">Orders</Link>
                <Link to="/cart" className="block py-2 hover:text-amazon-orange">Cart</Link>
                {user?.role === 'admin' && (
                  <Link to="/admin" className="block py-2 hover:text-amazon-orange">Admin</Link>
                )}
                <button onClick={logout} className="block py-2 hover:text-amazon-orange w-full text-left">
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

