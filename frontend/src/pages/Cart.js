import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../utils/api';
import { useAuth } from '../context/AuthContext';
import { FiTrash2, FiPlus, FiMinus } from 'react-icons/fi';
import toast from 'react-hot-toast';

const Cart = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    fetchCart();
  }, [isAuthenticated, navigate]);

  const fetchCart = async () => {
    try {
      const response = await api.getCart();
      setCart(response.data);
    } catch (error) {
      console.error('Error fetching cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    try {
      const response = await api.updateCartItem(itemId, newQuantity);
      setCart(response.data);
      toast.success('Cart updated');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update cart');
    }
  };

  const removeItem = async (itemId) => {
    try {
      const response = await api.removeFromCart(itemId);
      setCart(response.data);
      toast.success('Item removed from cart');
    } catch (error) {
      toast.error('Failed to remove item');
    }
  };

  const calculateTotal = () => {
    if (!cart || !cart.items) return { subtotal: 0, gst: 0, shipping: 0, total: 0 };

    let subtotal = 0;
    let totalGst = 0;

    cart.items.forEach((item) => {
      if (item.product) {
        const itemPrice = item.product.price * item.quantity;
        const itemGst = (itemPrice * (item.product.gst || 18)) / 100;
        subtotal += itemPrice;
        totalGst += itemGst;
      }
    });

    const shipping = subtotal > 499 ? 0 : 40;
    const total = subtotal + totalGst + shipping;

    return { subtotal, gst: totalGst, shipping, total };
  };

  const totals = calculateTotal();

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-gray-200 animate-pulse h-64 rounded-lg"></div>
      </div>
    );
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
          <button
            onClick={() => navigate('/products')}
            className="bg-amazon-orange text-white px-6 py-3 rounded-lg hover:bg-orange-600"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cart.items.map((item) => (
            <div key={item._id} className="bg-white p-4 rounded-lg shadow-md flex gap-4">
              <img
                src={item.product?.images?.[0] || 'https://via.placeholder.com/150'}
                alt={item.product?.name}
                className="w-24 h-24 object-cover rounded"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-2">{item.product?.name}</h3>
                <p className="text-amazon-orange font-bold mb-2">
                  ₹{item.product?.price.toLocaleString('en-IN')}
                </p>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center border rounded">
                    <button
                      onClick={() => updateQuantity(item._id, item.quantity - 1)}
                      className="p-1 hover:bg-gray-100"
                    >
                      <FiMinus />
                    </button>
                    <span className="px-4 py-1">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item._id, item.quantity + 1)}
                      className="p-1 hover:bg-gray-100"
                    >
                      <FiPlus />
                    </button>
                  </div>
                  <button
                    onClick={() => removeItem(item._id)}
                    className="text-red-600 hover:text-red-800 flex items-center"
                  >
                    <FiTrash2 className="mr-1" />
                    Remove
                  </button>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-lg">
                  ₹{(item.product?.price * item.quantity).toLocaleString('en-IN')}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-lg shadow-md sticky top-20">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{totals.subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span>GST</span>
                <span>₹{totals.gst.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>
                  {totals.shipping === 0 ? (
                    <span className="text-green-600">FREE</span>
                  ) : (
                    `₹${totals.shipping}`
                  )}
                </span>
              </div>
              {totals.subtotal < 499 && (
                <p className="text-sm text-green-600">
                  Add ₹{(499 - totals.subtotal).toFixed(0)} more for free shipping
                </p>
              )}
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>₹{totals.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => navigate('/checkout')}
              className="w-full bg-amazon-orange text-white py-3 rounded-lg hover:bg-orange-600 font-semibold"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

