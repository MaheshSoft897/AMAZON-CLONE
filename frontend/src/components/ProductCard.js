import React from 'react';
import { Link } from 'react-router-dom';
import { FiStar } from 'react-icons/fi';

const ProductCard = ({ product }) => {
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <Link
      to={`/product/${product._id}`}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
    >
      <div className="relative">
        <img
          src={product.images?.[0] || 'https://via.placeholder.com/300'}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
        {discount > 0 && (
          <span className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-sm font-semibold">
            {discount}% OFF
          </span>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2 h-12">
          {product.name}
        </h3>
        <div className="flex items-center mb-2">
          <div className="flex items-center bg-green-600 text-white px-2 py-1 rounded text-sm">
            <span className="font-semibold">{product.rating || 0}</span>
            <FiStar className="ml-1 text-xs fill-current" />
          </div>
          <span className="text-gray-500 text-sm ml-2">({product.reviews?.length || 0})</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-xl font-bold text-gray-900">₹{product.price.toLocaleString('en-IN')}</span>
          {product.originalPrice && (
            <span className="text-sm text-gray-500 line-through">
              ₹{product.originalPrice.toLocaleString('en-IN')}
            </span>
          )}
        </div>
        {product.stock === 0 && (
          <p className="text-red-600 text-sm mt-2">Out of Stock</p>
        )}
      </div>
    </Link>
  );
};

export default ProductCard;

