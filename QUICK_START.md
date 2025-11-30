# Quick Start Guide

## Local Development (5 minutes)

### 1. Install Dependencies

```bash
# Install root dependencies
npm install

# Install frontend dependencies
cd frontend
npm install
cd ..
```

### 2. Setup MongoDB

**Windows:**
- Download and install MongoDB from https://www.mongodb.com/try/download/community
- Start MongoDB service from Services

**Mac:**
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

**Linux:**
```bash
sudo systemctl start mongod
```

### 3. Configure Environment

Create `backend/.env`:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/amazon-clone
JWT_SECRET=your-secret-key-here
RAZORPAY_KEY_ID=your-razorpay-key-id
RAZORPAY_KEY_SECRET=your-razorpay-key-secret
NODE_ENV=development
```

Create `frontend/.env`:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

### 4. Create Admin User

```bash
node backend/scripts/createAdmin.js
```

Default admin credentials:
- Email: `admin@example.com`
- Password: `admin123`

### 5. Run Application

```bash
# Run both frontend and backend
npm run dev

# Or separately:
# Terminal 1 - Backend
npm run server

# Terminal 2 - Frontend
npm run client
```

### 6. Access Application

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000/api

## Testing the Application

1. **Register a new user** at http://localhost:3000/register
2. **Login** with your credentials
3. **Browse products** at http://localhost:3000/products
4. **Add products to cart**
5. **Checkout** and test payment (use Razorpay test keys)
6. **Login as admin** to access admin panel at http://localhost:3000/admin

## Razorpay Test Keys

For testing, use Razorpay test keys:
- Key ID: Available in Razorpay Dashboard → Settings → API Keys
- Key Secret: Available in Razorpay Dashboard → Settings → API Keys

Test card: 4111 1111 1111 1111
CVV: Any 3 digits
Expiry: Any future date

## Common Issues

### MongoDB not connecting
- Ensure MongoDB is running: `sudo systemctl status mongod` (Linux) or check Services (Windows)
- Verify connection string in `backend/.env`

### Port already in use
- Change PORT in `backend/.env` to another port (e.g., 5001)
- Update `REACT_APP_API_URL` in `frontend/.env` accordingly

### Frontend build errors
- Delete `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Clear npm cache: `npm cache clean --force`

### CORS errors
- Ensure backend is running before starting frontend
- Check `REACT_APP_API_URL` matches backend URL

## Next Steps

- Read [README.md](README.md) for detailed documentation
- Read [DEPLOYMENT.md](DEPLOYMENT.md) for production deployment
- Customize products, categories, and branding
- Add more features as needed

