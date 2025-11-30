# Testing Guide - Amazon Clone

## Quick Test Setup

### 1. Install Dependencies
```bash
npm install
cd frontend
npm install
cd ..
```

### 2. Setup Environment Files

**Create `backend/.env`:**
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/amazon-clone
JWT_SECRET=test-secret-key-12345
RAZORPAY_KEY_ID=rzp_test_xxxxx
RAZORPAY_KEY_SECRET=xxxxx
NODE_ENV=development
```

**Create `frontend/.env`:**
```env
REACT_APP_API_URL=http://localhost:5000/api
```

### 3. Start MongoDB
- **Windows:** Install MongoDB Community Edition (starts as service)
- **Mac:** `brew services start mongodb-community`
- **Linux:** `sudo systemctl start mongod`

### 4. Create Admin User
```bash
npm run create-admin
```

**Admin Credentials:**
- Email: `admin@example.com`
- Password: `admin123`

### 5. Seed Sample Products
```bash
npm run seed-products
```

This adds 12 sample products across different categories:
- Electronics (Smartphones, Laptops, TVs, Headphones, Cameras)
- Fashion (Clothing, Footwear)
- Home & Kitchen

### 6. Start the Application
```bash
npm run dev
```

Access at: http://localhost:3000

---

## Testing Scenarios

### ✅ Test 1: User Registration & Login

1. Go to http://localhost:3000/register
2. Fill in registration form:
   - Name: Test User
   - Email: test@example.com
   - Phone: 9876543210
   - Password: test123
3. Click "Sign Up"
4. You should be automatically logged in
5. Logout and login again to verify

**Expected:** User created, JWT token stored, redirected to home

---

### ✅ Test 2: Browse Products

1. Go to http://localhost:3000/products
2. You should see 12 sample products
3. Test filters:
   - Select category: "Electronics"
   - Set price range: ₹10,000 - ₹50,000
   - Sort by: "Price: Low to High"
4. Test search:
   - Search for "iPhone" or "Samsung"

**Expected:** Products filtered and sorted correctly

---

### ✅ Test 3: Product Details

1. Click on any product card
2. View product details:
   - Images, description, price, GST info
   - Stock availability
   - Rating and reviews
3. Change quantity
4. Click "Add to Cart"

**Expected:** Product added to cart, toast notification shown

---

### ✅ Test 4: Shopping Cart

1. Go to http://localhost:3000/cart
2. Verify cart items are displayed
3. Test quantity updates:
   - Increase/decrease quantity
   - Remove items
4. Check totals:
   - Subtotal
   - GST calculation
   - Shipping (free above ₹499)
   - Total amount

**Expected:** Cart updates correctly, totals calculated properly

---

### ✅ Test 5: Checkout Process

1. From cart, click "Proceed to Checkout"
2. Fill shipping address:
   - Street: 123 Test Street
   - City: Mumbai
   - State: Maharashtra
   - Pincode: 400001
   - Phone: 9876543210
3. Select payment method:
   - **Option A:** Razorpay (UPI/Card)
   - **Option B:** Cash on Delivery (COD)
4. Click "Place Order"

**Expected:** 
- For Razorpay: Payment gateway opens
- For COD: Order created, redirected to order details

---

### ✅ Test 6: Razorpay Payment (Test Mode)

1. Select Razorpay payment
2. Use test credentials:
   - **Test Card:** 4111 1111 1111 1111
   - **CVV:** Any 3 digits (e.g., 123)
   - **Expiry:** Any future date (e.g., 12/25)
   - **Name:** Any name
3. Complete payment

**Expected:** Payment verified, order status updated to "confirmed"

---

### ✅ Test 7: Order Management

1. Go to http://localhost:3000/orders
2. View order history
3. Click on an order to see details:
   - Order items
   - Shipping address
   - Payment method
   - GST breakdown
   - Order status

**Expected:** All order details displayed correctly

---

### ✅ Test 8: Admin Dashboard

1. Login as admin: `admin@example.com` / `admin123`
2. Go to http://localhost:3000/admin
3. **View Statistics:**
   - Total products, orders, users, revenue
4. **Manage Products:**
   - Click "Products" tab
   - Click "Add Product"
   - Fill product form:
     - Name, description, price
     - Category, brand, stock
     - Upload images
   - Click "Create"
   - Edit existing product
   - Delete product
5. **Manage Orders:**
   - Click "Orders" tab
   - View all orders
   - Update order status (pending → confirmed → shipped → delivered)

**Expected:** Admin can manage products and orders

---

### ✅ Test 9: GST Calculation

1. Add multiple products to cart
2. Go to checkout
3. Verify GST calculation:
   - Each product has GST (default 18%)
   - Total GST shown separately
   - Final total includes GST

**Expected:** GST calculated correctly per product and shown in breakdown

---

### ✅ Test 10: Free Shipping

1. Add products worth less than ₹499
2. Check cart - shipping should be ₹40
3. Add more products to reach ₹499+
4. Check cart - shipping should be FREE

**Expected:** Free shipping applied correctly

---

## API Testing (Optional)

### Test Backend API Directly

```bash
# Get all products
curl http://localhost:5000/api/products

# Get single product
curl http://localhost:5000/api/products/{productId}

# Register user
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","password":"test123"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"test123"}'
```

---

## Common Issues & Solutions

### ❌ MongoDB Connection Error
**Solution:** Ensure MongoDB is running
```bash
# Check status
sudo systemctl status mongod  # Linux
# Or check Services on Windows
```

### ❌ Port Already in Use
**Solution:** Change port in `backend/.env`
```env
PORT=5001
```

### ❌ CORS Errors
**Solution:** Ensure backend is running before frontend

### ❌ Products Not Showing
**Solution:** Run seed script
```bash
npm run seed-products
```

### ❌ Payment Gateway Not Opening
**Solution:** 
- Check Razorpay keys in `backend/.env`
- Ensure Razorpay script is loaded (check browser console)
- Use test mode keys from Razorpay dashboard

---

## Test Checklist

- [ ] User registration works
- [ ] User login works
- [ ] Products display correctly
- [ ] Search and filters work
- [ ] Add to cart works
- [ ] Cart updates correctly
- [ ] Checkout form works
- [ ] Razorpay payment works (test mode)
- [ ] COD option works
- [ ] Orders are created
- [ ] Order history displays
- [ ] Admin can add products
- [ ] Admin can manage orders
- [ ] GST calculation is correct
- [ ] Free shipping works above ₹499

---

## Next Steps After Testing

1. ✅ Customize products and categories
2. ✅ Add your own product images
3. ✅ Configure Razorpay production keys
4. ✅ Deploy to server (see DEPLOYMENT.md)
5. ✅ Set up domain and SSL
6. ✅ Configure email notifications
7. ✅ Add more features as needed

---

## Performance Testing

- Test with 100+ products
- Test with multiple concurrent users
- Test cart with 50+ items
- Test search with large dataset
- Monitor API response times

---

Happy Testing! 🚀

