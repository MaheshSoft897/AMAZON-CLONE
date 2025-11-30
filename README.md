# Amazon Clone - Indian E-commerce Platform

A full-featured Amazon-style e-commerce clone built for the Indian market with React, Node.js, Express, MongoDB, and Razorpay payment integration.

## Features

- 🔐 **User Authentication** - JWT-based authentication with secure password hashing
- 🛍️ **Product Management** - Browse, search, and filter products
- 🛒 **Shopping Cart** - Add, update, and remove items
- 💳 **Payment Integration** - Razorpay (UPI/Card/Net Banking) and Cash on Delivery (COD)
- 📊 **GST Billing** - Automatic GST calculation (18% default, configurable per product)
- 👨‍💼 **Admin Panel** - Product and order management dashboard
- 📱 **Responsive Design** - Mobile-friendly UI with Tailwind CSS
- 🚚 **Free Shipping** - Free shipping on orders above ₹499

## Tech Stack

### Frontend
- React 18
- React Router DOM
- Tailwind CSS
- Axios
- React Icons
- React Hot Toast

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- Razorpay Payment Gateway
- Multer (File Upload)

## Project Structure

```
amazon-clone/
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   ├── Product.js
│   │   ├── Cart.js
│   │   └── Order.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── products.js
│   │   ├── cart.js
│   │   ├── orders.js
│   │   ├── payment.js
│   │   └── admin.js
│   ├── middleware/
│   │   └── auth.js
│   ├── uploads/
│   └── server.js
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── utils/
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│   └── tailwind.config.js
├── package.json
└── README.md
```

## Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (v5 or higher)
- npm or yarn

### Local Development Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd "AMAZON CLONE"
   ```

2. **Install dependencies**
   ```bash
   # Install root dependencies
   npm install
   
   # Install frontend dependencies
   cd frontend
   npm install
   cd ..
   ```

3. **Set up environment variables**

   Create `backend/.env` file:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/amazon-clone
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   RAZORPAY_KEY_ID=your-razorpay-key-id
   RAZORPAY_KEY_SECRET=your-razorpay-key-secret
   NODE_ENV=development
   ```

   Create `frontend/.env` file:
   ```env
   REACT_APP_API_URL=http://localhost:5000/api
   ```

4. **Start MongoDB**
   ```bash
   # On Windows
   mongod
   
   # On Linux/Mac
   sudo systemctl start mongod
   # or
   brew services start mongodb-community
   ```

5. **Run the application**
   ```bash
   # From root directory - runs both frontend and backend
   npm run dev
   
   # Or run separately:
   # Backend only
   npm run server
   
   # Frontend only (in another terminal)
   npm run client
   ```

6. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## Creating Admin User

To create an admin user, you can use MongoDB shell or a script:

```javascript
// In MongoDB shell or Node.js script
const User = require('./backend/models/User');
const bcrypt = require('bcryptjs');

async function createAdmin() {
  const admin = new User({
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'admin123', // Will be hashed automatically
    role: 'admin'
  });
  await admin.save();
  console.log('Admin user created');
}
```

## Deployment on Ubuntu Server

### 1. Server Setup

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js (v18 LTS)
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install MongoDB
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
sudo apt update
sudo apt install -y mongodb-org
sudo systemctl start mongod
sudo systemctl enable mongod

# Install Nginx
sudo apt install -y nginx

# Install PM2 (Process Manager)
sudo npm install -g pm2
```

### 2. Clone and Setup Project

```bash
# Clone your repository
cd /var/www
sudo git clone <your-repo-url> amazon-clone
cd amazon-clone

# Install dependencies
sudo npm install
cd frontend
sudo npm install
cd ..

# Create uploads directory
sudo mkdir -p backend/uploads
sudo chmod 755 backend/uploads
```

### 3. Environment Configuration

```bash
# Create backend .env file
sudo nano backend/.env
```

Add your production environment variables:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/amazon-clone
JWT_SECRET=your-very-secure-secret-key-here
RAZORPAY_KEY_ID=your-production-razorpay-key-id
RAZORPAY_KEY_SECRET=your-production-razorpay-key-secret
NODE_ENV=production
```

