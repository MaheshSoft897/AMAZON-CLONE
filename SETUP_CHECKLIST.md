# Setup Checklist - Next Steps

## ✅ Step 1: Install Dependencies

```bash
# Install root dependencies
npm install

# Install frontend dependencies
cd frontend
npm install
cd ..
```

## ✅ Step 2: Setup MongoDB

**On Windows:**
1. Download MongoDB from: https://www.mongodb.com/try/download/community
2. Install MongoDB Community Edition
3. MongoDB should start automatically as a Windows service
4. Verify it's running: Open Services (Win+R → services.msc) and check "MongoDB"

**Alternative - Use MongoDB Atlas (Cloud):**
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create a free cluster
4. Get connection string
5. Update `backend/.env` with your MongoDB Atlas connection string

## ✅ Step 3: Environment Files Created

I've created the `.env` files for you:
- ✅ `backend/.env` - Backend configuration
- ✅ `frontend/.env` - Frontend configuration

**⚠️ IMPORTANT:** Update Razorpay keys in `backend/.env`:
1. Sign up at https://razorpay.com (free test account)
2. Go to Dashboard → Settings → API Keys
3. Copy Key ID and Key Secret
4. Update `backend/.env` with your keys

## ✅ Step 4: Create Admin User

```bash
node backend/scripts/createAdmin.js
```

This creates an admin user:
- Email: `admin@example.com`
- Password: `admin123`

## ✅ Step 5: Start the Application

**Option A: Run both together (Recommended)**
```bash
npm run dev
```

**Option B: Run separately (2 terminals)**
```bash
# Terminal 1 - Backend
npm run server

# Terminal 2 - Frontend  
npm run client
```

## ✅ Step 6: Access the Application

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000/api

## 🧪 Step 7: Test the Application

1. **Register a new user:**
   - Go to http://localhost:3000/register
   - Create an account

2. **Login:**
   - Use your credentials or admin@example.com / admin123

3. **Add products (as admin):**
   - Login as admin
   - Go to http://localhost:3000/admin
   - Click "Add Product"
   - Fill in product details and upload images

4. **Browse and shop:**
   - Go to Products page
   - Add items to cart
   - Proceed to checkout
   - Test payment (use Razorpay test mode)

## 🔧 Troubleshooting

### MongoDB Connection Error
```bash
# Check if MongoDB is running
# Windows: Check Services
# Or try: mongosh
```

### Port Already in Use
- Change `PORT=5000` to `PORT=5001` in `backend/.env`
- Update `REACT_APP_API_URL=http://localhost:5001/api` in `frontend/.env`

### Module Not Found Errors
```bash
# Reinstall dependencies
rm -rf node_modules
npm install
cd frontend
rm -rf node_modules
npm install
```

## 📝 Quick Commands Reference

```bash
# Install all dependencies
npm run install-all

# Run development (both frontend + backend)
npm run dev

# Run backend only
npm run server

# Run frontend only
npm run client

# Create admin user
npm run create-admin

# Build frontend for production
npm run build
```

## 🚀 Ready to Deploy?

Once everything works locally, check `DEPLOYMENT.md` for Ubuntu server deployment instructions.