```bash
# Create frontend .env file
sudo nano frontend/.env
```

Add:
```env
REACT_APP_API_URL=https://yourdomain.com/api
```

### 4. Build Frontend

```bash
cd frontend
sudo npm run build
cd ..
```

### 5. Configure PM2

```bash
# Create PM2 ecosystem file
sudo nano ecosystem.config.js
```

Add:
```javascript
module.exports = {
  apps: [{
    name: 'amazon-clone-api',
    script: './backend/server.js',
    instances: 2,
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 5000
    }
  }]
};
```

Start with PM2:
```bash
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

### 6. Configure Nginx

```bash
sudo nano /etc/nginx/sites-available/amazon-clone
```

Add:
```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    # Frontend
    location / {
        root /var/www/amazon-clone/frontend/build;
        try_files $uri $uri/ /index.html;
    }

    # Backend API
    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }

    # Static files (uploads)
    location /uploads {
        alias /var/www/amazon-clone/backend/uploads;
    }
}
```

Enable site:
```bash
sudo ln -s /etc/nginx/sites-available/amazon-clone /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### 7. SSL Certificate (Let's Encrypt)

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

### 8. Firewall Configuration

```bash
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
```

### 9. MongoDB Security

```bash
# Enable MongoDB authentication
sudo nano /etc/mongod.conf
# Add:
security:
  authorization: enabled

# Create admin user
mongosh
use admin
db.createUser({
  user: "admin",
  pwd: "your-secure-password",
  roles: [ { role: "userAdminAnyDatabase", db: "admin" } ]
})
```

Update `MONGODB_URI` in `.env`:
```
MONGODB_URI=mongodb://admin:your-secure-password@localhost:27017/amazon-clone?authSource=admin
```

## Razorpay Setup

1. Sign up at https://razorpay.com
2. Get your API keys from Dashboard → Settings → API Keys
3. Add keys to `backend/.env`:
   - `RAZORPAY_KEY_ID`
   - `RAZORPAY_KEY_SECRET`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/address` - Update user address

### Products
- `GET /api/products` - Get all products (with filters)
- `GET /api/products/:id` - Get single product
- `GET /api/products/categories/list` - Get all categories

### Cart
- `GET /api/cart` - Get user's cart
- `POST /api/cart/add` - Add item to cart
- `PUT /api/cart/update/:itemId` - Update cart item
- `DELETE /api/cart/remove/:itemId` - Remove item from cart
- `DELETE /api/cart/clear` - Clear cart

### Orders
- `GET /api/orders` - Get user's orders
- `GET /api/orders/:id` - Get single order
- `POST /api/orders` - Create new order

### Payment
- `POST /api/payment/create-order` - Create Razorpay order
- `POST /api/payment/verify` - Verify payment

### Admin
- `POST /api/admin/products` - Create product
- `PUT /api/admin/products/:id` - Update product
- `DELETE /api/admin/products/:id` - Delete product
- `GET /api/admin/orders` - Get all orders
- `PUT /api/admin/orders/:id/status` - Update order status
- `GET /api/admin/stats` - Get dashboard statistics

## Default Admin Credentials

After deployment, create an admin user using MongoDB or the registration endpoint, then manually update the role to 'admin' in the database.

## Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running: `sudo systemctl status mongod`
- Check connection string in `.env`

### PM2 Issues
- Check logs: `pm2 logs amazon-clone-api`
- Restart: `pm2 restart amazon-clone-api`

### Nginx Issues
- Check config: `sudo nginx -t`
- View logs: `sudo tail -f /var/log/nginx/error.log`

### Frontend Build Issues
- Clear cache: `cd frontend && rm -rf node_modules build && npm install && npm run build`

## License

This project is for educational purposes only.

## Support

For issues and questions, please open an issue on the repository.

#   A M A Z O N - C L O N E  
 #   S K Y T R E N D _ O F F I C I A L  
 